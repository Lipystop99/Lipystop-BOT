const mysql = require('mysql2');
let db;
class database {
    constructor(){
        if(database.instance){
            return database.instance;
        }
        database.instance = this;
        return this;
    }
    //get method
    async dbopen() {
        console.log("Core Done!")
        db = mysql.createConnection({
                host: "localhost",
                port: "3306",
                user: "botlogin",
                password: "28l[2CEogPi9)SqM",
                database: "botlogin",
                charset: "utf8mb4"
            });
            if(db.state === 'disconnected') {
                console.log("Disconnected. Try DBConnect!")
                await db.connect(err => {
                    if(err) throw err;
                    console.log('Adatbázisra Csatlakozva! - dbCore');
                });
            }
        
    }
    async dbclose() {
        console.log("Disconnected database connection.");
        await db.end();
    }
    query(query) {
        this.dbopen();
        let promise = new Promise(function(resolve, reject) {
            db.query(query, function(err, rows, fields) {
                if(err) {
                    return reject(JSON.parse(JSON.stringify(err)));
                }
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
        this.dbclose();
        return promise;
    }
}

module.exports = database;