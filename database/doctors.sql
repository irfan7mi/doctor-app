CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  specialty VARCHAR(255),
  experience INT,
  rating FLOAT,
  city VARCHAR(255)
);

INSERT INTO doctors (name, speciality, experience, rating, city) VALUES
(1210, 'Dr. Aarthi Rao', 'General Physician', 10, 4.8, 'Chennai'),
(1212, 'Dr. Karthik Reddy', 'Internal Medicine', 8, 4.6, 'Hyderabad'),
(1216, 'Dr. Meena Kumari', 'General Physician', 12, 4.9, 'Bangalore'),
(1220, 'Dr. Ravi Sharma', 'Internal Medicine', 7, 4.5, 'Delhi'),
(1230, 'Dr. Sneha Pillai', 'General Physician', 5, 4.3, 'Mumbai');