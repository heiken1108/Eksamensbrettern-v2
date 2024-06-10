import PostOppgaveSkjema from "@/components/PostOppgaveSkjema";

export default function LeggTilOppgave() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Legg til oppgave</h1>
      <PostOppgaveSkjema />
    </div>
  );
}
