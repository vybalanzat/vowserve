var mysql = require("mysql");

var inquire = require("inquirer");

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"

});

connection.connect(function (err) {

    if (err) throw err;
    console.log("connected! id: " + connection.threadId);
    shop();

})


function shop() {

    inquire.prompt({
        name: "buy",
        message: "would you like to buy an item?",
        type: "list",
        choices: ["Yes", "No"],
    }).then(function (userchoice) {
        switch (userchoice.buy) {
            case 'Yes':
                connection.query("SELECT * FROM products", function (err, response) {
                    if (err) throw err;

                    console.log(response);
                    inquire.prompt({
                        name: "product",
                        message: "Please enter the item_id of the product you would like to buy: ",
                        type: "list",
                        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
                    // }, {
                    //     name: "amount",
                    //     message: "How much would you like to purchase?",
                    //     type: "list",
                    //     choices: ["1","2","3"]


                    }).then(function (userchoice) {

                        // if (userchoice.amount < response[userchoice.product - 1].stock_quantity) {


                            response[userchoice.product - 1].stock_quantity--;

                            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [response[userchoice.product - 1].stock_quantity, userchoice.product],
                                function (err, response) {
                                    if (err) throw err;

                                    console.log("Thank you for your purchase!")

                                });

                        // }
                        // else if (
                        //     console.log("Sorry! There's not enough inventory!")
                        // )
                    
                        connection.end;
                    });
                });
            case 'No':
                console.log("Goodbye!")
                connection.end;
        };

    });
};







