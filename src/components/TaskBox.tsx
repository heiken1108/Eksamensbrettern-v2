import { Oppgave, Regneoppgave } from "@/data/types";
import { useEffect, useState } from "react";
import RegneoppgaveBox from "./RegneoppgaveBox";
import TekstoppgaveBox from "./TekstoppgaveBox";

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
      <div>
        {task && task.type === "Regneoppgave" && (
          <RegneoppgaveBox regneoppgave={task as Regneoppgave} />
        )}
        {task && task.type === "Tekstoppgave" && (
          <TekstoppgaveBox tekstoppgave={task} />
        )}
      </div>
    </>
  );
}
