import { Variabel } from "@/data/types";
import { variabeltyper } from "@/data/variabeltyper";

interface DefinerVariablerBoksProps {
  variabler: Variabel[];
  oppgavetekst: string;
  onChangeVariabler: (variabler: Variabel[]) => void;
}

const DefinerVariablerBoks: React.FC<DefinerVariablerBoksProps> = ({
  variabler,
  oppgavetekst,
  onChangeVariabler,
}) => {
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
      onChangeVariabler(oppdaterteVariabler);
    }
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
      onChangeVariabler(oppdaterteVariabler);
    }
  };
  return (
    <div className="w-full h-full flex flex-col p-4">
      <h1>Definer variabler</h1>
      <textarea className="resize-none" value={oppgavetekst} readOnly />
      <div className="my-4">
        {variabler.map((variabel) => (
          <div className="w-full flex flex-row gap-2">
            <span className="py-2">{variabel.tegn}: </span>
            <select
              onChange={(e) => handleEndreVariabeltype(e, variabel.tegn)}
              className="ml-2 p-2 border rounded"
            >
              <option value="" selected disabled>
                Velg variabeltype
              </option>
              {variabeltyper.map((variabeltype) => (
                <option
                  key={variabeltype.navn}
                  selected={variabeltype.navn === variabel.type}
                  value={variabeltype.navn}
                >
                  {variabeltype.navn}
                </option>
              ))}
            </select>
            {variabel.type && (
              <>
                {variabeltyper.map((type) => {
                  if (type.navn === variabel.type) {
                    return type.egenskaper.map((egenskap) => (
                      <input
                        key={egenskap}
                        type="text"
                        placeholder={egenskap}
                        className="border border-gray-400 p-2 w-20"
                        onChange={(e) =>
                          handleChangingVariable(
                            variabel.tegn,
                            egenskap,
                            e.target.value
                          )
                        }
                      />
                    ));
                  }
                  return null;
                })}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DefinerVariablerBoks;
