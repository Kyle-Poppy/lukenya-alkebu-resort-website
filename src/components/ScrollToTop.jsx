import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function getHashId(hash) {
  const rawId = hash.slice(1);

  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Keep browser back/forward scroll position
    if (navigationType === "POP") return;

    // Scroll to anchor if URL contains a hash
    if (hash) {
      const elementId = getHashId(hash);

      const timer = window.setTimeout(() => {
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return () => window.clearTimeout(timer);
    }

    // Default behavior for new page navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash, navigationType]);

  return null;
}