import { useState } from "react";
import logo from "./assets/logo-nlw-expert.svg";
import { AddNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import "./index.css";

// const K = {
//   date: new Date(),
//   content: "Primeiro conteudo, explicado.",
// };

export function App() {
  const [notas, setNotas] = useState([
    { id: 1, date: new Date(), content: "Primeiro conteudo, não gravado..." },
    { id: 2, date: new Date(), content: "Segundo conteudo, não gravado..." },
  ]);
  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6">
      <img src={logo} alt="NLW Expert logo" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas anotações"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>
      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <AddNoteCard />
        {notas.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
