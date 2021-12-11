INSERT INTO department(name)
VALUES 
("Finance"),
("Human Resources"),
("IT"),
("Sales");


INSERT INTO role(title, salary, department_id)
VALUES
("Finance Manager", 100000, 1),
("HR Manager", 60000, 2),
("IT Manager", 120000, 3),
("Sales Manager", 70000, 4),
("Accountant", 80000, 1),
("Front Desk Receptionist", 30000, 2),
("Software Engineer", 90000, 3),
("Salesperson", 40000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Joe", "Lee", 1, NULL),
("Scott", "Han", 2, NULL),
("Tiff", "Chang", 3, NULL),
("Chris", "Li", 4, NULL),
("Jon", "Tieu", 5, 1), 
("Betty", "Chen", 6, 2), 
("Qi", "Zhang", 7, 3), 
("Linda", "Ping", 8, 4); 