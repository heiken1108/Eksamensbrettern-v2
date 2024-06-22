export type Emne = {
  id: number;
  navn: string;
  emnekode: string;
};

export type Variabel = {
  tegn: string;
  type?: string; //Skal egentlig ikke være optional
  Min?: number; //Fiks at disse egentlig skal være små bokstaver
  Maks?: number;
  Steg?: number;
  Desimaler?: number;
  Verdier?: number[];
};

export type OppgaveType = {
  navn: string;
  steg: string[];
};

export type Størrelsesenhet = {
  navn: string;
  symbol: string;
  faktor: number;
};

export interface Oppgave {
  id?: number;
  tittel: string;
  type: string;
  oppgavetekst: string;
  løsningsforslag: string;
  emneid: number;
  aktiv: boolean;
}

export interface Regneoppgave extends Oppgave {
  variabler: Variabel[];
  løsningssteg: string[];
  aktiv: boolean;
  størrelsesorden: string;
}
