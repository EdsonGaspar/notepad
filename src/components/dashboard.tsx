import { useState } from "react";
import { NoteCard } from "./note-card";

interface Note {
  id: string;
  date: Date;
  content: string;
}

export function DashboardCard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");

  const addNote = () => {
    if (!newNoteContent.trim()) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: newNoteContent,
    };

    setNotes([newNote, ...notes]);
    setNewNoteContent("");
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content, date: new Date() } : note
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      {/* Adicionar nova nota */}
      <div className="space-y-4">
        <textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Escreva sua nova nota aqui..."
          className="w-full p-4 bg-slate-700 text-slate-300 rounded-md outline-none focus:ring-2 focus:ring-slate-500"
        />
        <button
          onClick={addNote}
          className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded-md font-medium"
        >
          Adicionar Nota
        </button>
      </div>

      {/* Lista de Notas */}
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onNoteDeleted={deleteNote}
              onNoteUpdated={updateNote}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Nenhuma nota disponível.</p>
      )}
    </div>
  );
}
