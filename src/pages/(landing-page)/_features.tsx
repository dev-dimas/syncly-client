import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  useGSAP(() => {
    gsap.set(".features-item", { y: 200, opacity: 0 });
    gsap.to(".features-item", {
      scrollTrigger: {
        trigger: "#features-list",
        start: "start center",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section
      id="features"
      className="px-6 flex items-center justify-center min-h-dvh bg-gray-100"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Individuals and Teams
        </h2>
        <div className="grid md:grid-cols-3 gap-8" id="features-list">
          {[
            {
              title: "Intuitive Task Management",
              description:
                "Create, organize, and prioritize tasks with our user-friendly interface.",
            },
            {
              title: "Team Collaboration",
              description:
                "Share projects, assign tasks, and communicate seamlessly with your team.",
            },
            {
              title: "Custom Workflows",
              description:
                "Design workflows that match your unique processes and boost productivity.",
            },
            {
              title: "Real-time Updates",
              description:
                "Stay informed with instant notifications and live task status changes.",
            },
            {
              title: "Detailed Analytics",
              description:
                "Gain insights into your productivity with comprehensive reports and charts.",
            },
            {
              title: "Cross-platform Sync",
              description:
                "Access your tasks from anywhere, on any device, always in sync.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center features-item"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
