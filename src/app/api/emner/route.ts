import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const emner = await sql`SELECT * FROM emne`;

  return Response.json(emner.rows.length > 0 ? emner.rows : null);
}
