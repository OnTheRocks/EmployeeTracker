USE tracker_db;
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("HR");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Executives");
SELECT * FROM department;

delete from department;

Truncate table employee;

USE tracker_db;
INSERT INTO role (title, salary, department_ID) VALUES ("Manager", 100000, 1);
INSERT INTO role (title, salary, department_ID) VALUES ("Lead", 60000, 1);
INSERT INTO role (title, salary, department_ID) VALUES ("Employee", 50000, 1);
INSERT INTO role (title, salary, department_ID) VALUES ("Manager", 100000, 2);
INSERT INTO role (title, salary, department_ID) VALUES ("Lead", 60000, 2);
INSERT INTO role (title, salary, department_ID) VALUES ("Employee", 50000, 2);
INSERT INTO role (title, salary, department_ID) VALUES ("Manager", 100000, 3);
INSERT INTO role (title, salary, department_ID) VALUES ("Lead", 60000, 3);
INSERT INTO role (title, salary, department_ID) VALUES ("Employee", 50000, 3);
INSERT INTO role (title, salary, department_ID) VALUES ("Manager", 100000, 4);
INSERT INTO role (title, salary, department_ID) VALUES ("Lead", 60000, 4);
INSERT INTO role (title, salary, department_ID) VALUES ("Employee", 50000, 4);
INSERT INTO role (title, salary, department_ID) VALUES ("CEO", 200000, 5);
SELECT * FROM role;

USE tracker_db;
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Nathan", "Huber", 13, 0);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Matthew", "Sanders", 1, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("James", "Sullivan", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zachary ", "Baker", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jonathan", "Seward", 4, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brooks", "Wackerman", 5, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brian", "Hainer", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Brian", "Johnson", 7, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angus", "Young", 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Malcolm", "Young", 9, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Cliff", "Williams", 10, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Phil", "Rudd", 11, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jacoby", "Shaddix", 12, 11);
SELECT * FROM employee;
