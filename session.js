const sqlite = require("better-sqlite3");
const session = require("express-session");

// const SqliteStore = require("better-sqlite3-session-store")(session);
// const db1 = new sqlite(filepath);
// app.use(
//   session({
//     store: new SqliteStore({
//       client: db1,
//       expired: {
//         clear: true,
//         intervalMs: 900000, //ms = 15min
//       },
//     }),
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
//   })
// );

