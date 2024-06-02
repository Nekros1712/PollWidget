// poll-widget.test.js
require('../src/poll-widget');

describe('pollWidgetNamespace', () => {
    beforeAll(() => {
        const localStorageMock = (function() {
            let store = {};
            return {
                getItem: function(key) {
                    return store[key] || null;
                },
                setItem: function(key, value) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                }
            };
        })();
        
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock
        });
    });

    // Mock HTML structure for widget
    function createMockWidget() {
        const widget = document.createElement('div');
        widget.className = 'poll-widget';
        widget.setAttribute('data-id', 'testWidget');
        widget.setAttribute('data-dim', '300x600');
        widget.setAttribute('data-question', 'Test Question');
        widget.setAttribute('data-options', JSON.stringify(['Option 1', 'Option 2', 'Option 3']));
        document.body.appendChild(widget);
        return widget;
    }

    afterEach(() => {
        document.body.innerHTML = '';
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('should render poll correctly', () => {
        const widget = createMockWidget();
        const voteCounts = [5, 10, 15];
        window.pollWidgetNamespace.renderPoll(widget, 'Test Question', ['Option 1', 'Option 2', 'Option 3'], voteCounts);

        expect(widget.querySelector('h3').textContent).toBe('Test Question');
        expect(widget.querySelectorAll('.pw_bar').length).toBe(3);
    });

    test('should update bars correctly', () => {
        const widget = createMockWidget();
        const voteCounts = [5, 10, 15];
        window.pollWidgetNamespace.renderPoll(widget, 'Test Question', ['Option 1', 'Option 2', 'Option 3'], voteCounts);

        const bars = widget.querySelectorAll('.pw_bar');
        expect(bars[0].style.height).toBe('33.33333333333333%');
        expect(bars[1].style.height).toBe('66.66666666666666%');
        expect(bars[2].style.height).toBe('100%');
    });

    test('should get votes from localStorage', () => {
        const question = 'Test Question';
        const votes = [5, 10, 15];
        localStorage.setItem(question, JSON.stringify(votes));

        const result = window.pollWidgetNamespace.getVotes(question);
        expect(result).toEqual(votes);
    });

    test('should save votes to localStorage', () => {
        const question = 'Test Question';
        const votes = [5, 10, 15];

        window.pollWidgetNamespace.saveVotes(question, votes);
        expect(localStorage.getItem(question)).toBe(JSON.stringify(votes));
    });
});
