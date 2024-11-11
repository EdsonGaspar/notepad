export function NoteCard() {
  return (
    <button className="bg-slate-800 text-left rounded-md p-5 space-y-3 outline-none overflow-hidden relative hover:ring-2 hover: ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">Há 2 dias </span>
      <p className="text-slate-400 text-sm leading-6 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
        aperiam quasi ratione dolore numquam quisquam hic quam fugiat. Nisi
        magni quibusdam accusantium illum quae rem ut itaque! Atque, natus unde.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2  bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </button>
  );
}
