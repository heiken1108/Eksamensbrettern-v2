import { useEffect, useState } from "react";
import Error from "../Error";
import { SetUpRegneoppgave } from "@/utils/taskHandling";
import { evaluateUserInput } from "@/utils/taskEvaluation";

interface TaskBoxProps {
  task: any;
}

const TaskBox: React.FC<TaskBoxProps> = ({ task }) => {
  const { type } = task;

  return (
    <div
      id="taskBox"
      className="h-4/5 w-2/3 bg-gray-100 flex flex-col p-4 gap-4"
    >
      <div className="flex-grow flex items-center justify-center overflow-auto">
        {type === "Regneoppgave" ? (
          <RegnetaskBox task={task} />
        ) : type === "Tekstoppgave" ? (
          <TekstoppgaveBox task={task} />
        ) : (
          <Error errorMessage="Ukjent oppgave" />
        )}
      </div>
    </div>
  );
};

const RegnetaskBox: React.FC<TaskBoxProps> = ({ task }) => {
  const [oppgavetekst, setOppgavetekst] = useState<string>("");
  const [korrektSvar, setKorrektSvar] = useState<string>("");
  const [svar, setSvar] = useState<string>("");

  const handleUpdateTask = () => {
    if (!task.oppgavetekst || !task.variabler || !task.løsningssteg) return;

    const { revidertOppgavetekst, svar } = SetUpRegneoppgave({
      oppgavetekst: task.oppgavetekst,
      udefinerteVariabler: task.variabler,
      løsningssteg: task.løsningssteg,
    });

    setOppgavetekst(revidertOppgavetekst);
    setKorrektSvar(svar);
  };

  const handleCheckAnswer = () => {
    console.log(svar, korrektSvar);
    const isCorrect = evaluateUserInput(svar, korrektSvar);
    if (isCorrect) {
      alert("Riktig!");
      handleUpdateTask();
      setSvar("");
    } else {
      alert("Feil!");
    }
  };

  useEffect(() => {
    handleUpdateTask();
  }, [task]);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-xl font-bold">{oppgavetekst}</h1>
      <input
        type="text"
        placeholder="Skriv inn ditt svar"
        value={svar}
        onChange={(e) => setSvar(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
      />
      <button
        onClick={handleCheckAnswer}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
      >
        Sjekk svar
      </button>
    </div>
  );
};

const TekstoppgaveBox: React.FC<TaskBoxProps> = ({ task }) => {
  return <>Tekst</>;
};

export default TaskBox;
