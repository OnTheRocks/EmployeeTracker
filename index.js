var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "OnTheRocks",
  password: "OnTheRocks",
  database: "tracker_DB"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  console.log("You are connected to the Tracker Database.")

  console.log("Welcome, to this amazing app that will allow you to track lots and lots of Employees.")
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "What would you like to do?",
      choices: [
                "View All Employees", 
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Exit"
              ]
    })
    .then(function(answer) {
      // based on their answer, 
      
      switch (answer.main) {
        case "View All Employees":
          listEmployees();
          break;

        case "View All Employees By Department":
          listByDept();
          break;

        case "View All Employees By Manager":
          listByMngr();
          break;

        case "Exit":          
         
            console.log("Have a GREAT day!");
            connection.end();
            process.exit();
      }


// function to handle listing employees
function listEmployees() {

  connection.query("Select e.id, first_name, last_name, title, d.name, salary from employee e, role r, department d where e.role_id = r.id and r.department_id = d.id", function(err, results) {
    if (err) throw err;
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.table(results);
    start();    
  });
}

function listByDept() {

  connection.query("Select e.id, first_name, last_name, title, d.name, salary from employee e, role r, department d where e.role_id = r.id and r.department_id = d.id order by d.name", function(err, results) {
    if (err) throw err;
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.table(results);
    start();
  });
}

function listByMngr() {

  connection.query("Select e.id, first_name, last_name, title, d.name, salary, manager_id from employee e, role r, department d where e.role_id = r.id and r.department_id = d.id order by manager_id", function(err, results) {
    if (err) throw err;
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.table(results);
    start();
  });
}












    })
  };

