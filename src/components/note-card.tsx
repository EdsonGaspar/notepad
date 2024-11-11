export function NoteCard() {
  return (
    <div className="bg-slate-800 rounded-md p-5 space-y-3 overflow-hidden relative">
      <span className="text-sm font-medium text-slate-300">Há 2 dias </span>
      <p className="text-slate-400 text-sm leading-6 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
        aperiam quasi ratione dolore numquam quisquam hic quam fugiat. Nisi
        magni quibusdam accusantium illum quae rem ut itaque! Atque, natus unde.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2  bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </div>
  );
}
