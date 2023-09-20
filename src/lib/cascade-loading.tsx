export function CascadeLoading() {
  return (
    <div className="relative flex gap-1 overflow-hidden p-2.5">
      <div className="h-1.5 w-1.5 animate-cascade rounded-full bg-darken delay-0"></div>
      <div className="h-1.5 w-1.5 animate-cascade rounded-full bg-darken delay-100"></div>
      <div className="h-1.5 w-1.5 animate-cascade rounded-full bg-darken delay-200"></div>
      <div className="h-1.5 w-1.5 animate-cascade rounded-full bg-darken delay-300"></div>
    </div>
  );
}
