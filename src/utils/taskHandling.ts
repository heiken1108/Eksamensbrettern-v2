import { Variabel } from "@/data/types";

var Algebrite = require("algebrite");

export function SetUpRegneoppgave({
  oppgavetekst,
  udefinerteVariabler,
  løsningssteg,
}: {
  oppgavetekst: string;
  udefinerteVariabler: Variabel[];
  løsningssteg: string[];
}) {
  //Få oppgavetekst, variabler, løsningssteg og størrelsesenhet
  //Bestem varibel-verdier tilfeldig
  const variabler = BestemVariabler(udefinerteVariabler);
  //Bytt ut variabler med verdier i oppgavetekst
  const revidertOppgavetekst = ByttUtVariabler(oppgavetekst, variabler);
  //Utfør regnesteg
  const svar = UtførLøsningssteg(løsningssteg, variabler);

  //Returner revidert oppgavetekst og svar
  return { revidertOppgavetekst, svar };
}

export function UtførLøsningssteg(
  løsningssteg: string[],
  variabler: Map<string, string>
): string {
  console.log("løsningssteg", løsningssteg, "variabler", variabler);
  let svar = "";
  const tempVariabler = variabler;
  løsningssteg.forEach((steg, index) => {
    const likning = ByttUtVariabler(steg, tempVariabler);
    const resultat = fractionToNumber(Algebrite.run(likning)).toString();
    tempVariabler.set(`S${index}`, resultat.toString());
    if (index === løsningssteg.length - 1) {
      svar = resultat;
    }
  });
  return svar;
}

function fractionToNumber(fraction: string): string {
  const parts = fraction.split("/");
  if (parts.length !== 2) {
    return fraction;
  }

  const numerator = parseFloat(parts[0]);
  const denominator = parseFloat(parts[1]);

  if (isNaN(numerator) || isNaN(denominator)) {
    throw new Error("Invalid numbers in fraction");
  }

  if (denominator === 0) {
    throw new Error("Division by zero");
  }

  return (numerator / denominator).toString();
}

function ByttUtVariabler(oppgavetekst: string, variabler: Map<string, string>) {
  variabler.forEach((verdi, tegn) => {
    oppgavetekst = ErstattVariabel(oppgavetekst, tegn, verdi);
  });
  return oppgavetekst;
}

function ErstattVariabel(streng: string, tegn: string, verdi: string) {
  const korrektTegn = `{${tegn}}`;
  const regex = new RegExp(korrektTegn, "g");
  return streng.replace(regex, verdi.toString());
}

function BestemVariabler(variabler: Variabel[]): Map<string, string> {
  const variabelMap = new Map<string, string>();
  variabler.map((variabel) => {
    const verdi = BestemVariabelVerdi(variabel);
    variabelMap.set(variabel.tegn, verdi.toString());
  });
  return variabelMap;
}

function BestemVariabelVerdi(variabel: Variabel): number {
  if (variabel.type === "Heltall") {
    if (variabel.Min === undefined || variabel.Maks === undefined) {
      throw new Error("En eller flere variabler mangler Min eller maks-verdi");
    }
    const min = Number(variabel.Min);
    const maks = Number(variabel.Maks);
    return Math.floor(Math.random() * (maks - min + 1) + min);
  } else if (variabel.type === "Semi-kontinuerlig") {
    if (
      variabel.Steg === undefined ||
      variabel.Min === undefined ||
      variabel.Maks === undefined
    ) {
      throw new Error(
        "En eller flere variabler mangler steg, Min eller maks-verdi"
      );
    }
    if (variabel.Steg <= 0) {
      throw new Error("Steg må være større enn 0");
    }
    const min = Number(variabel.Min);
    const maks = Number(variabel.Maks);
    const steg = Number(variabel.Steg);
    return (
      Math.floor(Math.random() * (Math.floor((maks - min) / steg) + 1)) * steg +
      min
    );
  } else if (variabel.type === "Kontinuerlig") {
    if (
      variabel.Min === undefined ||
      variabel.Maks === undefined ||
      variabel.Desimaler === undefined
    ) {
      throw new Error(
        "En eller flere variabler mangler Min, maks eller desimaler-verdi"
      );
    }
    const min = Number(variabel.Min);
    const maks = Number(variabel.Maks);
    const desimaler = Number(variabel.Desimaler);
    const tilfeldigTall = Math.random() * (maks - min) + min;
    return parseFloat(tilfeldigTall.toFixed(desimaler));
  } else if (variabel.type === "Bestemt") {
    if (variabel.Verdier === undefined) {
      throw new Error("Variabel mangler verdier");
    }
    const tilfeldigIndex = Math.floor(Math.random() * variabel.Verdier.length);
    return Number(variabel.Verdier[tilfeldigIndex]);
  }
  return 0;
}
