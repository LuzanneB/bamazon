const mysql = require("mysql");
const Table = require("easy-table");
const inquirer = require ("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
    showTable();   
});

function showTable(){
  let query="SELECT * FROM products"
  connection.query(query,
  function(err, res) {
  if (err) throw err;
  // Log all results of the SELECT statement
  console.table(res);
  start();
  })};

function start(){
  inquirer.prompt([
    {
      type: "input",
      name: "product",
      message:"What would you like to buy?"
    },
    {
      type:"input",
      name:"qty",
      message: "How many would you like to buy?"
    }
  ]).then(function(answer){
      let purchaseQty = answer.qty;
      let productChoice = answer.product;
      updateTable(purchaseQty,productChoice);    
  //end .then 
  })
// end start()
}








// if user selects exit
function exit(){
  connection.end();
}