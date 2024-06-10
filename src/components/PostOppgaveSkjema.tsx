"use client";
import { oppgavetyper } from "@/data/oppgavetyper";
import { Emne } from "@/data/types";
import { useEffect, useState } from "react";

export default function PostOppgaveSkjema() {
  const [state, setState] = useState(-1);
  const [oppgavetype, setOppgavetype] = useState({ navn: "", steg: [] }); // Initialize with an empty type
  const [tittel, setTittel] = useState("");
  const [muligeEmner, setMuligeEmner] = useState<Emne[]>([]); // Fetch from database
  const [valgtEmne, setValgtEmne] = useState<Emne | null>(null); // Allow null initial state
  const [muligeTemaer, setMuligeTemaer] = useState<
    { id: number; navn: string }[]
  >([]);
  const [valgteTemaer, setValgteTemaer] = useState<number[]>([]);
  const [oppgavetekst, setOppgavetekst] = useState("");
  const [løsningsforslag, setLøsningsforslag] = useState("");

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const oppgave = constructOppgave();

    fetch("/api/oppgaver", {
      method: "POST",
      body: JSON.stringify(oppgave),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    fetch("/api/emner")
      .then((res) => res.json())
      .then((data) => setMuligeEmner(data));
  }, []);

  useEffect(() => {
    if (valgtEmne) {
      fetch(`/api/emner/${valgtEmne.id}/tema`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            updateState(true);
          } else {
            setMuligeTemaer(data);
          }
        });
    }
  }, [valgtEmne]);

  const constructOppgave = () => {
    if (oppgavetype.navn === "Tekstoppgave") {
      return {
        type: oppgavetype.navn,
        tittel: tittel,
        oppgavetekst: oppgavetekst,
        løsningsforslag: løsningsforslag,
      };
    }
    // Add other oppgavetype cases if needed
    return {};
  };

  const handleTypeSelection = (selectedOption: any) => {
    setOppgavetype(selectedOption);
    updateState(true);
  };

  const handleEmneSelection = (e: React.MouseEvent, selectedEmne: Emne) => {
    e.preventDefault(); // Prevent the default button behavior
    setValgtEmne(selectedEmne);
    updateState(true);
  };

  const handleTemaSelection = (temaId: number) => {
    setValgteTemaer((prevTemaer) =>
      prevTemaer.includes(temaId)
        ? prevTemaer.filter((id) => id !== temaId)
        : [...prevTemaer, temaId]
    );
  };

  function updateState(forward: boolean) {
    setState((prevState) => (forward ? prevState + 1 : prevState - 1));
  }

  return (
    <div id="mainFrame">
      <form onSubmit={submitForm}>
        {state === -1 &&
          oppgavetyper.map((type) => (
            <button key={type.navn} onClick={() => handleTypeSelection(type)}>
              {type.navn}
            </button>
          ))}

        {oppgavetype.steg[state] === "Tittel" && (
          <input
            type="text"
            placeholder="Tittel"
            value={tittel}
            onChange={(e) => setTittel(e.target.value)}
          />
        )}

        {oppgavetype.steg[state] === "Velg emne" &&
          muligeEmner.length > 0 &&
          muligeEmner.map((emne) => (
            <button key={emne.id} onClick={(e) => handleEmneSelection(e, emne)}>
              {emne.navn}
            </button>
          ))}

        {oppgavetype.steg[state] === "Velg temaer" && (
          <div>
            {muligeTemaer.length > 0 &&
              muligeTemaer.map((tema) => (
                <div key={tema.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={valgteTemaer.includes(tema.id)}
                      onChange={() => handleTemaSelection(tema.id)}
                    />
                    {tema.navn}
                  </label>
                </div>
              ))}
          </div>
        )}

        {oppgavetype.steg[state] === "Oppgavetekst" && (
          <textarea
            placeholder="Oppgavetekst"
            rows={10}
            cols={20}
            value={oppgavetekst}
            onChange={(e) => setOppgavetekst(e.target.value)}
          />
        )}

        {oppgavetype.steg[state] === "Løsningsforslag" && (
          <textarea
            placeholder="Løsningsforslag"
            rows={10}
            cols={20}
            value={løsningsforslag}
            onChange={(e) => setLøsningsforslag(e.target.value)}
          />
        )}

        {oppgavetype.steg[state] === "Send inn" && (
          <button type="submit">
            <span>Legg til oppgave</span>
          </button>
        )}
      </form>
      <button type="button" onClick={() => updateState(false)}>
        {"<-"}
      </button>
      <button type="button" onClick={() => updateState(true)}>
        {"->"}
      </button>
    </div>
  );
}
