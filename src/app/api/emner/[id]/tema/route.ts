import { sql } from "@vercel/postgres";

export async function GET(req: Request, { params }: any) {
  const temaer = await sql`select t.id, t.navn from tema t
join emne_tema et on t.id = et.temaID and emneID =  ${params.id}`;
  return Response.json(temaer.rows.length > 0 ? temaer.rows : []);
}
