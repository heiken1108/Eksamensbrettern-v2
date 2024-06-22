import { Regneoppgave, Variabel } from "@/data/types";

export function convertRegneoppgaveFromJSON(json: any): Regneoppgave {
  const regneoppgave = {
    tittel: json.tittel,
    oppgavetekst: json.oppgavetekst,
    variabler: json.variabler as Variabel[],
    løsningssteg: json.losningssteg,
    løsningsforslag: json.losningsforslag,
    type: json.type,
    emneid: json.emneid,
    aktiv: json.aktiv,
    størrelsesorden: json.størrelsesorden,
  };
  console.log(regneoppgave);
  return regneoppgave;
}
