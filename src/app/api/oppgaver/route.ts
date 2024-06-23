import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const data = await req.json();
  if (data.type == "Tekstoppgave") {
    await sql`INSERT INTO oppgave(tittel, oppgavetekst, løsningsforslag, type) 
    VALUES (${data.tittel}, ${data.oppgavetekst}, ${data.løsningsforslag}, ${data.type})`;
  }
  if (data.type == "Regneoppgave") {
    console.log(data);
    const jsonVariabler = JSON.stringify(data.variabler);
    await sql`INSERT INTO oppgave(tittel, oppgavetekst, variabler, løsningssteg, løsningsforslag, type, emneid, aktiv, størrelsesorden)
    VALUES (${data.tittel}, ${data.oppgavetekst}, ${jsonVariabler}, ${data.løsningssteg}, ${data.løsningsforslag}, ${data.type}, ${data.emne.id}, true, ${data.størrelsesenhet.navn})`;
  }
  return Response.json(data);
}
