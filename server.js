const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host: "localhost",
    database: "express",
    user: "root",
    password: ""
})

db.connect((err) => {
    if (err) throw err
    
    // SHOW DATA
    app.get("/", (req, res) => {
        const selectSql = "SELECT * FROM siswa ORDER BY id DESC"
        db.query(selectSql, (err, result) => {
            const results = JSON.parse(JSON.stringify(result))
            // console.log(results)
            // res.send(results)
            res.render("index", {siswa: results, title: "Data Siswa"})
        })
    })

    // INSERT DATA
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO siswa (nama, kelas) VALUES ('${req.body.nama}','${req.body.kelas}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    })

    app.get("/edit", (req, res) => {
        const selectSiswa = `SELECT * FROM siswa WHERE id=${req.query.id}`
        db.query(selectSiswa, (err, result) => {
            if (err) throw err
            const siswa = JSON.parse(JSON.stringify(result))
            res.render("edit", {title: "Edit Siswa", siswa})
            // console.log(siswa);
        })
    })

    // UPDATE DATA
    app.post("/update/:id", (req, res) => {
        const updateSql = `UPDATE siswa SET nama='${req.body.nama}', kelas='${req.body.kelas}' WHERE id='${req.params.id}'`
        db.query(updateSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    })

    // DELETE DATA
    app.get("/delete/:id", (req, res) => {
        const deleteSql = `DELETE FROM siswa WHERE id='${req.params.id}'`
        db.query(deleteSql, (err, result) => {
            // console.log(results)
            // res.send(results)
            res.redirect("/")
        })
    })
})


app.listen(8000, () => {
    console.log("server ready");
})