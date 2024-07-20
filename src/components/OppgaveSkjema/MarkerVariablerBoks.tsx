import { Variabel } from "@/data/types";
import { useState } from "react";

interface MarkerVariablerBoksProps {
  oppgaveTekst: string;
  initialVariabler: Variabel[];
  onAction: (variabler: Variabel[], nyOppgavetekst: string) => void;
}

const MarkerVariablerBoks: React.FC<MarkerVariablerBoksProps> = ({
  oppgaveTekst,
  initialVariabler,
  onAction,
}) => {
  const [redivertOppgaveTekst, setRedivertOppgaveTekst] =
    useState<string>(oppgaveTekst);
  const [oppgavetekstMarkeringStart, setOppgavetekstMarkeringStart] =
    useState<number>(0);
  const [oppgavetekstMarkeringSlutt, setOppgavetekstMarkeringSlutt] =
    useState<number>(0);
  const [oppgavetekstMarkering, setOppgavetekstMarkering] = useState("");
  const [aktivtVariabelTegn, setAktivtVariabelTegn] = useState("");
  const [variabler, setVariabler] = useState<Variabel[]>(initialVariabler);

  const handleSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selected = textarea.value.substring(startPos, endPos);
    setOppgavetekstMarkeringStart(startPos);
    setOppgavetekstMarkeringSlutt(endPos);
    setOppgavetekstMarkering(selected);
  };

  const handleAddVariable = () => {
    if (
      aktivtVariabelTegn === "" ||
      oppgavetekstMarkering === "" ||
      oppgavetekstMarkering.includes("{") ||
      oppgavetekstMarkering.includes("}")
    ) {
      return;
    }
    const variabel: Variabel = {
      tegn: aktivtVariabelTegn,
    };
    let nyeVariabler: Variabel[] = [];
    if (!variabler.some((variabel) => variabel.tegn === aktivtVariabelTegn)) {
      nyeVariabler = [...variabler, variabel];
    } else {
      nyeVariabler = variabler;
    }
    const revidertTekst = behandleOppgavetekst();

    setVariabler(nyeVariabler);
    setRedivertOppgaveTekst(revidertTekst);
    console.log(nyeVariabler, revidertTekst);
    onAction(nyeVariabler, revidertTekst);
  };

  const behandleOppgavetekst = () => {
    const nyTekst =
      redivertOppgaveTekst.slice(0, oppgavetekstMarkeringStart) +
      `{${aktivtVariabelTegn}}` +
      redivertOppgaveTekst.slice(oppgavetekstMarkeringSlutt);
    return nyTekst;
  };

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4">
      <h1>Marker variabler</h1>
      <textarea
        value={redivertOppgaveTekst}
        onSelect={handleSelection}
        readOnly
        className="w-full px-3 py-2 border rounded-md mt-2 resize-none flex-grow min-h-0"
      />
      <input
        type="text"
        placeholder="Variabel-tegn"
        value={aktivtVariabelTegn}
        onChange={(e) => setAktivtVariabelTegn(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      <p>Markert område: {oppgavetekstMarkering}</p>
      <button
        type="button"
        onClick={handleAddVariable}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Legg til variabel
      </button>
    </div>
  );
};

export default MarkerVariablerBoks;
