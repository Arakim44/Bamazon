var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err){
  if(err) throw err;
  menu();
});

var menu = function(){
  inquirer.prompt(
    {
      name: "menu",
      type: "list",
      message: "Choose following list in the menu",
      choices: ['View product for Sale','View Low inventory','Add to inventory','Add new product', 'Exit'],
    }).then(function(answers){
      switch (answers.menu){
        case "View product for Sale":
        viewProduct();
        break;

        case "View Low inventory":
        viewLow();
        break;

        case "Add to inventory":
        addInventory();
        break;

        case "Add new product":
        addNewProduct();
        break;

        case "Exit":
        return;
      }
    })
}

function viewProduct(){
  console.log("view products");
  connection.query("SELECT item_id, product_name, price FROM products", function(err,res){
    if(err) throw err;
    // console.log(res);
    for (var i = 0; i < res.length; i++){
      console.log("Item ID: " +res[i].item_id + "\nProduct name: "+res[i].product_name + " \nPrice: "+ res[i].price +"\n=====================================================");
    }
  });

}
function viewLow(){
  console.log("view low inventory");
}
function addInventory(){
  console.log("add inventory");
}
function addNewProduct(){
  console.log("add new product");
}
