const db_config = require('./db_config');
const mysql = require('mysql2');

var wolframbeta_db_config =
{
    host: db_config.server,
    user: db_config.userName,
    password: db_config.password,
    database: db_config.databaseName,
    port: db_config.port,
    ssl: true
};

const conn = new mysql.createConnection(wolframbeta_db_config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            readData();
        }
    });

function readData(){
        conn.query('SELECT * FROM profile',
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Selected ' + results.length + ' row(s).');
                for (i = 0; i < results.length; i++) {
                    console.log('Row: ' + JSON.stringify(results[i]));
                }
                console.log('Done.');
            })
       conn.end(
           function (err) {
                if (err) throw err;
                else  console.log('Closing connection.')
        });
};
