var mysql = require("mysql");
var inquirer = require("inquirer");

//---------------create the connection information for the sql database---------------------
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "OnTheRocks",
  password: "OnTheRocks",
  database: "tracker_DB"
});


//--------------------connect to the mysql server and sql database--------------------------------------
connection.connect(function(err) {
  if (err) throw err;

  console.log("You are connected to the Tracker Database. This app that will allow you to track lots of Employees.")

  //---------------run the start function after the connection is made to prompt the user-------------------------------
  start();
});

//-------------------function which prompts the user for what action they should take----------------------------------
function start() {
  
  inquirer
    .prompt({
      name: "main",
      type: "list",
      message: "What would you like to do?",
      choices: [
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Title/Role",
                "View Departments",
                "View Employee Titles/Roles",
                "Exit"
               ]
    })
    .then(function(answer) {
     
      switch (answer.main) {
        case "View All Employees":
          listEmployees();
          break;

        case "Add Department":
          addDept();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Title/Role":
          updateEmplRole();
          break;

        case "View Departments":
          viewDepartments();
          break;

        case "View Eployee Titles/Roles":
          viewRoles();
          break;

        case "Exit":          
         
            console.log("Have a GREAT day!");
            connection.end();
            process.exit();
      }
    });
  }

//----------------------------------------function to handle listing employees----------------------------------
function listEmployees() {

  var query = "SELECT e.id, e.first_name, e.last_name, r.title, d.name as 'department', r.salary, ifnull(concat(m.first_name, ' ', m.last_name), 'None') as 'manager' ";
      query += "FROM employee e inner join role r on (e.role_id = r.id) " ;
      query += "INNER JOIN department d on r.department_id = d.id ";  
      query += "LEFT JOIN employee as m on e.manager_id = m.id " ;
      query += "ORDER BY last_name asc";

  connection.query(query, function(err, results) {
    if (err) throw err;
    
    console.log();
    console.table(results);
    start();    
  });
}

//----------------------------------------function to handle adding departments----------------------------------
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "Enter new department name:",        
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.addDept,
        },
        function(err) {
          if (err) throw err;
          console.log();
          console.log("New department added.");
          console.log();     
          start();
        }
      );
    });
  }

//----------------------------------------function to handle adding roles----------------------------------
function addRole() {
  var query = "SELECT department.name, department.id FROM department"

  connection.query(query, function(err, response) {
    if (err) throw err;
    
    inquirer
      .prompt([
        {
          type: "input",
          name: "addRole",
          message: "Enter new title/role:",        
        },
        {
          type: "input",
          name: "addSalary",
          message: "Enter salary for new role:",
        },
        {
          type: "list",
          name: "deptList",
          message: "Select department for new role:",
          choices: () => {
            var deptList = [];
            for (let d = 0; d < response.length; d++) {
              deptList.push(response[d].name);
            }
            return deptList;
          }
        }
      ])
      .then(function(answer) {
        var id = "";
        for (let d = 0; d < response.length; d++) {
          if (answer.deptList === response[d].name) {
            id = response[d].id;
          }
        }
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.addRole,
            salary: answer.addSalary,
            department_id: id,
          },
          function(err) {
            if (err) throw err;
            console.log();
            console.log("New title added.");
            console.log();     
            start();
          }
      );
    });
    });
  }

