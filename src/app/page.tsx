import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/legg-til-oppgave">Gå til side for legge til oppgaver</Link>
    </main>
  );
}
