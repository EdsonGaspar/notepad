import { useState } from "react";
// import logo from "./assets/logo-nlw-expert.svg";
import { AddNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import "./index.css";

// const K = {
//   date: new Date(),
//   content: "Primeiro conteudo, explicado.",
// };
interface Note {
  id: string;
  date: Date;
  content: string;
}
export function App() {
  const [notas, setNotas] = useState<Note[]>(() => {
    const noteOnStorage = localStorage.getItem("note");
    if (noteOnStorage) {
      return JSON.parse(noteOnStorage);
    }
    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notasArray = [newNote, ...notas];

    setNotas(notasArray);

    localStorage.setItem("note", JSON.stringify(notasArray));
  }

  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6">
      {/* <img src={logo} alt="NLW Expert logo" /> */}
      <p className="text-2xl text-center text-slate-400 font-bold py-2 px-4 tracking-tight cursor-pointer hover:text-slate-200 transition-all hover:rounded-lg w-40 absolute top-5 right-5 hover:scale-105 duration-300">
        <span>NoteFast</span>
      </p>
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas anotações"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>
      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <AddNoteCard onNoteCreated={onNoteCreated} />
        {notas.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
