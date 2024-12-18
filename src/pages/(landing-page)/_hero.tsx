import { Button } from "@/components/ui/button";
import { useModals } from "@/router";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const modals = useModals();

  return (
    <section className="px-6 flex items-center justify-center min-h-dvh bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Streamline Your Tasks, Amplify Your Productivity
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Syncly helps individuals and teams organize, track, and conquer their
          to-do lists with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" onClick={() => modals.open("/sign-up")}>
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          No credit card required
        </p>
      </div>
    </section>
  );
}
