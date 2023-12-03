export function CascadeLoading() {
  return (
    <div className="relative flex gap-1 overflow-hidden p-2.5">
      <div className="animate-cascade bg-darken h-1.5 w-1.5 rounded-full delay-0"></div>
      <div className="animate-cascade bg-darken h-1.5 w-1.5 rounded-full delay-100"></div>
      <div className="animate-cascade bg-darken h-1.5 w-1.5 rounded-full delay-200"></div>
      <div className="animate-cascade bg-darken h-1.5 w-1.5 rounded-full delay-300"></div>
    </div>
  );
}
