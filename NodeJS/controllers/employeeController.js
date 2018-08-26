const express = require('express');
let router = express.Router();

const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeedb'
});


router.get('/list', (req,res) => {
    db.query("SELECT * FROM employees", (err,results) => {
        if (err) {
            console.log(err);
            return
        }
        res.send(results)
    });
});

router.post('/', (req,res) => {
    let emp = req.body;

    db.query('INSERT INTO employees SET ?', emp, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json(result)
    });
});

router.get('/:id', (req,res) => {
    let id = req.params.id;

    db.query(`SELECT * FROM employees WHERE id = '${id}' `, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('success')
        res.send(result)
    })
});

router.put('/:id', (req,res) => {
    let id = req.params.id;
    let emp = req.body;

    if (!emp.name || !emp.position || !emp.office || !emp.salary) {
        console.log("BAD REQUEST");
        return
    }

    db.query(`UPDATE employees SET name = '${emp.name}', position = '${emp.position}', office = '${emp.office}', salary = ${emp.salary} WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result)
    })
});

router.delete('/:id', (req,res) => {
    let id = req.params.id;

    db.query(`DELETE FROM employees WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.err(err);
            return;
        }
        res.json(result)
    })
})

module.exports = router;