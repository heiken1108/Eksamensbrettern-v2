import { sql } from "@vercel/postgres";

export async function GET(req: Request, { params }: any) {
  const oppgave = await sql`select * from oppgave where id = ${params.id}`;
  return Response.json(oppgave.rows.length > 0 ? oppgave.rows : []);
}
