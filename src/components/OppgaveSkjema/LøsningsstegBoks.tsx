import { UtførLøsningssteg } from "@/utils/taskHandling";
import { useEffect, useState } from "react";

interface LøsningstegBoksProps {
  løsningssteg: string[];
  oppgaveTekst: string;
  eksempelVariabler: Map<string, string>;
  onChangeLøsningssteg: (nyeLøsningssteg: string[]) => void;
}

const LøsningstegBoks: React.FC<LøsningstegBoksProps> = ({
  løsningssteg,
  oppgaveTekst,
  eksempelVariabler,
  onChangeLøsningssteg,
}) => {
  const [aktivtLøsningssteg, setAktivtLøsningssteg] = useState<string>("");
  const [utregning, setUtregning] = useState<string>("");

  const handleAddLøsningsSteg = () => {
    if (aktivtLøsningssteg === "") {
      return;
    }
    const nyLøsningsstegListe = [...løsningssteg, aktivtLøsningssteg];
    onChangeLøsningssteg(nyLøsningsstegListe);
    setAktivtLøsningssteg("");
  };

  const handleRemoveLøsningSteg = (index: number) => () => {
    const nyLøsningsstegListe = løsningssteg.filter((_, i) => i !== index);
    onChangeLøsningssteg(nyLøsningsstegListe);
  };

  useEffect(() => {
    try {
      const svar = UtførLøsningssteg(løsningssteg, eksempelVariabler);
      setUtregning(svar);
    } catch (error) {
      setUtregning("Utregning ikke gjennomført");
    }
  }, [løsningssteg]);

  return (
    <div className="flex flex-col w-full h-full p-4 gap-2">
      <h1 className="font-semibold">Løsningssteg</h1>
      <p>Eksempelvariabler: </p>
      {Array.from(eksempelVariabler).map(([key, value]) => (
        <div key={key} className="flex flex-row">
          <span>
            {key}: {value}
          </span>
        </div>
      ))}
      <p>Foreløpig utregning: {utregning}</p>
      <textarea
        value={oppgaveTekst}
        readOnly
        className="w-full px-3 py-2 border rounded-md mt-2 resize-none flex-grow min-h-0"
      />
      {løsningssteg.map((løsningssteg, index) => (
        <div key={index} className="flex flex-row">
          <span>
            Steg {index}: {løsningssteg}
          </span>
          <button className="ml-auto" onClick={handleRemoveLøsningSteg(index)}>
            X
          </button>
        </div>
      ))}
      <div className="flex flex-row">
        <input
          type="text"
          value={aktivtLøsningssteg}
          className="flex-grow border border-gray-400 p-2 mr-2"
          onChange={(e) => setAktivtLøsningssteg(e.target.value)}
        />
        <button type="button" className="p-2" onClick={handleAddLøsningsSteg}>
          Legg til steg
        </button>
      </div>
    </div>
  );
};

export default LøsningstegBoks;
