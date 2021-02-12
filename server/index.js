const path = require("path");
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const crypto = require("crypto-js");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const publicPath = path.resolve(__dirname, "../build");

app.use(express.static(publicPath));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "messanger",
    password: ""
});

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});
app.get(/\/(login|register)/, (req, res) => {
    res.redirect("/");
});

app.post("/register", (req, res) => {
    const { login, nickname, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        res.send({
            status: false,
            text: "Passwords not similar"
        })
        return;
    }
    if (login.trim().length < 3 ||
        nickname.trim().length < 3 ||
        password.trim().length < 3 ||
        confirmPassword.trim().length < 3) {
        res.send({
            status: false,
            text: "Fields length must be over then 3 char"
        })
        return;
    }

    new Promise(() => {
        const sql = "SELECT `login` from users where login=?";
        pool.query(sql, [login], (err, data) => {
            if (err) return;
            if (data.length > 0) {
                res.send({
                    status: false,
                    text: "User with this login is already exists"
                });
                return;
            }
            new Promise(resolve => {
                const sql = "SELECT `nickname` from users where nickname=?";
                pool.query(sql, [nickname], (err, data) => {
                    if (err) return;
                    if (data.length > 0) {
                        res.send({
                            status: false,
                            text: "User with this nickname is already exists"
                        });
                        return;
                    }
                    resolve();
                })
            }).then(() => {
                const sql = "INSERT INTO users(login,nickname,password) values(?,?,?)";
                pool.query(sql, [login, nickname, crypto.MD5(password).toString()]);
                res.send({
                    status: true,
                    text: "register successfully",
                    user: nickname
                });
            });
        })
    })
});

app.post("/login", (req, res) => {
    const { login, password } = req.body;
    const sql = "SELECT `nickname` from users where login=? and password=?";
    pool.query(sql, [login, crypto.MD5(password).toString()], (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        if (data.length == 0) {
            res.send({
                status: false,
                text: "Invalid username or password"
            });
            return;
        }
        res.send({
            status: true,
            text: "Login successfully",
            user: data[0].nickname
        })
    });
});


const users = [];
io.on("connection",(socket)=>{
    console.log("connection");

    socket.on("msg",(data)=>io.sockets.emit("newMessage", data));

    socket.on("disconnect",()=>console.log("disconnect"))
});



server.listen(3000, () => {
    console.log("started server");
});