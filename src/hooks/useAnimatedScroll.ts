import { useCallback } from "react";

export default function useAnimatedScroll() {
  const handleScroll = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return { handleScroll };
}
