export function HandUnderline({
  children,
  color = "bg-sky-400",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className="relative inline-block px-1">
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute -bottom-1 left-1/2 h-1.5 w-[105%] -translate-x-1/2 -rotate-12 rounded-full opacity-85 ${color}`}
      />
    </span>
  );
}