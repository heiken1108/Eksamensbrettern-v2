import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-exam-hub-primary text-white p-6 px-8">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">Hjem</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/legg-til-oppgave">Legg til oppgave</Link>
        </div>
      </div>
    </nav>
  );
}
