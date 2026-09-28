import postgres from 'postgres';

async function test() {
  console.log("Testing PostgreSQL connection...");
  try {
    const sql = postgres('postgresql://postgres:postgres@localhost:5432/postgres', { timeout: 3 });
    const result = await sql`SELECT version()`;
    console.log("✅ Local PostgreSQL connected successfully:", result[0].version);
    await sql.end();
  } catch (err) {
    console.log("❌ Local PostgreSQL not running on 5432:", err.message);
  }
}

test();
