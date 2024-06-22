"use client";
import { Størrelsesenheter } from "@/data/enheter";
import { oppgavetyper } from "@/data/oppgavetyper";
import { Emne, OppgaveType, Størrelsesenhet, Variabel } from "@/data/types";
import { variabeltyper } from "@/data/variabeltyper";
import { useEffect, useState } from "react";

export default function PostOppgaveSkjema() {
  const [state, setState] = useState(-1);
  const [oppgavetype, setOppgavetype] = useState<OppgaveType>({
    navn: "",
    steg: [],
  });
  const [tittel, setTittel] = useState("");
  const [muligeEmner, setMuligeEmner] = useState<Emne[]>([]);
  const [valgtEmne, setValgtEmne] = useState<Emne | null>(null);
  const [muligeTemaer, setMuligeTemaer] = useState<
    { id: number; navn: string }[]
  >([]);
  const [valgteTemaer, setValgteTemaer] = useState<number[]>([]);
  const [oppgavetekst, setOppgavetekst] = useState("");

  const [oppgavetekstMarkeringStart, setOppgavetekstMarkeringStart] =
    useState<number>(0);
  const [oppgavetekstMarkeringSlutt, setOppgavetekstMarkeringSlutt] =
    useState<number>(0);
  const [oppgavetekstMarkering, setOppgavetekstMarkering] = useState("");
  const [aktivtVariabelTegn, setAktivtVariabelTegn] = useState("");
  const [variabler, setVariabler] = useState<Variabel[]>([]);
  const [løsningssteg, setLøsningssteg] = useState<string[]>([]); //Mulig å ha funksjoner?
  const [aktivtLøsningssteg, setAktivtLøsningssteg] = useState("");

  const [løsningsforslag, setLøsningsforslag] = useState("");

  const [størrelsesEnhet, setStørrelsesEnhet] = useState<Størrelsesenhet>(
    Størrelsesenheter[0]
  );

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
    if (oppgavetype.navn === "Regneoppgave") {
      return {
        type: oppgavetype.navn,
        tittel: tittel,
        emne: valgtEmne,
        temaer: valgteTemaer,
        oppgavetekst: oppgavetekst,
        variabler: variabler,
        løsningssteg: løsningssteg,
        løsningsforslag: løsningsforslag,
        størrelsesenhet: størrelsesEnhet,
      };
    }
    return {};
  };

  const handleTypeSelection = (selectedOption: any) => {
    setOppgavetype(selectedOption);
    updateState(true);
  };

  const handleEmneSelection = (e: React.MouseEvent, selectedEmne: Emne) => {
    e.preventDefault();
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
    console.log(variabel);
    if (!variabler.some((variabel) => variabel.tegn === aktivtVariabelTegn)) {
      setVariabler((prevVariabler) => [...prevVariabler, variabel]);
    }
    behandleOppgavetekst();
  };

  const behandleOppgavetekst = () => {
    const nyTekst =
      oppgavetekst.slice(0, oppgavetekstMarkeringStart) +
      `{${aktivtVariabelTegn}}` +
      oppgavetekst.slice(oppgavetekstMarkeringSlutt);
    console.log(nyTekst);
    setOppgavetekst(nyTekst);
  };

  const handleEndreVariabeltype = (
    event: React.ChangeEvent<HTMLSelectElement>,
    tegn: string
  ) => {
    const nyType = event.target.value;

    const variabelIndex = variabler.findIndex((v) => v.tegn === tegn);

    if (variabelIndex !== -1) {
      const oppdatertVariabel = { ...variabler[variabelIndex], type: nyType };

      const oppdaterteVariabler = [...variabler];
      oppdaterteVariabler[variabelIndex] = oppdatertVariabel;
      console.log(oppdaterteVariabler);
      setVariabler(oppdaterteVariabler);
    }
  };

  const renderInputFeltForEgenskaper = (egenskaper: string[], tegn: string) => {
    return egenskaper.map((egenskap) => (
      <input
        key={egenskap}
        type="text"
        placeholder={egenskap}
        onChange={(e) => handleChangingVariable(tegn, egenskap, e.target.value)}
      />
    ));
  };

  const handleChangingVariable = (
    tegn: string,
    egenskap: string,
    inputverdi: string
  ) => {
    const variabelIndex = variabler.findIndex((v) => v.tegn === tegn);
    if (variabelIndex !== -1) {
      const oppdatertVariabel = {
        ...variabler[variabelIndex],
        [egenskap]: inputverdi,
      };

      const oppdaterteVariabler = [...variabler];
      oppdaterteVariabler[variabelIndex] = oppdatertVariabel;
      setVariabler(oppdaterteVariabler);
    }
  };

  const handleAddLøsningsSteg = () => {
    if (aktivtLøsningssteg === "") {
      return;
    }
    const nyLøsningsstegListe = [...løsningssteg, aktivtLøsningssteg];
    setLøsningssteg(nyLøsningsstegListe);
    setAktivtLøsningssteg("");
  };

  const handleRemoveLøsningSteg = (index: number) => () => {
    setLøsningssteg((prevSteg) => prevSteg.filter((_, i) => i !== index));
  };

  const handleEnhetSelection = (enhet: Størrelsesenhet) => {
    setStørrelsesEnhet(enhet);
    updateState(true);
  };

  function updateState(forward: boolean) {
    setState((prevState) => (forward ? prevState + 1 : prevState - 1));
  }

  return (
    <div id="mainFrame" className="p-4 bg-gray-100">
      <form onSubmit={submitForm} className="space-y-4">
        {state === -1 && (
          <ul className="space-y-2">
            {oppgavetyper.map((type) => (
              <li key={type.navn}>
                <button
                  key={type.navn}
                  onClick={() => handleTypeSelection(type)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {type.navn}
                </button>
              </li>
            ))}
          </ul>
        )}
        {oppgavetype.steg[state] === "Tittel" && (
          <input
            type="text"
            placeholder="Tittel"
            value={tittel}
            onChange={(e) => setTittel(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        )}

        {oppgavetype.steg[state] === "Velg emne" &&
          muligeEmner.length > 0 &&
          muligeEmner.map((emne) => (
            <button
              key={emne.id}
              onClick={(e) => handleEmneSelection(e, emne)}
              className="block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {emne.navn}
            </button>
          ))}

        {oppgavetype.steg[state] === "Velg temaer" && (
          <div className="space-y-2">
            {muligeTemaer.length > 0 &&
              muligeTemaer.map((tema) => (
                <div key={tema.id} className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={valgteTemaer.includes(tema.id)}
                      onChange={() => handleTemaSelection(tema.id)}
                      className="form-checkbox"
                    />
                    <span>{tema.navn}</span>
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
            className="w-full px-3 py-2 border rounded-md"
          />
        )}

        {oppgavetype.steg[state] === "Marker variabler" && (
          <>
            <input
              type="text"
              placeholder="Variabel-navn"
              value={aktivtVariabelTegn}
              onChange={(e) => setAktivtVariabelTegn(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <textarea
              rows={10}
              cols={20}
              value={oppgavetekst}
              onSelect={handleSelection}
              readOnly
              className="w-full px-3 py-2 border rounded-md mt-2"
            ></textarea>
            <p className="mt-2">Markert område: {oppgavetekstMarkering}</p>
            <button
              type="button"
              onClick={handleAddVariable}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Legg til variabel
            </button>
          </>
        )}

        {oppgavetype.steg[state] === "Definer variabler" && (
          <>
            <textarea
              rows={10}
              cols={20}
              value={oppgavetekst}
              readOnly
              className="w-full px-3 py-2 border rounded-md mt-2"
            ></textarea>
            <ul className="space-y-2">
              {variabler.map((variabel) => (
                <li key={variabel.tegn}>
                  <span>{variabel.tegn}</span>
                  <select
                    onChange={(e) => handleEndreVariabeltype(e, variabel.tegn)}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="">Velg en verdi</option>
                    {variabeltyper.map((variabeltype) => (
                      <option key={variabeltype.navn} value={variabeltype.navn}>
                        {variabeltype.navn}
                      </option>
                    ))}
                  </select>
                  {variabel.type && (
                    <>
                      {variabeltyper.map((type) => {
                        if (type.navn === variabel.type) {
                          return renderInputFeltForEgenskaper(
                            type.egenskaper,
                            variabel.tegn
                          );
                        }
                        return null;
                      })}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {oppgavetype.steg[state] === "Utregning" && (
          <>
            <textarea
              rows={10}
              cols={20}
              value={oppgavetekst}
              readOnly
              className="w-full px-3 py-2 border rounded-md mt-2"
            ></textarea>
            {løsningssteg.map(
              (
                steg,
                index //Fiks problem med key
              ) => (
                <div>
                  <span key={index}>{steg}</span>
                  <button key={steg} onClick={handleRemoveLøsningSteg(index)}>
                    X
                  </button>
                </div>
              )
            )}
            <input
              type="text"
              placeholder="Nytt løsningssteg"
              value={aktivtLøsningssteg}
              onChange={(e) => setAktivtLøsningssteg(e.target.value)}
            />
            <button type="button" onClick={handleAddLøsningsSteg}>
              Legg til steg
            </button>
          </>
        )}

        {oppgavetype.steg[state] === "Løsningsforslag" && (
          <textarea
            placeholder="Løsningsforslag"
            rows={10}
            cols={20}
            value={løsningsforslag}
            onChange={(e) => setLøsningsforslag(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        )}

        {oppgavetype.steg[state] === "Definer størrelsesorden" && (
          <ul className="space-y-2">
            {Størrelsesenheter.map((enhet) => (
              <li key={enhet.navn}>
                <button
                  key={enhet.navn}
                  onClick={() => handleEnhetSelection(enhet)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {`${enhet.navn} (${enhet.symbol})`}
                </button>
              </li>
            ))}
          </ul>
        )}

        {oppgavetype.steg[state] === "Send inn" && (
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <span>Legg til oppgave</span>
          </button>
        )}
      </form>
      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => updateState(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {"<-"}
        </button>
        <button
          type="button"
          onClick={() => updateState(true)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {"->"}
        </button>
      </div>
    </div>
  );
}
