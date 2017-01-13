var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err){
  if(err) throw err;
  displayItems();
  ask();
});


// display all of the items available for sale. Include the ids, names, and prices of products for sale.
var displayItems = function(){
  connection.query("SELECT * FROM products", function(err,res){
    if(err) throw err;
    // console.log(res);
    for (var i = 0; i < res.length; i++){
      console.log("Item ID: " +res[i].item_id + "\nProduct name: "+res[i].product_name + " \nPrice: "+ res[i].price +"\n===================================");
    }

  });
}

var ask = function(){
  
}
