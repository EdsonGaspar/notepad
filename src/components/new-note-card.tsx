import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface AddNewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function AddNoteCard({ onNoteCreated }: AddNewNoteCardProps) {
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true);
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  function handleOnboard() {
    setShouldShowOnboard(false);
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    // console.log(event.target.value);
    if (event.target.value === "") {
      setShouldShowOnboard(true);
    }
  };

  function handleOnSaveText(event: FormEvent) {
    event.preventDefault();
    // console.log(`Foi clicado.`);
    if (content === "") {
      return;
    }
    onNoteCreated(content);
    setContent("");
    setShouldShowOnboard(true);
    toast.success("Nota salvo com sucesso.");
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelizmente seu navegador não suporta a API de gravação!");
      return;
    }
    setIsRecording(true);
    setShouldShowOnboard(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      // console.log(event.results);
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
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

        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex  flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboard ? (
                <p className="text-slate-400 text-sm leading-6 ">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline "
                  >
                    gravando uma nota
                  </button>{" "}
                  em audio ou se preferir{" "}
                  <button
                    type="button"
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
                  value={content}
                ></textarea>
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="bg-slate-900  py-4 text-sm text-slate-300 outline-none font-medium group hover:text-slate-100  focus-visible:bg-lime-500 focus-visible:outline-none cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2 group-hover:underline group-focus:underline transition-all ">
                  <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                  Gravando! (clique p/interromper)
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOnSaveText}
                className="bg-lime-400 py-4 text-sm text-slate-950 outline-none font-medium group hover:bg-lime-500  focus-visible:bg-lime-500 focus-visible:outline-none cursor-pointer"
              >
                <span className="group-hover:underline group-focus:underline transition-all ">
                  Salvar nota
                </span>
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
