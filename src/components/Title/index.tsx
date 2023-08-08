
export function Title({title,}:{title?:string}) {
  return (
    <div className="flex bg-secondary  min-w-full h-48 text-center text-7xl font-extrabold text-white align-middle items-center justify-center">
      {title}
    </div>
  );
}
