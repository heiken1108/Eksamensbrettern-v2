"use client";
import StateNavigator from "@/components/OppgaveSkjema/StateNavigator";
import { Emne, OppgaveType, Størrelsesenhet, Variabel } from "@/data/types";
import { useState } from "react";
import OppgaveTypeValgBoks from "@/components/OppgaveSkjema/OppgaveTypeValgBoks";
import ShortTextInput from "@/components/OppgaveSkjema/ShortTextInput";
import EmnevalgBoks from "@/components/OppgaveSkjema/EmnevalgBoks";
import TemaerValgBoks from "@/components/OppgaveSkjema/TemaerValgBoks";
import LongTextInput from "@/components/OppgaveSkjema/LongTextInput";
import MarkerVariablerBoks from "@/components/OppgaveSkjema/MarkerVariablerBoks";
import DefinerVariablerBoks from "@/components/OppgaveSkjema/DefinerVariablerBoks";
import LøsningstegBoks from "@/components/OppgaveSkjema/LøsningsstegBoks";
import StørrlesesenhetValgBoks from "@/components/OppgaveSkjema/StørrlesesenhetValgBoks";
import { useMutation } from "@tanstack/react-query";

export default function LeggTilOppgave() {
  const [state, setState] = useState<number>(-1);
  const [oppgavetype, setOppgavetype] = useState<OppgaveType>({
    navn: "",
    steg: [],
  });
  const [tittel, setTittel] = useState<string>("");
  const [emne, setEmne] = useState<Emne>();
  const [temaer, setTemaer] = useState<number[]>([]);
  const [oppgaveTekst, setOppgaveTekst] = useState<string>("");
  const [variabler, setVariabler] = useState<Variabel[]>([]);
  const [løsningssteg, setLøsningssteg] = useState<string[]>([]);
  const [løsningsforslag, setLøsningsforslag] = useState<string>("");
  const [størrelsesenhet, setStørrelsesenhet] = useState<Størrelsesenhet>();

  const handleChangeState = (forward: boolean) => {
    // TODO: Implement borders for state values [-1, ->]
    setState((prevState) => (forward ? prevState + 1 : prevState - 1));
  };

  const constructOppgaveObjekt = () => {
    return {
      type: oppgavetype,
      tittel: tittel,
      emne: emne,
      temaer: temaer,
      oppgavetekst: oppgaveTekst,
      variabler: variabler,
      løsningssteg: løsningssteg,
      løsningsforslag: løsningsforslag,
      størrelsesenhet: størrelsesenhet,
    };
  };

  const { mutate: handleSendInnOppgave, isPending } = useMutation({
    mutationFn: () =>
      fetch("/api/oppgaver", {
        method: "POST",
        body: JSON.stringify(constructOppgaveObjekt()),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      console.log("Oppgave sendt inn");
      window.location.reload();
    },
  });

  return (
    <div
      id="mainframe"
      className="p-4 flex-grow flex justify-center items-center bg-white"
    >
      <div id="taskBox" className="h-4/5 aspect-1 bg-gray-100 flex flex-col">
        <div className="flex-grow flex items-center justify-center overflow-auto">
          {/* Komponent for å velge emne */}
          {state === -1 && (
            <OppgaveTypeValgBoks
              onSelect={(oppgavetype) => {
                setOppgavetype(oppgavetype);
                handleChangeState(true);
              }}
            />
          )}

          {/* Komponent for å skrive inn tittel */}
          {oppgavetype.steg[state] === "Tittel" && (
            <ShortTextInput
              name={"Tittel"}
              initialValue={tittel}
              onChange={(input: string) => setTittel(input)}
            />
          )}

          {/* Komponent for å velge emne */}
          {oppgavetype.steg[state] === "Velg emne" && (
            <EmnevalgBoks
              onSelectOption={(emne) => {
                setEmne(emne);
                handleChangeState(true);
              }}
            />
          )}

          {/* Komponent for å velge temaer */}
          {oppgavetype.steg[state] === "Velg temaer" && emne && (
            <TemaerValgBoks
              emneId={emne.id}
              onTemaSelectionChange={(temaer) => {
                setTemaer(temaer);
                console.log(temaer);
              }}
            />
          )}

          {/* Komponent for å skrive inn oppgavetekst */}
          {oppgavetype.steg[state] === "Oppgavetekst" && (
            <LongTextInput
              name="Oppgavetekst"
              initialValue={oppgaveTekst}
              onTekstChange={(input: string) => setOppgaveTekst(input)}
            />
          )}

          {/* Komponent for å markere variabler */}
          {oppgavetype.steg[state] === "Marker variabler" && (
            <MarkerVariablerBoks
              oppgaveTekst={oppgaveTekst}
              initialVariabler={variabler}
              onAction={(nyeVariabler, revidertOppgaveteskt) => {
                setOppgaveTekst(revidertOppgaveteskt);
                setVariabler(nyeVariabler);
              }}
            />
          )}

          {/* Komponent for å definere verdiene til variablene */}
          {oppgavetype.steg[state] === "Definer variabler" && (
            <DefinerVariablerBoks
              variabler={variabler}
              oppgavetekst={oppgaveTekst}
              onChangeVariabler={(variabler) => setVariabler(variabler)}
            />
          )}

          {/* Komponent for å definere utregning av regneoppgaven */}
          {oppgavetype.steg[state] === "Utregning" && (
            <LøsningstegBoks
              løsningssteg={løsningssteg}
              oppgaveTekst={oppgaveTekst}
              onChangeLøsningssteg={(nyeLøsningssteg: string[]) =>
                setLøsningssteg(nyeLøsningssteg)
              }
            />
          )}

          {/* Komponent for å legge til løsningsforslag */}
          {oppgavetype.steg[state] === "Løsningsforslag" && (
            <LongTextInput
              name="Løsningsforslag"
              initialValue={løsningsforslag}
              onTekstChange={(tekst) => setLøsningsforslag(tekst)}
            />
          )}

          {/* Komponent for å velge størrelsesenhet */}
          {oppgavetype.steg[state] === "Definer størrelsesorden" && (
            <StørrlesesenhetValgBoks
              onSelectOption={(enhet) => {
                setStørrelsesenhet(enhet);
                handleChangeState(true);
              }}
            />
          )}

          {/* Komponent for å sende inn oppgave */}
          {oppgavetype.steg[state] === "Send inn" && (
            <button
              onClick={() => handleSendInnOppgave()}
              className="px-4 py-4 w-4/5 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              <span>Legg til oppgave</span>
            </button>
          )}
        </div>
        <StateNavigator onChangeState={handleChangeState} />
      </div>
    </div>
  );
}
