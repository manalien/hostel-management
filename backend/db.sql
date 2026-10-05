CREATE DATABASE sukhvaas_db;

USE sukhvaas_db;

CREATE TABLE Room (
	Room_no INT PRIMARY KEY,
    Type ENUM('AC', 'Non-AC') NOT NULL,
    Capacity INT NOT NULL,
    Current_occupancy INT NOT NULL
);

CREATE TABLE Student (
	Roll_no VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Branch VARCHAR(10) NOT NULL,
    Course VARCHAR(10) NOT NULL,
    Ph_no VARCHAR(10) NOT NULL UNIQUE,
    Email VARCHAR(30) NOT NULL UNIQUE,
    Address VARCHAR(100) NOT NULL,
    Room_no INT,
    FOREIGN KEY (Room_no) REFERENCES Room (Room_no)
);

CREATE TABLE Student_login (
	Roll_no VARCHAR(10) PRIMARY KEY,
    Password VARCHAR (15) NOT NULL,
    FOREIGN KEY (Roll_no) REFERENCES Student (Roll_no)
);

CREATE TABLE Warden (
	Warden_id VARCHAR(10) PRIMARY KEY,
    Role VARCHAR(20) NOT NULL,
    Email VARCHAR(30) NOT NULL,
    Ph_no VARCHAR(10) NOT NULL UNIQUE,
    Name VARCHAR(30) NOT NULL
);

CREATE TABLE Warden_login (
	Warden_id VARCHAR(10) PRIMARY KEY,
    Password VARCHAR (15) NOT NULL,
    FOREIGN KEY (Warden_id) REFERENCES Warden (Warden_id)
);

CREATE TABLE Complaint (
    Complaint_id INT PRIMARY KEY,
    Description TEXT NOT NULL,
    Room_no INT NOT NULL,
    Roll_no VARCHAR(10),
	Status ENUM('Pending', 'In progress', 'Resolved') DEFAULT 'Pending',
    Date_of_complaint DATE NOT NULL,
    Date_resolved DATE,
    Warden_resolved_by VARCHAR(10),
    FOREIGN KEY (Warden_resolved_by) REFERENCES Warden (Warden_id),
    FOREIGN KEY (Room_no) REFERENCES Room(Room_no),
    FOREIGN KEY (Roll_no) REFERENCES Student(Roll_no)
);

CREATE TABLE Leave_Application (
  Leave_id INT PRIMARY KEY,
  Roll_no VARCHAR(10) NOT NULL,
  Leave_from_date DATE NOT NULL,
  Leave_to_date DATE NOT NULL,
  Approval_status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
  Approved_by VARCHAR(10),                          -- match Warden.warden_id type
  Guardian_ph_no VARCHAR(10) NOT NULL,
  Address_of_stay VARCHAR(255) NOT NULL,
  UNIQUE KEY uk_roll_from (Roll_no, Leave_from_date),  -- keep uniqueness if desired
  FOREIGN KEY (Roll_no) REFERENCES Student (Roll_no),
  FOREIGN KEY (Approved_by) REFERENCES Warden (Warden_id),
  CHECK (Leave_to_date >= Leave_from_date)
);

CREATE TABLE ATTENDANCE (
    Attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    Roll_no VARCHAR(10) NOT NULL,
    Date DATE NOT NULL,
    Time_marked TIME NOT NULL,
    Status ENUM('Present', 'On_leave') DEFAULT 'Present',
    FOREIGN KEY (Roll_no) REFERENCES STUDENT(Roll_no),
    UNIQUE KEY uk_attendance_roll_date (Roll_no, Date)
);


CREATE TABLE Announcement (
	Announcement_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    Description TEXT NOT NULL,
	Announcement_time DATETIME NOT NULL
);


CREATE TABLE Guardian (
	Guardian_id INT AUTO_INCREMENT PRIMARY KEY,
	Roll_no VARCHAR(10) NOT NULL,
    Name VARCHAR(30) NOT NULL,
    Ph_no VARCHAR(10),
    Email VARCHAR(30) NOT NULL,
    Relationship VARCHAR(20) NOT NULL,
    FOREIGN KEY (Roll_no) REFERENCES Student(Roll_no)
);

CREATE TABLE Housekeeping (
	H_id VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(30) NOT NULL,
    Ph_no VARCHAR(10) NOT NULL UNIQUE,
    Role VARCHAR(20) NOT NULL,
    in_timings TIME,
    out_timings TIME
);

CREATE TABLE Maintainance (
    Name VARCHAR(30) NOT NULL,
    Ph_no VARCHAR(10) PRIMARY KEY,
    Role VARCHAR(20) NOT NULL
);

CREATE TABLE FEES (
    Fee_id INT AUTO_INCREMENT PRIMARY KEY,
    Roll_no VARCHAR(10),
    Fee_title VARCHAR(100),
    Fee_amount INT,
    Fee_date DATE,
    Status ENUM('Paid', 'Due') DEFAULT 'Due',
    FOREIGN KEY (Roll_no) REFERENCES STUDENT(Enrollment_no)
);






