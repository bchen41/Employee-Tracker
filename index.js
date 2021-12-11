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
    default:
      return quit();
  }
}

async function viewDepartments() {
  const departments = await db.viewAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

async function viewRoles() {
  const roles = await db.viewAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function viewEmployees() {
  const employees = await db.viewAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
