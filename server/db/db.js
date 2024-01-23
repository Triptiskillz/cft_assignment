const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cft",
  password: "", //Postgres Password
  port: 5432,
});
module.exports = pool;
