"use client";

import { useEffect, useRef } from "react";

const LOCAL_HERO_VIDEO = "/assets/hero-video.mp4?v=2";
const LOCAL_HERO_POSTER = "/assets/hero-image.jpg?width=1600&height=900&v=2";
const LOCAL_LOGO_DARK = "/assets/logo.svg?width=490&height=104";
const LOCAL_LOGO_WHITE = "/assets/logo-white.svg?width=490&height=104";

function applyLocalHeroVideo(container: HTMLElement) {
  const video = container.querySelector(
    ".framer-1g69jmc-container video"
  ) as HTMLVideoElement | null;
  if (!video) return;
  const currentSrc = video.src || video.getAttribute("src") || "";
  if (!currentSrc.includes("/assets/hero-video")) {
    video.src = LOCAL_HERO_VIDEO;
    video.setAttribute("poster", LOCAL_HERO_POSTER);
  }
}

const SUPPLY_COUNTER_TARGET = 2;
const SUPPLY_COUNTER_DURATION_MS = 1200;
const SUPPLY_COUNTER_START_DELAY_MS = 2500;

function animateMonthsCounter(
  container: HTMLElement,
  selector: string,
  target: number,
  durationMs: number
) {
  const counters = container.querySelectorAll(selector);
  counters.forEach((wrap) => {
    const paragraphs = wrap.querySelectorAll("p");
    if (paragraphs.length < 2) return;

    const setText = (value: number) => {
      const text = `${Math.round(value)} months`;
      paragraphs.forEach((p) => {
        if (p.textContent !== text) p.textContent = text;
      });
    };

    setText(0);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const value = eased * target;
      setText(value);
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

function animateSupplyCounter(container: HTMLElement) {
  animateMonthsCounter(
    container,
    ".framer-1wuo2qe-container",
    SUPPLY_COUNTER_TARGET,
    SUPPLY_COUNTER_DURATION_MS
  );
}

function animateRegrowthCounter(container: HTMLElement) {
  animateMonthsCounter(
    container,
    ".framer-1r3od7c-container",
    SUPPLY_COUNTER_TARGET,
    SUPPLY_COUNTER_DURATION_MS
  );
}

function applyCounterLabels(container: HTMLElement) {
  container.querySelectorAll(".framer-gw9wl0 h5.framer-text").forEach((el) => {
    if (el.textContent?.trim() !== "SUPPLY") el.textContent = "SUPPLY";
  });
  container.querySelectorAll(".framer-14yb7ih h5.framer-text").forEach((el) => {
    if (el.textContent?.trim() !== "REGROWTH WITHIN") el.textContent = "REGROWTH WITHIN";
  });
}

function applyPeakAdvantageText(container: HTMLElement) {
  container.querySelectorAll(".framer-160pq1v h5.framer-text").forEach((el) => {
    if (el.textContent?.trim() !== "THE PEAK ADVANTAGE") el.textContent = "THE PEAK ADVANTAGE";
  });
  container.querySelectorAll(".framer-1e5eoty h1 span.framer-text").forEach((el) => {
    if (el.textContent?.trim() === "your body") el.textContent = "your Hair";
  });
}

function applyHeroSublineText(container: HTMLElement) {
  container.querySelectorAll(".framer-1978kmr p.framer-text").forEach((p) => {
    const html = p.innerHTML;
    const next = html.replace(/your desire/g, "your follicles").replace(/your body\./g, "regrows hair.");
    if (next !== html) p.innerHTML = next;
  });
}

function applyBreakthroughHeadline(container: HTMLElement) {
  container.querySelectorAll(".framer-14a2qto h1.framer-text").forEach((h1) => {
    let html = h1.innerHTML;
    html = html.replace(/Ready Faster,?\s*/g, "Stops Loss, ");
    html = html.replace(/Lasts\s+All Weekend\./g, "Regrows Hair Rapidly.");
    if (h1.innerHTML !== html) h1.innerHTML = html;
  });
}

function applyBreakthroughSubline(container: HTMLElement) {
  const want = "No need for pills. Our rapid absorbing liquid goes straight to the scalp where it's needed.";
  container.querySelectorAll(".framer-1d7jlqe p.framer-text").forEach((p) => {
    if (p.textContent?.trim() !== want) p.textContent = want;
  });
}

// Content you reverted in main.html — we never replace QUAD→PEAK inside elements containing these
const PEAK_STACK_SKIP_QUAD = [
  "rapid-absorb liquid",
  "dissolves under your tongue",
  "See how",
  "Old Way vs.",
];

function applyPeakStackText(container: HTMLElement) {
  const replacements: [RegExp | string, string][] = [
    [/Quad Stack/g, "Peak Stack"],
    [/APOMORPHINE/g, "MINOXIDIL"],
    [/Ignites Desire/g, "Proven Regrowth"],
    [/VARDENAFIL/g, "TRETINOIN"],
    [/Rapid Onset/g, "Powerful Retnoid"],
    [/TADALAFIL/g, "DUTESTERIDE"],
    [/Lasts 36 Hours/g, "Blocks DHT"],
    [/SILDENAFIL/g, "KETOCONOZALE"],
    [/Peak Strength/g, "Antiinflammatoy"],
  ];
  container.querySelectorAll("p.framer-text, h3.framer-text, h5.framer-text, strong.framer-text").forEach((el) => {
    let html = el.innerHTML;
    const isRevertedSection = PEAK_STACK_SKIP_QUAD.some((phrase) => html.includes(phrase));
    let changed = false;
    for (const [from, to] of replacements) {
      const next = typeof from === "string" ? html.split(from).join(to) : html.replace(from, to);
      if (next !== html) {
        html = next;
        changed = true;
      }
    }
    // Only replace QUAD→PEAK where you did not revert (keep QUAD in those paragraphs)
    if (!isRevertedSection && /QUAD/.test(html)) {
      html = html.replace(/QUAD/g, "PEAK");
      changed = true;
    }
    if (changed) el.innerHTML = html;
  });
}

function applyHeroHeadlineWords(container: HTMLElement) {
  container.querySelectorAll("span[style*='blur(10px)']").forEach((el) => {
    const t = el.textContent?.trim();
    if (t === "Speed.") el.textContent = "Regrow.";
    else if (t === "Strength.") el.textContent = "Your.";
    else if (t === "Stamina.") el.textContent = "Hair.";
  });
  // One word per row: insert <br> after "Regrow." and after "Your." in each headline h1
  container.querySelectorAll("h1.framer-text").forEach((h1) => {
    const spans = Array.from(h1.querySelectorAll("span[style*='blur(10px)']"));
    const regrowSpan = spans.find((s) => s.textContent?.trim() === "Regrow.");
    const yourSpan = spans.find((s) => s.textContent?.trim() === "Your.");
    if (regrowSpan && regrowSpan.nextElementSibling?.tagName !== "BR") regrowSpan.after(document.createElement("br"));
    if (yourSpan && yourSpan.nextElementSibling?.tagName !== "BR") yourSpan.after(document.createElement("br"));
    // Remove leading spaces on lines 2 and 3: strip whitespace-only text nodes that follow a <br>
    const nodes = Array.from(h1.childNodes);
    nodes.forEach((node) => {
      if (node.nodeName !== "BR") return;
      const next = node.nextSibling;
      if (next?.nodeType === Node.TEXT_NODE && /^\s*$/.test(next.textContent || "")) next.remove();
    });
  });
}

function hideRemovedContent(container: HTMLElement) {
  container.querySelectorAll(".framer-htuq7y").forEach((el) => {
    if (el instanceof HTMLElement) el.style.display = "none";
  });
}

function applyLocalLogo(container: HTMLElement) {
  const setLogo = (img: HTMLImageElement, url: string) => {
    if ((img.src || "").includes(url.split("?")[0])) return;
    img.src = url;
  };

  container.querySelectorAll("[data-framer-name]").forEach((el) => {
    const name = (el.getAttribute("data-framer-name") || "").trim();
    if (!name.toLowerCase().includes("logo")) return;
    const img = el.querySelector("img");
    if (!img || !(img instanceof HTMLImageElement)) return;
    if (name === "White Logo") setLogo(img, LOCAL_LOGO_WHITE);
    else if (name === "Dark Logo" || name === "Color logo" || name === "Color Logo") setLogo(img, LOCAL_LOGO_DARK);
  });
}

const LOGO_LINK_HREF = "./";

function applyLogoLinkHref(container: HTMLElement) {
  container.querySelectorAll('a[data-framer-name="White Logo"], .framer-p743z2-container a').forEach((a) => {
    if (!(a instanceof HTMLAnchorElement)) return;
    if (a.getAttribute("href") !== LOGO_LINK_HREF) a.href = LOGO_LINK_HREF;
  });
}

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

  // Framer's hydration (script_main + Video component) overwrites the hero video
  // with their CDN URL. Re-apply local video after mount and when Framer overwrites it.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const apply = () => applyLocalHeroVideo(container);

    // Apply immediately and again after Framer's async bundle likely hydrates
    apply();
    const t1 = setTimeout(apply, 300);
    const t2 = setTimeout(apply, 800);
    const t3 = setTimeout(apply, 2000);
    const t4 = setTimeout(apply, 4000);

    const observer = new MutationObserver(() => apply());
    observer.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["src", "poster"],
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      observer.disconnect();
    };
  }, [html]);

  // "2 months SUPPLY" counter: animate from 0 to 2 (overrides Framer's 0→15 after hydration)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const runCounters = () => {
      applyCounterLabels(container);
      applyPeakAdvantageText(container);
      applyHeroHeadlineWords(container);
      applyHeroSublineText(container);
      applyBreakthroughHeadline(container);
      applyBreakthroughSubline(container);
      applyPeakStackText(container);
      hideRemovedContent(container);
      applyLocalLogo(container);
      applyLogoLinkHref(container);
      animateSupplyCounter(container);
      animateRegrowthCounter(container);
    };
    applyCounterLabels(container);
    applyPeakAdvantageText(container);
    applyHeroHeadlineWords(container);
    applyHeroSublineText(container);
    applyBreakthroughHeadline(container);
    applyBreakthroughSubline(container);
    applyPeakStackText(container);
    hideRemovedContent(container);
    applyLocalLogo(container);
    applyLogoLinkHref(container);
    const tLogo1 = setTimeout(() => { applyLocalLogo(container); applyLogoLinkHref(container); }, 300);
    const tLogo2 = setTimeout(() => { applyLocalLogo(container); applyLogoLinkHref(container); }, 800);
    const tLogo3 = setTimeout(() => { applyLocalLogo(container); applyLogoLinkHref(container); }, 2000);
    const t = setTimeout(runCounters, SUPPLY_COUNTER_START_DELAY_MS);
    const tLabels = setTimeout(() => {
      applyCounterLabels(container);
      applyPeakAdvantageText(container);
      applyHeroHeadlineWords(container);
      applyHeroSublineText(container);
      applyBreakthroughHeadline(container);
      applyBreakthroughSubline(container);
      applyPeakStackText(container);
      hideRemovedContent(container);
      applyLocalLogo(container);
      applyLogoLinkHref(container);
    }, 4000);

    const forceMonthsFinal = () => {
      applyCounterLabels(container);
      applyPeakAdvantageText(container);
      applyHeroHeadlineWords(container);
      applyHeroSublineText(container);
      applyBreakthroughHeadline(container);
      applyBreakthroughSubline(container);
      applyPeakStackText(container);
      hideRemovedContent(container);
      applyLocalLogo(container);
      applyLogoLinkHref(container);
      const selectors = [".framer-1wuo2qe-container p", ".framer-1r3od7c-container p"];
      selectors.forEach((sel) => {
        container.querySelectorAll(sel).forEach((p) => {
          const text = p.textContent || "";
          if (
            text.includes("15") ||
            text.includes("36") ||
            (text.includes("months") && !/^[012] months$/.test(text.trim()))
          ) {
            p.textContent = "2 months";
          }
        });
      });
    };
    const observer = new MutationObserver(forceMonthsFinal);
    observer.observe(container, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["src", "href"],
    });
    const t2 = setTimeout(forceMonthsFinal, SUPPLY_COUNTER_START_DELAY_MS + SUPPLY_COUNTER_DURATION_MS + 500);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(tLabels);
      clearTimeout(tLogo1);
      clearTimeout(tLogo2);
      clearTimeout(tLogo3);
      observer.disconnect();
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
