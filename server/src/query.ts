import mysql from "mysql2/promise";

const myQuery = async (query: string) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "FAKE_DB",
    password: "root",
  });
  try {
    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    return error;
  } finally {
    connection.end();
  }
};

export { myQuery };
