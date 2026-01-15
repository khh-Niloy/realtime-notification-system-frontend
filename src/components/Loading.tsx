export const Loading = () => {
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-background z-[9999]">
      <div className="w-12 h-12 border-4 border-foreground/10 border-t-foreground rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
        Verifying Clearance...
      </p>
    </div>
  );
};
