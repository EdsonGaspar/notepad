import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export function AddNoteCard() {
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true);

  function handleOnboard() {
    setShouldShowOnboard(false);
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value);
    if (event.target.value === "") {
      setShouldShowOnboard(true);
    }
  };

  function handleOnSaveText(event: FormEvent) {
    event.preventDefault();
    console.log(`Foi clicado.`);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-slate-700 rounded-md p-5 flex flex-col text-left gap-3 overflow-hidden hover:ring-2 hover: ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-slate-400 text-sm leading-6 ">
          Grave uma nota em àudio que será convertida para texto automaticamente
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleOnSaveText} className="flex-1 flex  flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboard ? (
                <p className="text-slate-400 text-sm leading-6 ">
                  Comece
                  <button className="font-medium text-lime-400 hover:underline ">
                    gravando uma nota
                  </button>
                  em audio ou se preferir
                  <button
                    onClick={handleOnboard}
                    className="font-medium text-lime-400 hover:underline "
                  >
                    utilize apenas texto
                  </button>
                </p>
              ) : (
                <textarea
                  cols={1}
                  rows={6}
                  autoFocus
                  className="flex-1 text-sm leading-6 text-slate-400 bg-transparent resize-none outline-none"
                  onChange={handleContentChange}
                ></textarea>
              )}
            </div>

            <button
              type="submit"
              className="bg-lime-400 py-4 text-sm text-slate-950 outline-none font-medium group hover:bg-lime-500  focus-visible:bg-lime-500 focus-visible:outline-none cursor-pointer"
            >
              <span className="group-hover:underline group-focus:underline transition-all ">
                Salvar nota
              </span>
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
