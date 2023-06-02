const sqlite3 = require("sqlite3").verbose();
const filepath = "./users.db";
const fs = require("fs");
/*const flash = require("connect-flash/lib/flash");
const connectFlash = require("connect-flash");
req.flash("message", "registeration successfull, please login now");
app.use(connectFlash());*/

const createDbConnection = () => {
    if (fs.existsSync(filepath)) {
      return new sqlite3.Database(filepath);
    } else {
      const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
          return console.error(error.message);
        }
        createTable(db);
        createCustomerTable(db)
      });
      console.log("Connection with SQLite has been established");
      return db;
    }
  };
  const createTable = (db) => {
    db.exec(`
  CREATE TABLE users
  (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id varchar(500) NOT NULL,
      name   VARCHAR(50) NOT NULL,
      userName   VARCHAR(50) NOT NULL,
      email varchar(50) NOT NULL,
      phone INTEGER  NOT NULL,
      password text NOT NULL
      );
      `);
  };


  const  createCustomerTable = (db)=>{
    db.exec(`CREATE TABLE customer
    (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id text NOT NULL,
        name   VARCHAR(100) NOT NULL,
        email varchar(100) NOT NULL,
        phone INTEGER(11)  NOT NULL,
        address text not null,
        );
        `);

}

const orders = (db) =>{

}
const createOrdersTabe = (db)
const usersDb = createDbConnection();
exports.usersDb = usersDb;