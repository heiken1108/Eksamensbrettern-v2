import { Oppgave, Regneoppgave } from "@/data/types";
import { useEffect, useState } from "react";
import RegneoppgaveBox from "./RegneoppgaveBox";

export default function TaskBox({ id }: { id: string }) {
  const [task, setTask] = useState<Regneoppgave | Oppgave>();

  useEffect(() => {
    fetch(`/api/oppgaver/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data[0]);
      });
  }, []);

  return (
    <>
      <div
        id="taskBox"
        className="h-4/5 aspect-1 bg-gray-100 flex flex-col p-4 gap-4"
      >
        <div className="flex-grow flex items-center justify-center overflow-auto">
          {task && task.type === "Regneoppgave" && (
            <RegneoppgaveBox regneoppgave={task as Regneoppgave} />
          )}
        </div>
      </div>
    </>
  );
}
