# Attendance App

This is a simple attendance submission app built with React on the front end and a Node.js server with Express on the back end.

## Features

- Users can submit their attendance along with a selfie.
- Admins can check date-wise attendance.

## Getting Started

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git https://github.com/Triptiskillz/cft_assignment.git
   cd cft_assignment
   ```

2. Install dependencies:

   ```bash
   cd client
   npm install
   cd server
   npm install
   ```

3. Set up the PostgreSQL database:

   - Create a new database named `CFT`.
   - Execute the SQL script provided in `req.txt` to create the necessary tables.
  
     ```bash
     CREATE DATABASE CFT;
 
     CREATE TABLE users(id SERIAL PRIMARY KEY,username VARCHAR(50) UNIQUE NOT NULL,password VARCHAR(100) NOT NULL,role VARCHAR(20) NOT NULL);

     CREATE TABLE attendance(attendance_id SERIAL PRIMARY KEY,student_id INT REFERENCES users(id),date DATE NULL,selfie BYTEA NOT NULL);
     ```

4. Configure the server:

   - In the db.js file update the PostgreSQL connection details.
  
     ```bash
      const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "cft",
      password: "",
      port: 5432,
      });
     ```

### Usage

1. Start the server:

   ```bash
   cd server
   npm start
   ```

   The server will run on `http://localhost:4000`.

2. Start the React app:

   ```bash
   cd client
   npm start
   ```

   The React app will run on `http://localhost:3000`.

3. Open your browser and visit `http://localhost:3000` to use the attendance submission app.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request.
