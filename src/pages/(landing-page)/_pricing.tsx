import { Button } from "@/components/ui/button";
import { Link } from "@/router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  useGSAP(() => {
    gsap.set(".im-joking", { y: 50, opacity: 0 });
    gsap.to(".im-joking", {
      scrollTrigger: {
        trigger: ".im-joking",
        start: "center center",
      },
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
    });

    gsap.set(".pricing-item", { y: 50, opacity: 0 });
    gsap.to(".pricing-item", {
      scrollTrigger: {
        trigger: ".pricing-item",
        start: "bottom bottom",
      },
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
    });
  });

  return (
    <section
      id="pricing"
      className="px-6 flex items-center justify-center min-h-dvh bg-gray-100"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center">
          Choose the Perfect Plan for You
        </h2>
        <p className="mt-5 mb-12 text-sm italic text-black/80 im-joking">
          Umm... I'm Joking. It's Free Forever.
        </p>
        <div className="w-full">
          <div className="border rounded-lg p-6 flex flex-col bg-white pricing-item">
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-6">Free</p>
            <ul className="mb-6 flex-grow">
              {[
                "Unlimited projects",
                "Advanced task management",
                "Team collaboration",
                "Advanced security",
              ].map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" asChild>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
