var esservice = require('./../persistence/ESService');

class PaymentDAO {

    constructor(){
        this._db = esservice;
    }
    

    list() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM recipes', 
            function(err, result) {
                if(err) return reject("It was not possible to show the recipes.")
    
                resolve(result)
            });
        })
    }
 
    add(recipe) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                INSERT INTO recipes (
                    name,
                    price,
                    description
                ) VALUES (?,?,?)
                `,
                [
                    recipe.name,
                    recipe.price,
                    recipe.description
                ],
                function(err) {
                    if(err) {
                        console.log(err);
                        return reject("It was not possible to insert a new recipe.");                        
                    }
                    resolve();
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