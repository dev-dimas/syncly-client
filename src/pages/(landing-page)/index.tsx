import FAQ from "./_faq";
import Features from "./_features";
import Footer from "./_footer";
import Header from "./_header";
import Hero from "./_hero";
import Pricing from "./_pricing";
import Testimonials from "./_testimonials";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />

      <main className="flex-grow">
        <Hero />

        <Features />

        <Testimonials />

        <Pricing />

        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
