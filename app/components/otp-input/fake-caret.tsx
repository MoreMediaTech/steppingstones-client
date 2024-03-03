export function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
      <div className="h-8 w-px bg-white" />
    </div>
  );
}
