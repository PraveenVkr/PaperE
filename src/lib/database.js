import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
};

export async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export async function getSemesters() {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT DISTINCT semester FROM papers ORDER BY semester"
    );
    return rows;
  } finally {
    await connection.end();
  }
}

export async function getSubjectsBySemester(semester) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(
      "SELECT DISTINCT subject, pdf_url FROM papers WHERE semester = ? ORDER BY subject",
      [semester]
    );
    return rows;
  } finally {
    await connection.end();
  }
}
