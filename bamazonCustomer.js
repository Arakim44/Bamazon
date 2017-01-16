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
  chooseID();
});


// display all of the items available for sale. Include the ids, names, and prices of products for sale.
var displayItems = function(){
  connection.query("SELECT item_id, product_name, price FROM products", function(err,res){
    if(err) throw err;
    // console.log(res);
    for (var i = 0; i < res.length; i++){
      console.log("Item ID: " +res[i].item_id + "\nProduct name: "+res[i].product_name + " \nPrice: "+ res[i].price +"\n=====================================================");
    }
  });
}



// The first should ask them the ID of the product they would like to buy.
var chooseID = function(){
  inquirer.prompt([
    {
      name: "ID",
      type: "input",
      message: "Please enter the ID number you want to purchase: ",
      validate: function(value){
        if (isNaN(value) === false) {
          return true;
        }
        console.log("Please Enter the number");
        return false;
        }
    },{
      //The second message should ask how many units of the product they would like to buy.
      name: "quantity",
      type: "input",
      message: "Please Enter how many units of the product you would like to buy: ",
      validate: function(value){
        if (isNaN(value) === false) {
          return true;
        }
        console.log("Please Enter the number");
        return false;
      }
    }
  ]).then(function(answer){
     check(answer.ID, answer.quantity);
  })

}

//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
var check = function(itemID,quantity){
  connection.query("SELECT * FROM products WHERE item_id=?",[itemID],function(err,res){
  // console.log(res);
  // console.log(res[0].stock_quantity);
  var itemSelected = res[0]
  var inStock = itemSelected.stock_quantity;
  var newStock = inStock - quantity;
   if (newStock >= 0 ){
     connection.query("UPDATE products SET ?  WHERE ?",
     [{
       stock_quantity: newStock
     },{
        item_id: itemID
     }],
     function(err, res){
       console.log("Purchase placed");
       var totalCost = quantity*itemSelected.price;
       console.log("Your total cost is $"+totalCost);
       console.log(newStock+ " left in stock");
     });
   }
   else {
     console.log("We are out of stock, or you entered insufficient quantity. please edit your order.");
     chooseID();
   }
  })
}
