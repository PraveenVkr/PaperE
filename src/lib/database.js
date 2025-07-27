import mysql from "mysql2/promise";

const dbConfig = {
  host: "localhost",
  user: "papers_user",
  password: "paperspass123",
  database: "papers_db",
  port: 3306,
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
    return rows; // Removed TypeScript type assertion
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
