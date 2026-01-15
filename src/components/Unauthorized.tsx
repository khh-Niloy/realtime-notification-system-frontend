import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-20 relative overflow-hidden font-inter">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-foreground/[0.02] rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-foreground/[0.02] rounded-full blur-[100px]" />

      <div className="w-full max-w-lg text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-none">
              403
            </h1>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
              ACCESS REJECTED
            </p>
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Restricted Area
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can not visit this page
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-8">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 h-14 rounded-2xl border-border/50 hover:bg-muted/50 font-bold uppercase tracking-widest text-[10px] gap-2 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
