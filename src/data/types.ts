export type Emne = {
  id: number;
  navn: string;
  emnekode: string;
};

export type Variabel = {
  tegn: string;
  type?: string;
  min?: number;
  max?: number;
  steg?: number;
  desimaler?: number;
  verdier?: number[];
};

export type OppgaveType = {
  navn: string;
  steg: string[];
};
