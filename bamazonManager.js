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
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err,res){
    if(err) throw err;
    // console.log(res);
    for (var i = 0; i < res.length; i++){
      console.log("Item ID: " +res[i].item_id + "\nProduct name: "+res[i].product_name + " \nPrice: "+ res[i].price + "\nIn Stock: "+ res[i].stock_quantity +"\n=====================================================");
    }
  });

}


function viewLow(){
  console.log("view low inventory");
  connection.query("Select * FROM products WHERE stock_quantity < 100", function(err, res){
    if (err) throw err;
    // console.log(res);
    // console.log(res[2].stock_quantity);
    for (var i = 0; i < res.length; i++){
      console.log("Item ID: " +res[i].item_id + "\nProduct name: "+res[i].product_name + " \nPrice: "+ res[i].price + "\nIn Stock: "+ res[i].stock_quantity +"\n=====================================================");
    }
  })
}



function addInventory(){
  inquirer.prompt([
    {
      name: "itemID",
      type: "input",
      message: "Please enter the ID number of items that you want to add inventory to: ",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
        console.log("Please Enter the valid number");
        return false;
      }
    },{
      name: "quantity",
      type: "input",
      message: "Please Enter how many unites of the product you would like to add to the inventory: ",
      validate: function(value){
        if (isNaN(value)=== false){
          return true;
        }
        console.log("Please Enter the valid number");
        return false;
      }
    }
  ]).then(function(answer){
    connection.query("SELECT * FROM products WHERE item_id=?",[answer.itemID],function(err,res){
      // console.log("You have selected item: "+ res[]);
      var selectedItem = res;
      var newQuantity = selectedItem[0].stock_quantity + parseInt(answer.quantity);
      // console.log("You have selected item: "+ selectedItem[0].product_name);

    connection.query("UPDATE ptoducts SET ? WHERE ?",
    [{
      stock_quantity: newQuantity
    },{
      item_id : answer.itemID
    }],
    function(err,res){
      console.log("Inventory updated");
      console.log("New Quantity of "+selectedItem[0].product_name+": "+ newQuantity);
    });
  });
  })

}



function addNewProduct(){
  // console.log("add new product");
  inquirer.prompt([
    {
      name: "newItem",
      type: "input",
      message: "Type the name of the new item you would like to add."
    }, {
      name: "department",
      type: "input",
      message: "Type the department that items belong to",
    }, {
      name: "price",
      type: "input",
      message: "What is the price of item?",
      validate: function(value) {
        if (isNaN(value) === false){
          return true;
        }
        return false;
      }
    }, {
      name: "quantity",
      type: "input",
      message: "How many items are you adding?",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
        return false;
      }
    }]).then(function(answer){
      connection.query("INSERT INTO products SET ?", {
        product_name: answer.newItem,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
      }, function(err,res){
        console.log("Item updated. check work bench!");
      });
    });
}
