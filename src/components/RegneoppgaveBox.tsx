import { Regneoppgave } from "@/data/types";
import { evaluateUserInput } from "@/utils/taskEvaluation";
import { SetUpRegneoppgave } from "@/utils/taskHandling";
import { useEffect, useState } from "react";

export default function RegneoppgaveBox({
  regneoppgave,
}: {
  regneoppgave: Regneoppgave;
}) {
  const [oppgavetekst, setOppgavetekst] = useState<string>();
  const [korrektSvar, setKorrektSvar] = useState<string>("");
  const [svar, setSvar] = useState<string>("");

  useEffect(() => {
    if (
      regneoppgave.oppgavetekst === undefined ||
      regneoppgave.variabler === undefined ||
      regneoppgave.løsningssteg === undefined
    ) {
      return;
    }
    const { revidertOppgavetekst, svar } = SetUpRegneoppgave({
      oppgavetekst: regneoppgave.oppgavetekst,
      udefinerteVariabler: regneoppgave.variabler,
      løsningssteg: regneoppgave.løsningssteg,
    });
    setOppgavetekst(revidertOppgavetekst);
    setKorrektSvar(svar);
  }, []);

  const handleCheckAnswer = () => {
    evaluateUserInput(svar, korrektSvar) ? alert("Riktig!") : alert("Feil!");
  };

  return (
    <>
      <h1>{oppgavetekst}</h1>
      <input
        type="text"
        placeholder="Skriv inn ditt svar"
        value={svar}
        onChange={(e) => setSvar(e.target.value)}
      />
      <button onClick={handleCheckAnswer}>Sjekk svar</button>
    </>
  );
}
