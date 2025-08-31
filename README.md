## Available Scripts

In the project directory, go to cd/backend and then:

### `npm install`
### `npm run server`

Runs the backend server  in the development mode.\
**Currently, the backend is connected to a local MSSQL server with staging data, thus will not work. However, this can be customized using environment variables to connect with live data sources.**



Similarly go to cd/frontend and then:

### `npm install`
### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.


### 📌 Description

This is a full-stack application that serves as a portal for maintaining ration records, device details, transaction data, and more — all presented in a tabular format for the public distribution system across the state.



---

### 🚀 Features

- **Data Source**: MSSQL Server using stored procedures, which are exposed via custom APIs and integrated into the React frontend.

- **JWT Authentication**: 
  - Token-based authentication using local storage.
  - Routes are protected and redirect to the login page if no valid token is found.

- **Search Functionality**:
  - Search transactions and device information based on FPS code, Aadhaar, ration number, and device code.
  - Input validations and toast notifications included for user feedback.

- **Transaction Summary**:
  - Filter-based summaries with two filter modes.
  - Filters persist across route changes and allow navigation through sub-routes based on district, block, and FPS codes.
  - Includes a graphical summary on the main route.

- **Registered Devices**:
  - Device details categorized by district and block across the state.
  - Clicking on a district navigates to its blocks with detailed info.

- **Repair Summary**:
  - Tabular data showing repair details by district.
  - Modal-based search interface showing repair status per district.

- **Download Options**:
  - Excel and PDF download buttons available for each data table.

---

### 📽️ Demo

Click the thumbnail below to view a full video demo on YouTube:

[![Watch the demo](https://img.youtube.com/vi/2dwYQbo2_cs/0.jpg)](https://www.youtube.com/watch?v=2dwYQbo2_cs)
