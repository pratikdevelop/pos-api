const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 9000;
const { v4: uuidv4 } = require("uuid");
const passwordHash = require("password-hash");

const { usersDb } = require("./config");
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ static: true }));
const filepath = "sessions.db";

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/signup", (req, res) => {
  const v4options = {
    random: [
      0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
      0x67, 0x1c, 0x58, 0x36,
    ],
  };
  const user_id = uuidv4(v4options);
  const { name, username, email, phone, confirm_password, password } = req.body;
  const hashPassword = passwordHash.generate(password);

  usersDb.run(
    `INSERT INTO users (user_id, name, username, email, password, phone) VALUES (?, ?, ?,?, ?, ?)`,
    [user_id, name, username, email, hashPassword, phone],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      setTimeout(() => {
        res.redirect("/signin");
      }, 500);
    }
  );
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT *FROM users WHERE email  = ?`;
  usersDb.get(sql, [email], (error, row) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    if (row && passwordHash.verify(password, row.password)) {
      return res.status(200).json({ message: "login successful" , });
    }
    return res.status(401).json({ message: "unauthorized user" });
  });
});

app.listen(port, (req, res) => {
  console.log(`port listinning on  http://localhost:${port}`);
});
