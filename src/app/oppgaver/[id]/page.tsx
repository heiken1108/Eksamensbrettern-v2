"use client";
import { Størrelsesenheter } from "@/data/enheter";
import { Regneoppgave } from "@/data/types";
import { convertRegneoppgaveFromJSON } from "@/utils/JSONConverter";
import { SetUpRegneoppgave } from "@/utils/taskHandling";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [regneoppgave, setRegneoppgave] = useState<Regneoppgave>();

  useEffect(() => {
    fetch(`/api/oppgaver/${params.id}`)
      .then((res) => res.json())
      .then((data) => setRegneoppgave(convertRegneoppgaveFromJSON(data[0])));
  }, []);

  useEffect(() => {
    const enhet = Størrelsesenheter.find(
      (enhet) => enhet.navn === regneoppgave?.størrelsesorden
    );
    if (
      regneoppgave?.oppgavetekst === undefined ||
      regneoppgave?.variabler === undefined ||
      regneoppgave?.løsningssteg === undefined ||
      enhet === undefined
    ) {
      return;
    }

    const { revidertOppgavetekst, svar } = SetUpRegneoppgave({
      oppgavetekst: regneoppgave.oppgavetekst,
      udefinerteVariabler: regneoppgave.variabler,
      løsningssteg: regneoppgave.løsningssteg,
    });
    console.log(revidertOppgavetekst, svar);
  }, [regneoppgave]);

  return (
    <div>
      {regneoppgave && (
        <div>
          <h1>{regneoppgave.tittel}</h1>
        </div>
      )}
    </div>
  );
}
