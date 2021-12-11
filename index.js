const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

init();

// Display logo text and load main prompts
function init() {
  const logoText = logo({
    name: "Employee Tracker",
    borderColor: "red",
    logoColor: "blue",
  }).render();
  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose one of the following options:",
      choices: [
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  // Call the appropriate function corresponding to the user's choice
  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return viewDepartments();
    case "VIEW_ROLES":
      return viewRoles();
    case "VIEW_EMPLOYEES":
      return viewEmployees();
    case "ADD_DEPARTMENT":
      return addDepartment();
    case "ADD_ROLE":
      return addRole();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      return viewEmployeesByDepartment();
    default:
      return quit();
  }
}

async function viewDepartments() {
  const departments = await db.selectAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

async function viewRoles() {
  const roles = await db.selectAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function viewEmployees() {
  const employees = await db.selectAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]);

  await db.insertDepartment(department);

  console.log(`Added ${department.name} to the database`);

  loadMainPrompts();
}

async function addRole() {
  const departments = await db.selectAllDepartments();

  const departmentChoices = departments.map(({ id, department }) => ({
    value: id,
    name: department,
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      message: "What is the salary of this role?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does this role belong to?",
      choices: departmentChoices,
    },
  ]);
  await db.insertRole(role);

  console.log(`Added ${role.title} to the database`);

  loadMainPrompts();
}

async function addEmployee() {
  const roles = await db.selectAllRoles();
  const employees = await db.selectAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices,
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices,
  });

  employee.manager_id = managerId;

  await db.insertEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.selectAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices,
    },
  ]);

  const roles = await db.selectAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign to the selected employee?",
      choices: roleChoices,
    },
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.selectAllDepartments();

  const departmentChoices = departments.map(({ id, department }) => ({
    value: id,
    name: department,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see all employees for?",
      choices: departmentChoices,
    },
  ]);

  const employees = await db.selectAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
