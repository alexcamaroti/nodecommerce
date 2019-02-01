var esservice = require('./../persistence/ESService');
var database = "test1";
var table_type = "payments";

class PaymentDAO {

    constructor(){
        this._db = esservice;
    } 

    listAll(req, res) {
        var BODY_REQUEST = JSON.parse("{\"query\" : {\"match_all\": { }}}");
        return new Promise((resolve, reject) => {           
            this._db.search(null, res, database, table_type, BODY_REQUEST, 
            function(err) {
                if(err) return reject("It was not possible to show the recipes.")
    
                console.log("PaymentDAO:listAll" + res);
                resolve(res);
            });
        })
    }
 
    add(req, res, recipe) {
        return new Promise((resolve, reject) => {
            console.log("Accessing PaymentDAO:add");
            this._db.addDocument(null, res, database, null, table_type, recipe,
                function(err) {
                    if(err) {
                        console.log(err);
                        return reject("It was not possible to insert a new recipe.");                        
                    }
                    resolve(res);
                });
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
            `
            SELECT * FROM recipes
            WHERE id = ? 
            `,
            [id],
            function(err, result) {
                if(err) {
                    console.log(err);
                    return reject("It was not possible to find the specified item.");
                }

                resolve(result);
            });
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
            `
            DELETE FROM recipes
            WHERE id = ?
            `,
            [id],
            function(err) {
                if(err) {
                    console.log(err);
                    reject("It was not possible to remove the specified item.");
                }
                resolve();
            });
        })
    }

    update(recipe) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE recipes
                SET name = ?, price = ?, description = ?
                WHERE id = ?`,
                [
                    recipe.name,
                    recipe.price,
                    recipe.description,
                    recipe.id
                ],
                function(err, result){
                    if(err) {
                        console.log(err);
                        reject("It was not possible to update the specified item.");
                    }
                    console.log(result);
                    resolve();
                });
        })
    }
}

module.exports = PaymentDAO;