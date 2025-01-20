import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { X } from "lucide-react";
import { useState } from "react";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onNoteDeleted: (id: string) => void;
  onNoteUpdated: (id: string, content: string) => void;
}

export function NoteCard({
  note,
  onNoteDeleted,
  onNoteUpdated,
}: NoteCardProps) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(note.content);
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-slate-800 flex flex-col text-left rounded-md p-5 gap-3 outline-none overflow-hidden relative hover:ring-2 hover: ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 hover:scale-105 transition-all duration-300">
        <span className="text-sm font-medium text-slate-300">
          Criado{" "}
          {formatDistanceToNow(note.date, { locale: pt, addSuffix: true })}{" "}
        </span>
        <p className="text-slate-400 text-sm leading-6 ">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2  bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, { locale: pt, addSuffix: true })}{" "}
            </span>

            {!edit && (
              <p className="text-slate-400 text-sm leading-6 ">
                {note.content}
              </p>
            )}
            {edit && (
              <textarea
                className="bg-transparent border-none outline-none text-slate-400 w-full h-full"
                onChange={(evt) => setContent(evt.target.value)}
              >
                {content}
              </textarea>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (edit) {
                setEdit(false);
                onNoteUpdated(note.id, content);
              } else {
                setEdit(true);
              }
            }}
            className="bg-slate-800 py-4 text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja{" "}
            <span className="text-white group-hover:underline group-focus:underline transition-all ">
              {edit ? "Salvar" : "Editar essa nota"}
            </span>
            ?
          </button>

          <button
            type="button"
            onClick={() => onNoteDeleted(note.id)}
            className="bg-slate-800 py-4 text-sm text-slate-300 outline-none font-medium group"
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline group-focus:underline transition-all ">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
