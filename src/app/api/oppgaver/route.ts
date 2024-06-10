import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const data = await req.json();
  if (data.type == "Tekstoppgave") {
    await sql`INSERT INTO oppgave(tittel, oppgavetekst, losningsforslag, type) 
    VALUES (${data.tittel}, ${data.oppgavetekst}, ${data.løsningsforslag}, ${data.type})`;
  }
  return Response.json(data);
}
