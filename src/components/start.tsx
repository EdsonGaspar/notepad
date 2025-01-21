import { ChangeEvent, useState } from "react";
// import logo from "./assets/logo-nlw-expert.svg";
import { AddNoteCard } from "./new-note-card";
import { NoteCard } from "./note-card";

// const K = {
//   date: new Date(),
//   content: "Primeiro conteudo, explicado.",
// };
interface Note {
  id: string;
  date: Date;
  content: string;
}
export function Start() {
  const [onSearch, setOnSearch] = useState("");
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

  function onNoteDeleted(id: string) {
    const notaDeleted = notas.filter((nota) => {
      return nota.id !== id;
    });

    setNotas(notaDeleted);

    localStorage.setItem("note", JSON.stringify(notaDeleted));
  }

  function onNoteUpdated(id: string, content: string) {
    const notaUpdated = notas.map((nota) => {
      if (nota.id === id) {
        return { ...nota, content };
      }
      return nota;
    });

    setNotas(notaUpdated);

    localStorage.setItem("note", JSON.stringify(notaUpdated));

    console.log(notaUpdated);
  }

  // function editNote(id: string) {
  //   const nota = notas.find((nota) => nota.id === id);

  //   console.log(nota);
  // }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setOnSearch(query);
  }

  // console.log(onSearch);

  const filtereNotes =
    onSearch !== ""
      ? notas.filter((note) =>
          note.content
            .toLocaleLowerCase()
            .includes(onSearch.toLocaleLowerCase())
        )
      : notas;

  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6 px-5 lg:px-0">
      {/* <img src={logo} alt="NLW Expert logo" /> */}
      <p className="text-2xl text-center text-slate-400 font-bold py-2 px-4 tracking-tight cursor-pointer hover:text-slate-200 transition-all hover:rounded-lg w-40 absolute top-5 right-5 hover:scale-105 duration-300 ">
        <span>NoteFast</span>
      </p>
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas anotações"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:px-5 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <AddNoteCard onNoteCreated={onNoteCreated} />
        {filtereNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onNoteDeleted={onNoteDeleted}
              onNoteUpdated={onNoteUpdated}
            />
          );
        })}
      </div>
    </div>
  );
}
