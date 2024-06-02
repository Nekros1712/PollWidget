# Poll Widget Project

## Summary of Technical Choices

For this project, I chose to use vanilla JavaScript for the frontend development. Vanilla JavaScript provides a lightweight solution without relying on external libraries or frameworks. This makes the widget easy to integrate into any HTML page without additional dependencies.

I also utilized localStorage for storing the poll results locally on the user's browser. This allows the user to vote again after refreshing the page, and it simplifies the implementation without the need for server-side storage or authentication.

## Decisions Made

### Design Decisions:
- The poll widget is designed to be easily embeddable into HTML pages using a simple `<div>` tag with custom data attributes for configuration.
- The widget displays the poll question and options, allows users to vote, and updates the results dynamically without page reloads.
- CSS styles are included directly in the JavaScript file to minimize network requests and improve performance.

### Architecture:
- The poll widget is implemented as a standalone JavaScript module to encapsulate its functionality and prevent conflicts with other scripts on the page.
- It follows a modular design pattern, with separate functions for rendering the poll, updating the results, and handling user interactions.

### Trade-offs:
- Using localStorage for storing poll results simplifies the implementation but may not be suitable for high-traffic websites with a large number of users voting simultaneously. In such cases, server-side storage and authentication would be necessary.

## Improvements
- **Storage and Authentication**: Implement server-side storage and authentication for storing poll results securely and preventing multiple votes from the same user.
- **UI Design**:Improve the design with more visually appealing styles, animations, and responsive layouts.
- **Logging**: Implement logging to track important events and errors within the poll widget. Logging can provide valuable insights into the behavior of the widget, helping developers troubleshoot issues and monitor performance in real-time.
   - Log user interactions, such as when a user submits a vote or navigates through the poll options.
   - Log errors and exceptions to identify potential issues and diagnose problems quickly.
   - Use logging levels (e.g., INFO, WARN, ERROR) to categorize and prioritize log messages based on severity.
- **Error Handling**: Implement robust error handling to gracefully handle unexpected situations and provide informative error messages to users.
- **Customization Options**: Provide users with the ability to customize the appearance and behavior of the poll widget. Offer options for changing colors, fonts, animations, and other visual aspects.
- **Responsive Design**: Ensure the poll widget is fully responsive and optimized for different devices and screen sizes. Test the widget on various devices to ensure a seamless user experience across platforms.

## Instructions for Launching and Testing

#### To launch the project and test the poll widget, follow these steps:

1. Clone the Git repository to your local machine:

```bash
git clone https://github.com/Nekros1712/PollWidget.git
cd PollWidget
```

2. Open `index.html` or `widget.html` with live server / FTP server

#### To run unit tests, follow these steps:

1. Install Jest
   ```bash
   npm install
   ```

2. Run tests
   ```bash
   npm test
   ```
