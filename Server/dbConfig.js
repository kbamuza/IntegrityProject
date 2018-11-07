var mysql = require('mysql');

/*************Enter Details******************/
const servername = "";
const user_name   = "";
const passcode   = "";
const db         = "dbBoreholeMgmt";
/*******************************************/ 

exports.createServerConnection = function()
{

    var con = mysql.createConnection({
        host: servername,
        user: user_name,
        password: passcode
      });

      return con;
}

exports.createDatabaseConnection = function()
{

    var con = mysql.createConnection({
        host: servername,
        user: user_name,
        password: passcode,
        database: db
      });

      return con;
}

exports.initDB = function()
{
    var con = exports.createServerConnection();

    con.connect(function(err) {
    if(err)
    {
        throw err
    };
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS dbBoreholeMgmt", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    });

    initDBTables();
}

function initDBTables()
{
    var con = exports.createDatabaseConnection();

    con.connect(function(err) {
    if (err)
    {
        throw err;
    }
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS borehole( borehole_id int AUTO_INCREMENT, borehole_name VARCHAR(50) NOT NULL, borehole_type VARCHAR(50) NOT NULL, borehole_latitude DOUBLE NOT NULL, borehole_longitude DOUBLE NOT NULL, borehole_elevation DOUBLE NOT NULL, PRIMARY KEY (borehole_id) )";
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Boreholes table created");
    });

    sql = "CREATE TABLE IF NOT EXISTS water_level( water_level_id int AUTO_INCREMENT, borehole_id INT, water_level_date VARCHAR(50) NOT NULL, water_level_reading INT NOT NULL, PRIMARY KEY (water_level_id), FOREIGN KEY (borehole_id) REFERENCES borehole(borehole_id) ON DELETE CASCADE )";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Water levels table created");
    });

    });

}