"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Oppgaver() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["oppgaver"],
    queryFn: () => fetch(`/api/oppgaver/alle`).then((res) => res.json()),
  });

  return (
    <>
      <h1>Oppgaver</h1>
      {isLoading && <p>Laster...</p>}
      {error && <p>Det oppstod en feil</p>}
      {data && (
        <ul>
          {data.map((oppgave: any) => (
            <li key={oppgave.id}>
              <Link href={`/oppgaver/${oppgave.id}`}>{oppgave.tittel}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
