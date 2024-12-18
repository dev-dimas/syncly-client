import useAccessToken from "@/hooks/useAccessToken";
import { Navigate } from "@/router";
import FAQ from "./_faq";
import Features from "./_features";
import Footer from "./_footer";
import Header from "./_header";
import Hero from "./_hero";
import Pricing from "./_pricing";
import Testimonials from "./_testimonials";
import { useGetUserQuery } from "@/api/user/userApi";

export default function LandingPage() {
  const { accessToken } = useAccessToken();
  const { data: user, isLoading } = useGetUserQuery(undefined, {
    skip: !accessToken,
  });

  if (isLoading) return null;

  if (user?.data) return <Navigate to="/app" replace />;

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
