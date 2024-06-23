import { Regneoppgave, Variabel } from "@/data/types";

export function convertRegneoppgaveFromJSON(json: any): Regneoppgave {
  const regneoppgave = {
    tittel: json.tittel,
    oppgavetekst: json.oppgavetekst,
    variabler: json.variabler as Variabel[],
    løsningssteg: json.løsningssteg,
    løsningsforslag: json.løsningsforslag,
    type: json.type,
    emneid: json.emneid,
    aktiv: json.aktiv,
    størrelsesorden: json.størrelsesorden,
  };
  return regneoppgave;
}

export function convertTekstoppgaveFromJSON(json: any) {
  const tekstoppgave = {
    tittel: json.tittel,
    oppgavetekst: json.oppgavetekst,
    løsningsforslag: json.løsningsforslag,
    type: json.type,
    emneid: json.emneid,
    aktiv: json.aktiv,
  };
  return tekstoppgave;
}
