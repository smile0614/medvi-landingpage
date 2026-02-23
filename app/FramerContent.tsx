"use client";

import { useEffect, useRef } from "react";

export default function FramerContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Expose script tag elements so Framer can read __framer__appearAnimationsContent etc.
    container.querySelectorAll("script[id^=\"__framer__\"]").forEach((el) => {
      const id = el.getAttribute("id");
      if (id && !(window as unknown as Record<string, unknown>)[id]) {
        (window as unknown as Record<string, unknown>)[id] = el;
      }
    });

    // Run inline scripts in order (they define animator etc.)
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      try {
        const newScript = document.createElement("script");
        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = oldScript.async;
          newScript.defer = oldScript.defer;
          if (oldScript.type) newScript.type = oldScript.type;
          [...oldScript.attributes].forEach((attr) => {
            if (attr.name !== "src" && attr.name !== "type") {
              newScript.setAttribute(attr.name, attr.value);
            }
          });
        } else {
          newScript.textContent = oldScript.textContent;
          if (oldScript.type) newScript.type = oldScript.type;
          [...oldScript.attributes].forEach((attr) => {
            if (attr.name !== "type") {
              newScript.setAttribute(attr.name, attr.value);
            }
          });
        }
        document.body.appendChild(newScript);
        if (!oldScript.src) {
          newScript.remove();
        }
      } catch (err) {
        console.warn("FramerContent: script execution failed", err);
      }
    });

    // Load Framer events script only after inline scripts have run (so animator exists)
    const framerScript = document.createElement("script");
    framerScript.src = "https://events.framer.com/script?v=2";
    framerScript.setAttribute("data-fid", "6bf6b91f5651216c6ef0a6b8063c73cf49a4790abf7a3c4aa9bb8c93aade0226");
    framerScript.setAttribute("data-no-nt", "");
    framerScript.async = true;
    document.body.appendChild(framerScript);
  }, [html]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
