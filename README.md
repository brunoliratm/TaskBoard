# TaskBoard

![Build Status](https://img.shields.io/github/actions/workflow/status/brunoliratm/TaskBoard/build.yml)
![License](https://img.shields.io/github/license/brunoliratm/TaskBoard)
![Version](https://img.shields.io/github/package-json/v/brunoliratm/TaskBoard)

TaskBoard is a simple yet powerful task management tool designed to help you organize and prioritize your tasks efficiently. This README provides an overview of the project, installation instructions, usage guidelines, and contribution details.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)

## Features
- **Task Management**: Create, update, and delete tasks.
- **Prioritization**: Assign priority levels to tasks.
- **Categorization**: Organize tasks into categories.
- **Due Dates**: Set and track due dates for tasks.
- **Drag and Drop**: Reorder tasks and move them between stages using drag and drop.
- **Stage Management**: Add, modify, remove, and reorder stages.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

### Steps
1. Clone the repository:
  ```bash
  git clone https://github.com/brunoliratm/TaskBoard.git
  ```
2. Navigate to the project directory:
  ```bash
  cd TaskBoard
  ```
3. Install dependencies:
  ```bash
  npm install
  ```
4. Start the development server:
  ```bash
  npm start
  ```

## Usage

### Running the Application
To run the application in development mode, use:
```bash
npm start
```
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

### Building for Production
To build the app for production, use:
```bash
npm run build
```
The build artifacts will be stored in the `build/` directory.

## Configuration
You can configure the application by modifying the `config.js` file located in the `src` directory. The configuration options include:
- **Database Connection**: Set up the database connection string.
- **Authentication**: Configure authentication settings.
- **API Endpoints**: Define API endpoints for various services.

## Contributing
We welcome contributions from the community! To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Screenshots
Here are some screenshots of the TaskBoard application:

### Main Board
(in build)

### Task Details
(in build)

## Technologies Used
- **Angular**: Frontend framework
- **Angular Material**: UI components
- **CDK Drag and Drop**: Drag and drop functionality
- **Node.js**: Backend runtime
- **Express**: Backend framework
- **JSON**: Data storage

## Future Enhancements
- **User Authentication**: Add user login and registration functionality.
- **Notifications**: Implement notifications for task deadlines.
- **Subtasks**: Allow tasks to have subtasks.
- **Comments**: Enable users to add comments to tasks.


