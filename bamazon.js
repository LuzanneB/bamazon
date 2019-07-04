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
  console.log(Table.print(res));
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
    // store the answers into variables to use in updateTable()
      let purchaseQty = answer.qty;
      let productChoice = answer.product;
      updateTable(purchaseQty,productChoice);    
  //end .then 
  })
// end start()
}

// update table and let customer know what their total is
function updateTable(purchaseQty, productChoice){
  // end function
  let query= "SELECT * FROM products WHERE ?";
  connection.query(query,[{product_name:productChoice}],
     function(err,res){
      if (err) throw err;
      // check to see if we have enough in stock
      if (purchaseQty <= res[0].stock_quantity){
        let totalPurchase = res[0].price * purchaseQty;
        // let the customer know we have it in stock and what total purchase is
        console.log("Everything is in Stock!");
        console.log("You're total purchase comes to " + totalPurchase + " for a quantity of " + purchaseQty + ", on item: " + productChoice + ".");
        // update table 
        connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: res[0].stock_quantity-purchaseQty},{product_name: productChoice}])
      }
      // let customer know we don't have enough in stock
      else{
        console.log("I'm sorry, we don't have enough "+ productChoice + " to complete your order.");
      }
      showTable();
    });
//end updateTable() 
}


// if user selects exit
function exit(){
  connection.end();
}