//----------------------------------------function to handle adding employees----------------------------------
function addEmployee() {
  var query1 = "SELECT e.id, e.first_name, e.last_name, concat(e.first_name, ' ', e.last_name) 'fullname', e.role_id FROM employee e ORDER BY e.last_name ASC"
  var query2 = "SELECT * from role ORDER BY role.title ASC"
  var query1Res = [];
  var query2Res = [];

  new Promise ((resolve, reject) => {
  connection.query(query1, function(err, response) {
    if (err) { reject(err);
    } else { resolve(response);  
      query1Res = response;
    }
  });

  }).then( (data) => {
  connection.query(query2, function(err, response) {
    if (err) { throw err };
    query2Res = response;
  });
}).then (() => {

  inquirer
  .prompt([
    {
    name: "firstName",
    type: "input",
    message: "Employee's first name?"
    },
    {
    name: "lastName",
    type: "input",
    message: "Employee's last name?"
    },
    {  
    name: "empRole",
    type: "list",
    message: "Select a title for new employee: ",
    choices: () => {
      let roles = [];
      for (let i = 0; i < query2Res.length; i ++) {
        roles.push(query2Res[i].title);
      }
      return roles;
     }
    },
   {  
    name: "manager",
    type: "list",
    message: "Who is employee's manager?",
    choices: () => {
      let managers = ["None"];
      for (let i = 0; i < query1Res.length; i++) {
        managers.push(query1Res[i].fullname);
      }
      return managers;
    }
    }    
   ])
    .then(function(answer) {
  
      let managerID = null;

      for(let i = 0; i < query1Res.length; i++) {
        if (answer.manager === query1Res[i].fullname && answer.manager !== '') {
          managerID = query1Res[i].id;
        }
      }

      let roleID = "";

      for (let i = 0; i < query2Res.length; i++) {
        if(answer.empRole === query2Res[i].title) {
          roleID = query2Res[i].id;
        }
      }

  connection.query(
    "INSERT INTO employee SET?",
    {
     first_name: answer.firstName,
     last_name: answer.lastName,
     role_id: roleID,
     manager_id: managerID 
    },
    function(err) {
      if (err) throw err;
      console.log();
      console.log();
      console.log("Employee added.");
      console.log();
      console.log();
      start();
      });
    });
  }).catch(err => {
    console.log(err);
  });
}

//----------------------------------------function to handle updating employee title----------------------------------
function updateEmplRole () {

  var query1 = "SELECT e.id, e.first_name, e.last_name, concat(e.first_name, ' ', e.last_name) 'fullname', e.role_id FROM employee e ORDER BY e.last_name ASC"
  var query2 = "SELECT * from role ORDER BY role.title ASC"
  var query1Res = [];
  var query2Res = [];

 
  new Promise ((resolve, reject) => {
    connection.query(query1, function(err, response){
      if (err) { reject(err);
      } else { resolve(response);
        query1Res = response;

      }
    });
    
  }).then(data => {
    connection.query(query2, function(err, response){
      if (err) { throw err };
      query2Res = response;
    });

  }).then (data => {

      inquirer
        .prompt([
          {
            name: "roleUpdate",
            type: "list",
            message: "Select employee to update",
            choices: () => {
              let employeeList = [];
              for (let i = 0; i < query1Res.length; i++) {
                employeeList.push(query1Res[i].fullname);
              }
              return employeeList;
            }
          },
          {
            name: "newRole",
            type: "list",
            message: "Enter new title:",
            choices: () => {
              let roleList = [];
              for (let i = 0; i < query2Res.length; i++) {
                roleList.push(query2Res[i].title);
              }
              return roleList;
            }
          }
        ])

      .then(function(answer) {

        let employeeID = "";

        for (let i = 0; i < query1Res.length; i++) {
          if (answer.emplupdate === query1Res[i].fullname) {
              employeeID = query1Res[i].id;
          }
        }
     

        let roleID = "";

        for (let i = 0; i < query2Res.length; i++) {
          if (answer.apptupdate === query2Res[i].title) {
              roleID = query2Res[i].id;
          }
        }

        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              role_id: roleID
            },
            {
              id: employeeID
            }
          ],
  
            function(err, res) {
            if (err) throw err;
  
            console.log("Role updated.");
            start();            
            }
          );
        });
      });}
 
//----------------------------------------function to handle viewing departments----------------------------------     
function viewDepartments() {

  var query = "SELECT * FROM department"

  connection.query(query, function(err, results) {
    if (err) throw err;
    
    console.log();
    console.table(results);
    start();    
  });
}

//----------------------------------------function to handle viewing roles----------------------------------
function viewRoles() {

  var query = "SELECT r.id, d.name as 'department', r.title as 'title/role', r.salary ";
      query += "FROM role r ";
      query += "INNER JOIN department d on r.department_id = d.id ";

  connection.query(query, function(err, results) {
    if (err) throw err;
    
    console.log();
    console.table(results);
    start();    
  });
}
