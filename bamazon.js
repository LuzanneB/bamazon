var mysql = require("mysql");
var Table = require("easy-table");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
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
    start();   
});

function showTable(){
  connection.query("SELECT * FROM products",
  function(err, res) {
  if (err) throw err;
  // Log all results of the SELECT statement
  console.table();
  })};

function start(res){
  connection.query("SELECT * FROM products",
  function(err, res) {
  if (err) throw err;
  // Log all results of the SELECT statement
  console.table(res);

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
      connection.query("UPDATE products SET ? WHERE ?",  
       [{stock_quantity:res[0].stock_quantity - answer.qty},{product_name:answer.product}],
       function(err, update) {
        if (err) throw err;
      showTable();  
      exit();

  // end query
       })
    
  //end .then 
  })
// end query
});
// end start()
}








// if user selects exit
function exit(){
  connection.end();
}