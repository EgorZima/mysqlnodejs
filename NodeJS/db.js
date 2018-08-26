const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeedb'
});

connection.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('connected successfully')
})

exports.mysqldb = mysql;