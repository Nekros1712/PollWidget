const pollWidgetNamespace = (function(namespace) {
    function renderPoll(widget, question, options, voteCounts) {
        widget.innerHTML = `
        <div class="pw_poll-container"><h3>${question}</h3><div class="pw_bars"></div><div class="pw_track-container"><div class="pw_track"><div class="pw_circle"></div></div><div style="width:100%;font-size:15px;display:flex;justify-content:space-around;align-items:center;">${options.map((option)=>`<span class="pw_option">${option}</span>`).join('')}</div></div></div>
        `;

        updateBars(widget, voteCounts);
    }

    function updateBars(widget, voteCounts) {
        const barsContainer = widget.querySelector('.pw_bars');
        barsContainer.innerHTML = "";

        const maxVotes = Math.max(...voteCounts);

        for (let i = 0; i < voteCounts.length; i++) {
            const bar = document.createElement('div');
            bar.className = 'pw_bar';
            const height = (voteCounts[i] / maxVotes) * 100;
            bar.style.height = height + '%';

            barsContainer.appendChild(bar);
        }
    }

    function getVotes(question) {
        const storedVotes = localStorage.getItem(question);
        if (storedVotes) {
            return JSON.parse(storedVotes);
        } else {
            const initialVotes = Array.from({ length: 15 }, () => Math.floor(Math.random() * 20) + 4);
            saveVotes(question, initialVotes);
            return initialVotes;
        }
    }

    function saveVotes(question, votes) {
        localStorage.setItem(question, JSON.stringify(votes));
    }

    function appendCSS() {
        const style = document.createElement('style');
        const pollWidgetCSS = `.pw_poll-container{width:100%;height:100%;padding:1em;border:1px solid #000;border-radius:20px;margin:50px auto;text-align:center;display:flex;flex-direction:column;justify-content:center}.pw_option{width:100px}.pw_track-container{position:relative;padding:0 10px}.pw_track{width:85%;height:10px;background-color:#d3d3d3;position:relative;margin:20px auto;border-radius:10px}.pw_circle{width:30px;height:30px;background-color:#1e90ff;border-radius:50%;position:absolute;bottom:-9px;left:-5px;cursor:pointer}.pw_bars{width:80%;height:100px;margin:0 auto;display:flex;justify-content:space-between;align-items:baseline}.pw_bar{width:20px;height:100%;background-color:#90ee90;bottom:0}`;
        style.textContent = pollWidgetCSS;
        document.head.appendChild(style);
    }

    function initPollWidgets() {
        appendCSS();
        const uniqueWidgets = {};
        const pollWidgets = document.querySelectorAll('.poll-widget');

        pollWidgets.forEach(widget => {
            const widgetId = widget.getAttribute('data-id');
            if (Object.keys(uniqueWidgets).includes(widgetId)) {
                return;
            } else {
                uniqueWidgets[widgetId] = {};
            }
            const dimensions = widget.getAttribute('data-dim');
            const question = widget.getAttribute('data-question');
            const options = JSON.parse(widget.getAttribute('data-options'));
            widget.currentIndex = null;

            widget.style.width = dimensions.split("x")[1] + 'px';
            widget.style.height = dimensions.split("x")[0] + 'px';

            let votes = getVotes(question);
            if (votes.length === 0) {
                votes = new Array(15).fill(0);
                saveVotes(question, votes);
            }

            const voteCounts = getVotes(question);

            renderPoll(widget, question, options, voteCounts);

            const track = widget.querySelector('.pw_track');
            const circle = widget.querySelector('.pw_circle');
            let dragging = false;

            circle.addEventListener('mousedown', function (event) {
                dragging = true;
                track.classList.add('active');
            });

            document.addEventListener('mousemove', function (event) {
                if (dragging) {
                    const trackRect = track.getBoundingClientRect();
                    let newX = event.clientX - trackRect.left - circle.offsetWidth / 2;
                    newX = Math.max(
                        0,
                        Math.min(newX, track.offsetWidth - circle.offsetWidth)
                    );
                    circle.style.left = newX + 'px';

                    const percentage = (newX / track.offsetWidth) * 100;
                }
            });

            document.addEventListener('mouseup', function () {
                if (dragging) {
                    dragging = false;
                    track.classList.remove('active');

                    const temp = circle.style.left;
                    const percentage = (parseInt(temp.substr(0, temp.length - 2)) / track.offsetWidth) * 100;
                    const arr = getVotes(question);
                    if (widget.currentIndex != null) {
                        arr[widget.currentIndex] -= 1;
                        widget.currentIndex = Math.floor(percentage / (100 / 15)); // Divide by 100/15 to get 15 segments
                        arr[widget.currentIndex] += 1;
                    } else {
                        widget.currentIndex = Math.floor(percentage / (100 / 15)); // Divide by 100/15 to get 15 segments
                        arr[widget.currentIndex] += 1;
                    }
                    saveVotes(question, arr);
                    updateBars(widget, arr);
                }
            });
        });
    }

    // Expose the functions
    namespace.renderPoll = renderPoll;
    namespace.updateBars = updateBars;
    namespace.getVotes = getVotes;
    namespace.saveVotes = saveVotes;
    namespace.initPollWidgets = initPollWidgets;

    // Attach DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', initPollWidgets);

    return namespace;
})(window.pollWidgetNamespace || {});

window.pollWidgetNamespace = pollWidgetNamespace;
