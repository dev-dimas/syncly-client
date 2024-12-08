import logo from "@/assets/nft-3.jpg?lqip";
import { Button } from "@/components/ui/button";
import LqipImage from "@/components/ui/lqip-image";
import useAnimatedScroll from "@/hooks/useAnimatedScroll";
import { Link } from "@/router";
import { Menu } from "lucide-react";
import { Link as LinkScroll } from "react-router-dom";

export default function Header() {
  const { handleScroll } = useAnimatedScroll();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white absolute top-0">
      {/* Logo and title */}
      <div className="flex items-center space-x-4">
        <LqipImage image={logo} className="w-14 aspect-square rounded-lg" />
        <span className="text-xl font-bold">Syncly</span>
      </div>

      {/* Middle links */}
      <nav className="hidden md:flex space-x-6">
        <LinkScroll
          to="/#features"
          className="text-sm font-medium hover:text-primary"
          onClick={() => handleScroll("features")}
        >
          Features
        </LinkScroll>
        <LinkScroll
          to="/#pricing"
          className="text-sm font-medium hover:text-primary"
          onClick={() => handleScroll("pricing")}
        >
          Pricing
        </LinkScroll>
        <LinkScroll
          to="/#faq"
          className="text-sm font-medium hover:text-primary"
          onClick={() => handleScroll("faq")}
        >
          FAQ
        </LinkScroll>
      </nav>

      {/* Login and sign up buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button>
          <Link to="/sign-up">Sign up</Link>
        </Button>
      </div>

      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
      </Button>
    </header>
  );
}
