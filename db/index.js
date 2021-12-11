const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }
  // Select all departments, join with employees and roles and sum up utilized department budget
  selectAllDepartments() {
    return this.connection.query(
      `
      SELECT department.id, department.name AS department, SUM(role.salary) AS utilized_budget
      FROM department 
      LEFT JOIN role ON role.department_id = department.id
      GROUP BY department.id
      `
    );
  }

  // Select all roles, join with departments to display the department name
  selectAllRoles() {
    return this.connection.query(
      `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    `
    );
  }
}

module.exports = new DB(connection);
