![example image](/assets/example.png)

## Project Overview

The **Task Manager** app offers a streamlined, user-friendly interface for efficient task management. It enables users to:

#### Install The Aps ~ [here](https://drive.google.com/file/d/1y30pNjKUzcBQPxfeCkfG-QRvTthGcDDy/view?usp=drive_link)

- **Add Tasks**: Quickly create new tasks with essential details.
- **Edit Tasks**: Update and modify existing tasks to keep information current.
- **View Tasks**: Access a detailed view of each individual task.
- **Update Task Status**: Change the status or details of tasks as needed.
- **Delete Tasks**: Remove tasks when they’re no longer required.
- **Filter & Search**: Easily find tasks by title, category, or description.
- **Dashboard**: Effortlessly manage tasks with a dashboard that organizes completed and pending tasks, helping users stay on top of their responsibilities.

---

### Platform Choice

For this project, I chose to build with **React Native CLI** to gain full control over the app's functionality and customization. While **Expo** could have simplified some aspects, I opted for the Native CLI to demonstrate my proficiency in native development—especially in handling navigation, integrating native libraries, and implementing custom functionality.

Instead of relying heavily on pre-built UI libraries, I developed custom components with animations. This approach highlights my ability to create intuitive, user-friendly interfaces from scratch, allowing for a tailored user experience while showcasing advanced design and animation skills.

---

# Setup Instructions

**Clone the Repository**  
 Clone the project repository to your local machine:

```bash
git clone <repository-url>
```

Navigate to the Project Directory

```bash
cd task-manager
```

Install all required dependencies using Yarn/Npm:

```bash
yarn install
//or
npm install
```

Run the App Start the development server:

```bash
yarn android
//or
yarn ios
```

# Features Implemented

- **Task Management**: Easily create, edit, and delete tasks.
- **Filtering and Searching**: Find tasks by title, category, or description.
- **Date-wise Task View**: Organize and view tasks by date for better tracking.
- **Dashboard**: Manage and track completed and pending tasks.
- **User-Friendly Interface**: Intuitive UI designed for seamless navigation and ease of use.

# Technologies and Libraries Used

- **React Native CLI**: Framework for building cross-platform mobile applications.
- **React Navigation**: Library for intuitive and flexible routing and navigation between app screens.
- **Redux & Redux Toolkit**: Tools for managing and maintaining global state efficiently.
- **Redux Persist**: Persist and rehydrate Redux state to ensure data remains available across app restarts.
- **AsyncStorage**: Storage solution for persisting data locally on the device, enabling offline functionality.
- **TypeScript**: Adds static typing to JavaScript, improving code reliability and developer experience.
- **Moment.js**: Library for manipulating and formatting dates and times with ease.
- **React Hook Form**: Lightweight library for form handling and validation with React Native components.
- **React Native Alert Notification**: Provides customizable alert notifications within the app.
- **React Native Calendar Strip**: UI component for adding calendar functionality with a horizontal date strip.
- **React Native Date Picker**: Simple and customizable date picker component.
- **React Native Material Menu**: Provides a material design-inspired menu component.
- **React Native Pager View**: Optimized library for handling horizontal swiping between views.
- **React Native Safe Area Context**: Ensures components respect device safe areas (e.g., notches).
- **React Native Screens**: Enhances screen performance and memory usage by optimizing screen rendering.
- **React Native Tab View**: Provides a customizable and performant tab view component for organizing content.

# Known Limitations

- **Limited Sorting**: Current implementation offers basic sorting options for task views. Further sorting criteria could be added for enhanced task organization.
- **Basic Error Handling**: Error handling is minimal, with basic alerts in the UI. More descriptive and context-specific error messages would improve the user experience.
- **Installation Limitation:** As the app is developed with React Native CLI, iOS installation directly on a device requires an Apple Developer Team account. Though you can still test the app on Android by using the provided [APK file](https://drive.google.com/file/d/1y30pNjKUzcBQPxfeCkfG-QRvTthGcDDy/view?usp=drive_link).

# Future Improvements

- **Calendar Integration:** Add functionality to sync tasks with phone calendars for seamless scheduling.
- **Task Notifications:** Implement notifications to alert users when task deadlines or scheduled times are approaching.
- **User Authentication:** Introduce user authentication to allow personalized task management and secure data access.
- **Performance Optimization:** Optimize the app’s performance to efficiently handle large task lists without compromising on speed or responsiveness.
