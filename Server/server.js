const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const port = 3000

var config = require("./dbConfig");

app.get('/test', function(req, res){
    res.send('Hello World!');
    
})

app.get('/', function(req, res){
    config.initDB();
    res.send('Success!');
    
})

app.post('/boreholes/addBorehole', function(req, res){

    var borehole = req.body.borehole;

    console.log(borehole);

    var con = config.createDatabaseConnection();

    var sql = 'INSERT INTO borehole(borehole_name, borehole_type, borehole_latitude, borehole_longitude, borehole_elevation) VALUES (" '+ borehole.borehole_name +' " , " '+ borehole.borehole_type +' " , '+ borehole.borehole_latitude +' , '+ borehole.borehole_longitude +' , '+ borehole.borehole_elevation +' )';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        con.end();
    });
    
})

app.get('/boreholes/getBoreholes', function(req, res){
    //queries.test();
    var con = config.createDatabaseConnection();

    con.query("SELECT * FROM borehole", function (err, result, fields) {
    if (err)
        throw err;
    //console.log(result);
    res.send(result);
    con.end();
    });
    
    
    //queries.getBoreholes();
})

app.post('/boreholes/updateBorehole', function(req, res){

    var borehole = req.body.borehole;

    console.log(borehole);

    var con = config.createDatabaseConnection();

    var sql = 'UPDATE borehole SET borehole_name = "'+ borehole.borehole_name +'", borehole_type = "'+ borehole.borehole_type +'", borehole_latitude ='+ borehole.borehole_latitude +', borehole_longitude = '+borehole.borehole_longitude+', borehole_elevation = '+ borehole.borehole_elevation + ' WHERE borehole_id =  ' + borehole.borehole_id;
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        con.end();
    });
    
})

app.post('/boreholes/deleteBorehole', function(req, res){
    var con = config.createDatabaseConnection();

    var borehole_id = req.body.borehole_id;

    //var q = "DELETE FROM borehole WHERE borehole_id = 5";
    var q = "DELETE FROM borehole WHERE borehole_id = " + borehole_id;
    con.query(q, function (err, result, fields) {
    if (err)
    {
        throw err;
    }
    console.log(result);
    res.send(result);
    con.end();
    });
    
})

///////////////////////////////////////////////////////////////////////////////////////////////

app.post('/waterLevels/addWaterLevel', function(req, res){

    var waterLevel = req.body.waterLevel;

    console.log(waterLevel);

    var con = config.createDatabaseConnection();

    var sql = 'INSERT INTO water_level(water_level_date, water_level_reading, borehole_id) VALUES ( "'+ waterLevel.water_level_date +'"  ,  '+ waterLevel.water_level_reading + ',' + waterLevel.borehole_id + ')';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        con.end();
    });

    
})

app.post('/waterLevels/getWaterLevels', function(req, res){
    //queries.test();
    var con = config.createDatabaseConnection();
    var id = -1;
    if(req.body.borehole_id > 0)
    {
        id = req.body.borehole_id;
        console.log("ID Param: " + id);
    }
    

    con.query("SELECT * FROM water_level WHERE borehole_id = " + id, function (err, result, fields) {
    if (err)
        throw err;
    console.log(result);
    res.send(result);
    con.end();
    });
    
    //queries.getBoreholes();
    
})

app.post('/waterLevels/updateWaterLevel', function(req, res){

    var waterLevel= req.body.waterLevel

    console.log(waterLevel);

    var con = config.createDatabaseConnection();

    var sql = 'UPDATE water_level SET water_level_date = "'+ waterLevel.water_level_date +'", water_level_reading = '+ waterLevel.water_level_reading + ' WHERE water_level_id =  ' + waterLevel.water_level_id;
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        con.end();
    });
    
})

app.post('/waterLevels/deleteWaterLevel', function(req, res){
    var con = config.createDatabaseConnection();

    var waterLevel_id = req.body.water_level_id;

    var q = "DELETE FROM water_level WHERE water_level_id = " + waterLevel_id;
    con.query(q, function (err, result, fields) {
    if (err)
    {
        throw err;
    }
    console.log(result);
    res.send(result);
    con.end();
    });
    
})

app.listen(port, () => console.log(`listening on port ${port}!`))
