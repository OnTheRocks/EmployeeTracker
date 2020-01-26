create database tracker_db;

use tracker_db;

CREATE TABLE employee ( 
  id INT PRIMARY KEY,
  first_name VARCHAR(30), -- to hold employee last name
  last_name VARCHAR(30), -- to hold employee last name
  role_id INT, -- to hold reference to role employee has
  manager_id INT -- to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
);

CREATE TABLE role ( 
  id INT PRIMARY KEY,
  title VARCHAR(30), -- to hold role title
  salary DECIMAL(6,2), -- to hold role salary
  department_id INT -- to hold reference to department role belongs to
);

CREATE TABLE department ( 
  id INT PRIMARY KEY,
  name VARCHAR(30) -- to hold department name
  );

insert into employee  (id, first_name, last_name, role_id, manager_id)
values
(54, "Nathan", "Huber", 1, null);