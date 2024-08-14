"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import TaskBox from "@/components/Oppgave/TaskBox";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const { isLoading, error, data } = useQuery({
    queryKey: ["oppgaver", id],
    queryFn: () => fetch(`/api/oppgaver/${id}`).then((res) => res.json()),
  });
  if (isLoading) return <Loading message="Laster" />;
  if (error) return <Error errorMessage="Det oppstod en feil" />;

  console.log(data);

  return (
    <div
      id="mainframe"
      className="p-4 flex-grow flex justify-center items-center bg-white"
    >
      <TaskBox task={data} />
    </div>
  );
}
