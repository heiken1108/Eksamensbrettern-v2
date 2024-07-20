import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  if (data.type.navn === "Tekstoppgave") {
    await sql`INSERT INTO oppgave(tittel, oppgavetekst, løsningsforslag, type) 
    VALUES (${data.tittel}, ${data.oppgavetekst}, ${data.løsningsforslag}, ${data.type.navn})`;
  } else if (data.type.navn === "Regneoppgave") {
    const jsonVariabler = JSON.stringify(data.variabler);
    await sql`INSERT INTO oppgave(tittel, oppgavetekst, variabler, løsningssteg, løsningsforslag, type, emneid, aktiv, størrelsesorden)
    VALUES (${data.tittel}, ${data.oppgavetekst}, ${jsonVariabler}, ${data.løsningssteg}, ${data.løsningsforslag}, ${data.type.navn}, ${data.emne.id}, true, ${data.størrelsesenhet.navn})`;
  } else {
    return Response.error();
  }
  return Response.json(data);
}
