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
  // APPLICATION TIME: no number, show "seconds" only
  container.querySelectorAll(".framer-1wuo2qe-container p").forEach((p) => {
    if (p.textContent?.trim() !== "seconds") p.textContent = "seconds";
  });
}

function animateRegrowthCounter(container: HTMLElement) {
  // REGROWTH WINDOW: static "90 Days+" (no number animation)
  container.querySelectorAll(".framer-1r3od7c-container p").forEach((p) => {
    if (p.textContent?.trim() !== "90 Days+") p.textContent = "90 Days+";
  });
}

function applyCounterLabels(container: HTMLElement) {
  container.querySelectorAll(".framer-gw9wl0 h5.framer-text").forEach((el) => {
    if (el.textContent?.trim() !== "APPLICATION TIME") el.textContent = "APPLICATION TIME";
  });
  container.querySelectorAll(".framer-14yb7ih h5.framer-text").forEach((el) => {
    if (el.textContent?.trim() !== "REGROWTH WINDOW") el.textContent = "REGROWTH WINDOW";
  });
}

function applyPeakAdvantageText(container: HTMLElement) {
  container.querySelectorAll(".framer-160pq1v h5.framer-text").forEach((el) => {
    if (el.textContent?.trim() !== "THE PEAK ADVANTAGE") el.textContent = "THE PEAK ADVANTAGE";
  });
  container.querySelectorAll(".framer-1e5eoty h1 span.framer-text").forEach((el) => {
    if (el.textContent?.trim() === "your body" || el.textContent?.trim() === "your Hair") el.textContent = "your scalp";
  });
}

function applyHeroSublineText(container: HTMLElement) {
  const want =
    "The world's most advanced 4-in-1 topical serum that halts hair loss and sparks regrowth. Fast-drying, clinician-prescribed, and delivered discreetly.";
  container.querySelectorAll(".framer-1978kmr p.framer-text").forEach((p) => {
    if (p.textContent?.trim() !== want) {
      p.innerHTML = `The world's most advanced <strong class="framer-text">4-in-1 topical serum</strong> that halts hair loss and sparks regrowth. Fast-drying, clinician-prescribed, and delivered discreetly.`;
    }
  });
}

function applyBreakthroughHeadline(container: HTMLElement) {
  container.querySelectorAll(".framer-14a2qto h1.framer-text").forEach((h1) => {
    let html = h1.innerHTML;
    html = html.replace(/Ready Faster,?\s*/g, "Stops Loss Faster, ");
    html = html.replace(/Lasts\s+All Weekend\./g, "Regrows All Month.");
    if (h1.innerHTML !== html) h1.innerHTML = html;
  });
}

function applyBreakthroughSubline(container: HTMLElement) {
  const want = "Oral pills are risky. Our fast-drying serum applies directly to your scalp via dropper and targets follicles in seconds.";
  container.querySelectorAll(".framer-1d7jlqe p.framer-text").forEach((p) => {
    if (p.textContent?.trim() !== want) p.textContent = want;
  });
}

function applyCompleteStackText(container: HTMLElement) {
  // Only update blocks that are the "Complete Stack" card (same classes used for "The Spark", "The Strength", etc.)
  const targetSubline = "1 Serum, 4 Powerful Ingredients";
  const oldSubline = "1 Solution 4 powerful ingredients";
  container.querySelectorAll(".framer-1788kjt").forEach((block) => {
    const h3 = block.querySelector("h3.framer-text");
    const p = block.querySelector(".framer-1d2ixsl p.framer-text");
    const pText = p?.textContent?.trim().replace(/\s+/g, " ") ?? "";
    const isCompleteStackBlock =
      pText === targetSubline || pText === oldSubline || (h3?.textContent?.trim() === "Complete Stack" && p);
    if (!isCompleteStackBlock || !h3 || !p) return;
    if (h3.textContent?.trim() !== "Complete Stack") h3.textContent = "Complete Stack";
    if (p.textContent?.trim().replace(/\s+/g, " ") !== targetSubline) p.textContent = targetSubline;
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
    [/4-IN-1 PERFORMANCE/g, "4-IN-1 REGROWTH"],
    ["See how QUAD's 4-in-1 formula stacks up", "See how PEAK's 4-in-1 formula stacks up"],
    ["4 Meds.", "4 Actives."],
    [/In 1\s*Dose\./g, "In 1 Serum."],
    [/We encourage all prospective users of compounded medications to\s*speak with their provider about the specific risks and benefits that may come with the\s*use of compounded medication\.\s*MEDVi does not produce compounded medications,\s*and\s*individuals may receive medication that looks different than what is portrayed on the\s*website\./g, "We encourage all prospective users of compounded topicals to speak with their provider about risks and benefits. WELL does not produce compounded medications, and products may vary in appearance."],
    [/© 2026 MEDVi\.\s*All rights\s*reserved/g, "© 2026 WELL. All rights reserved"],
    ["MEDVi money back guarantee", "WELL Money Back Guarantee"],
    ["hello@medvi.org", "support@well.inc"],
    ["(585) 312-4226", "(416) 262-6838"],
    ["Terms & Conditions", "Terms of Service"],
    ["Privacy Practices", "Consumer Health Data Privacy"],
    [/131 Continental Dr\.\s*Ste 305,?\s*Newark,?\s*DE 19713/g, "30 N Gould St, Ste R, Sheridan, WY 82801"],
    ["MEDVi PEAK® Prescription", "WELL PEAK® Prescription"],
    ["MEDVi QUAD® 4-in-1", "WELL PEAK® 4-in-1"],
    ["Starts in 10 Minutes", "Dries in Seconds"],
    ["Experience peak strength", "Experience peak density"],
    ["Last all weekend long", "Regrows all month long"],
    ["Boosts your desire", "Halts loss at the root"],
    ["Levitra®", "Minoxidil®"],
    ["(Starts Fast)", "(Sparks Growth)"],
    ["Viagra®", "Dutasteride®"],
    ["(Max Hardness)", "(Blocks DHT)"],
    ["Cialis®", "Ketoconazole®"],
    ["(Lasts 36 Hrs)", "(Fights Inflammation)"],
    ["The QUAD Way", "The PEAK Way"],
    [/Combines the active ingredients in[\s\S]*?to drive desire\./g, "Combines the power of minoxidil, dutasteride, ketoconazole, and tretinoin — the ultimate stack to drive regrowth."],
    ["Melts in Minutes", "Dries in Seconds"],
    [/QUAD® is a rapid-absorb liquid that\s+dissolves under your tongue\.\s*This bypasses the stomach and\s+liver,\s*allowing the medicine to hit your bloodstream much\s+faster than swallowed pills\./g, "PEAK® is a fast-drying topical serum applied directly to your scalp with a precision dropper. This targets the follicles instantly, bypassing messy foams or slow-absorbing creams."],
    ["No more waiting 60+ minutes.", "No more twice-daily routines."],
    [/Works in as little as 15\s*minutes\./g, "Apply once at night."],
    ["Total, discreet control.", "Total, effortless dominance."],
    ["Dinner and Performance.", "Lifestyle and Regrowth."],
    [/Standard pills can be rendered useless\s+by a heavy meal\.\s*Our sublingual absorption means you don't\s+have to choose between a great dinner and a great night\./g, "Oral DHT blockers can tank your libido and energy. Our topical delivery means you don't sacrifice manhood for hair."],
    ["Won't be blocked by food.", "No systemic sides."],
    [/No more "empty stomach" rules\./g, "No more \"pill anxiety.\"."],
    ["Restores true spontaneity.", "Restores true confidence."],
    ["Ready When You Are.", "Regrow When You Sleep."],
    [/With Tadalafil onboard,\s*one dose doesn't\s*just work for "right now"[—\-]\s*it keeps you responsive for up to\s*36 hours\./g, "With our once-nightly formula, one application works overnight to halt loss and fuel growth."],
    [/No more "pill timing" anxiety\./g, "No more daily hassle."],
    ["Lasts all weekend.", "Lasts through the month."],
    [/Be ready for a second round \(or\s*third\)\./g, "Be ready for thicker hair in weeks."],
    [/Quad Stack/g, "Peak Stack"],
    [/APOMORPHINE/g, "MINOXIDIL"],
    ["Apomorphine", "Minoxidil"],
    [/Primes the brain's\s+dopamine receptors to amplify sexual\s+signaling\./g, "Proven vasodilator that widens blood vessels to nourish follicles."],
    [/Bridges the gap between\s+mental arousal and physical response\./g, "Promotes new growth and thickens existing hair."],
    [/Sex doesn't happen on a schedule\.\s*Your treatment shouldn't\s*either\./g, "Hair loss doesn't wait. Your regrowth shouldn't either."],
    [/Ignites Desire/g, "Sparks Regrowth"],
    ["Triggers Desire", "Ignites Follicle Revival"],
    [/Don't just get ready\.\s*Get in the\s+mood/g, "Don't just slow loss. Spark real regrowth."],
    ["Vardenafil + Sildenafil", "Dutasteride + Ketoconazole"],
    [/A potent dual-strike of\s+PDE5 inhibitors\./g, "A potent dual-attack on DHT and inflammation."],
    [/A powerful combination\s+of blood-flow boosters\.\s*Vardenafil hits fast\s*\(10-15min\) for spontaneity,\s*while Sildenafil\s*ensures maximum strength and rigidity when\s*you need it most\./g, "Dutasteride blocks DHT production at the scalp level, while Ketoconazole reduces fungal and inflammatory issues for a healthier follicle environment."],
    [/Harder\s*&(?:amp;)?\s*Faster/g, "Thicker &amp; Faster"],
    [/Ready in 15 mins\.\s*Peak rigidity\s*guaranteed/g, "Visible in weeks. Peak density guaranteed."],
    ["36 Hour Window", "Once-Nightly Application"],
    [/One dose\.\s*All weekend coverage\.?\s*/g, "One dropper. All-month coverage."],
    ["Tadalafil", "Tretinoin"],
    [/The longest-lasting\s+blood-flow agent available\./g, "The ultimate penetration enhancer."],
    [/Stays active in your\s+system for up to 36 hours,\s*so you don't have\s*to "time" your intimacy\./g, "Boosts absorption of all actives deep into the scalp, accelerating results without systemic exposure."],
    [/VARDENAFIL/g, "TRETINOIN"],
    [/Rapid Onset/g, "Enhances Absorption"],
    [/TADALAFIL/g, "DUTESTERIDE"],
    [/Lasts 36 Hours/g, "Blocks DHT Locally"],
    [/SILDENAFIL/g, "KETOCONOZALE"],
    [/Peak Strength/g, "Fights Inflammation"],
    ["MEDVi", "WELL"],
    // FAQ
    ["Is mixing ingredients safe?", "Is combining actives safe?"],
    [/Yes\.\s*This is a "Compound\s*Medication\."\s*It is professionally[\s\S]*?tailored to\s*your history\./g, "Yes. This is a compounded topical serum, professionally formulated by US pharmacists and prescribed by licensed doctors to ensure safe, effective dosages tailored to you."],
    ["Why choose MEDVi over Hims or Roman?", "Why choose us over Hims or Keeps?"],
    [/Competitors sell single ingredients\.[\s\S]*?4 treatments for the price of 1\./g, "Competitors sell basics like minoxidil or finasteride alone. We stack minoxidil, dutasteride, ketoconazole, and tretinoin into one serum. It's 4 powerhouse actives for the price of 1."],
    [/Will I be erect for 36 hours\s*straight\?/g, "Will it stop all hair loss immediately?"],
    [/No\.\s*You are in full control\.[\s\S]*?whenever\s*you are\./g, "No. Results build over time. The serum halts progression and promotes regrowth with consistent use. The \"once-nightly\" routine means your scalp is primed for recovery every day."],
    ["How do I use QUAD?", "How do I use PEAK?"],
    [/Drop it under your tongue\.[\s\S]*?in 10–15 minutes\./g, "Apply via dropper to your scalp at night. It dries fast, absorbing directly into follicles without mess."],
    [/Because it replaces 4 separate\s*prescriptions\.[\s\S]*?save\s*you money\./g, "Because it replaces multiple treatments. Buying minoxidil, dutasteride, ketoconazole, and tretinoin separately would cost over $300/month. We bundle them to save you money."],
  ];
  container.querySelectorAll("p.framer-text, h3.framer-text, h4.framer-text, h5.framer-text, strong.framer-text").forEach((el) => {
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
    else if (t === "Strength.") el.textContent = "Restore.";
    else if (t === "Stamina.") el.textContent = "Reclaim.";
  });
  // One word per row: insert <br> after "Regrow." and after "Restore." in each headline h1
  container.querySelectorAll("h1.framer-text").forEach((h1) => {
    const spans = Array.from(h1.querySelectorAll("span[style*='blur(10px)']"));
    const regrowSpan = spans.find((s) => s.textContent?.trim() === "Regrow.");
    const restoreSpan = spans.find((s) => s.textContent?.trim() === "Restore.");
    if (regrowSpan && regrowSpan.nextElementSibling?.tagName !== "BR") regrowSpan.after(document.createElement("br"));
    if (restoreSpan && restoreSpan.nextElementSibling?.tagName !== "BR") restoreSpan.after(document.createElement("br"));
    // Remove leading spaces on lines 2 and 3: strip whitespace-only text nodes that follow a <br>
    const nodes = Array.from(h1.childNodes);
    nodes.forEach((node) => {
      if (node.nodeName !== "BR") return;
      const next = node.nextSibling;
      if (next?.nodeType === Node.TEXT_NODE && /^\s*$/.test(next.textContent || "")) next.remove();
    });
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

const FOOTER_EMAIL_HREF = "mailto:support@well.inc";
const FOOTER_PHONE_HREF = "tel:+14162626838";

function applyFooterContactHrefs(container: HTMLElement) {
  const contactBar = container.querySelector(".framer-mibzs3");
  if (!contactBar) return;
  contactBar.querySelectorAll('a[data-framer-name="contact-pill-wrapper"]').forEach((a) => {
    if (!(a instanceof HTMLAnchorElement)) return;
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) {
      if (a.getAttribute("href") !== FOOTER_EMAIL_HREF) a.href = FOOTER_EMAIL_HREF;
    } else if (href.startsWith("tel:")) {
      if (a.getAttribute("href") !== FOOTER_PHONE_HREF) a.href = FOOTER_PHONE_HREF;
    }
  });
}

const FOOTER_LEGAL_LINKS: [string[], string, string][] = [
  [["Terms of Service", "Terms & Conditions"], "https://well.inc/en/legal/terms-of-service/", "Terms of Service"],
  [["Privacy Policy"], "https://well.inc/en/legal/privacy-policy/", "Privacy Policy"],
  [["Consumer Health Data Privacy", "Privacy Practices"], "https://well.inc/en/legal/consumer-health-data-privacy/", "Consumer Health Data Privacy"],
];

function applyFooterLegalLinks(container: HTMLElement) {
  container.querySelectorAll('[data-framer-name="footer-nav"] a.framer-text[href]').forEach((a) => {
    if (!(a instanceof HTMLAnchorElement)) return;
    const text = (a.textContent ?? "").trim();
    for (const [labels, url, label] of FOOTER_LEGAL_LINKS) {
      if (labels.includes(text)) {
        if (a.getAttribute("href") !== url) a.href = url;
        if (a.textContent?.trim() !== label) a.textContent = label;
        break;
      }
    }
  });
}

const LEGITSCRIPT_NO_LINK = "data-legitscript-nolink";

const FOOTER_LINKS_TO_REMOVE = ["Refund Policy", "Medical Consent", "For California Residents", "Bill of Rights"];

/** Remove footer nav items we no longer show (Refund Policy, Medical Consent, etc.). */
function removeFooterPolicyLinks(container: HTMLElement) {
  container.querySelectorAll('[data-framer-name="footer-nav"]').forEach((nav) => {
    nav.querySelectorAll("a.framer-text").forEach((a) => {
      const text = (a.textContent ?? "").trim();
      if (!FOOTER_LINKS_TO_REMOVE.includes(text)) return;
      const row = a.closest(".framer-5iwvk2, .framer-1ogp0rr, .framer-d9y11q, .framer-im539k") ?? a.closest("[class^='framer-']");
      if (row && row.parentNode) row.remove();
    });
  });
}

/** Remove only the divider in/after the last section (Privacy Practices); keep dividers after Terms and Privacy Policy. */
function removeFooterNavLastDivider(container: HTMLElement) {
  container.querySelectorAll('[data-framer-name="footer-nav"]').forEach((nav) => {
    const lastSection = nav.querySelector(".framer-sqxdnp");
    if (!lastSection) return;
    lastSection.querySelectorAll('[data-framer-name="divider"]').forEach((d) => {
      if (d.parentNode) d.remove();
    });
    let next = lastSection.nextElementSibling;
    if (next?.getAttribute("data-framer-name") === "divider" && next.parentNode) {
      next.remove();
    }
  });
}

/** Remove LegitScript seal links so badges are display-only (no redirect). */
function applyLegitScriptNoLink(container: HTMLElement) {
  container.querySelectorAll(`a[href*="legitscript.com"]:not([${LEGITSCRIPT_NO_LINK}])`).forEach((a) => {
    if (!(a instanceof HTMLAnchorElement)) return;
    a.setAttribute(LEGITSCRIPT_NO_LINK, "1");
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
    a.style.cursor = "default";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, { capture: true });
  });
  // Seal badge containers (may be <div> or wrapped in <a> by LegitScript script): block click
  container.querySelectorAll(`.framer-ggpene:not([${LEGITSCRIPT_NO_LINK}])`).forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    el.setAttribute(LEGITSCRIPT_NO_LINK, "1");
    const anchor = el.closest("a") ?? (el.tagName === "A" ? el : null);
    if (anchor && anchor instanceof HTMLAnchorElement && !anchor.hasAttribute(LEGITSCRIPT_NO_LINK)) {
      anchor.setAttribute(LEGITSCRIPT_NO_LINK, "1");
      anchor.removeAttribute("href");
      anchor.setAttribute("aria-disabled", "true");
      anchor.style.cursor = "default";
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, { capture: true });
    }
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, { capture: true });
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

    // Run inline scripts in order (they define animator etc.) — skip LegitScript so it doesn't re-add seal links
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      try {
        const src = (oldScript.getAttribute("src") ?? "").trim();
        if (src && src.includes("legitscript.com")) return;
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
      applyCompleteStackText(container);
      applyLocalLogo(container);
      applyLogoLinkHref(container);
      applyFooterContactHrefs(container);
      applyFooterLegalLinks(container);
      applyLegitScriptNoLink(container);
      removeFooterPolicyLinks(container);
      removeFooterNavLastDivider(container);
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
    applyCompleteStackText(container);
    applyLocalLogo(container);
    applyLogoLinkHref(container);
    applyFooterContactHrefs(container);
    applyFooterLegalLinks(container);
    applyLegitScriptNoLink(container);
    removeFooterPolicyLinks(container);
    removeFooterNavLastDivider(container);
    const tLogo1 = setTimeout(() => { applyLocalLogo(container); applyLogoLinkHref(container); applyFooterContactHrefs(container); applyFooterLegalLinks(container); applyLegitScriptNoLink(container); removeFooterPolicyLinks(container); removeFooterNavLastDivider(container); }, 300);
    const tLogo2 = setTimeout(() => { applyLocalLogo(container); applyLogoLinkHref(container); applyFooterContactHrefs(container); applyFooterLegalLinks(container); applyLegitScriptNoLink(container); removeFooterPolicyLinks(container); removeFooterNavLastDivider(container); }, 800);
    const tLogo3 = setTimeout(() => { applyLocalLogo(container); applyLogoLinkHref(container); applyFooterContactHrefs(container); applyFooterLegalLinks(container); applyLegitScriptNoLink(container); removeFooterPolicyLinks(container); removeFooterNavLastDivider(container); }, 2000);
    const t = setTimeout(runCounters, SUPPLY_COUNTER_START_DELAY_MS);
    const tLabels = setTimeout(() => {
      applyCounterLabels(container);
      applyPeakAdvantageText(container);
      applyHeroHeadlineWords(container);
      applyHeroSublineText(container);
      applyBreakthroughHeadline(container);
      applyBreakthroughSubline(container);
      applyPeakStackText(container);
      applyCompleteStackText(container);
      applyLocalLogo(container);
      applyLogoLinkHref(container);
      applyFooterContactHrefs(container);
      applyFooterLegalLinks(container);
      applyLegitScriptNoLink(container);
      removeFooterPolicyLinks(container);
      removeFooterNavLastDivider(container);
    }, 4000);

    const forceMonthsFinal = () => {
      applyCounterLabels(container);
      applyPeakAdvantageText(container);
      applyHeroHeadlineWords(container);
      applyHeroSublineText(container);
      applyBreakthroughHeadline(container);
      applyBreakthroughSubline(container);
      applyPeakStackText(container);
      applyCompleteStackText(container);
      applyLocalLogo(container);
      applyLogoLinkHref(container);
      applyFooterContactHrefs(container);
      applyFooterLegalLinks(container);
      applyLegitScriptNoLink(container);
      removeFooterPolicyLinks(container);
      removeFooterNavLastDivider(container);
      // APPLICATION TIME: no number, "seconds" only
      container.querySelectorAll(".framer-1wuo2qe-container p").forEach((p) => {
        if (p.textContent?.trim() !== "seconds") p.textContent = "seconds";
      });
      // REGROWTH WINDOW: keep "90 Days+"
      container.querySelectorAll(".framer-1r3od7c-container p").forEach((p) => {
        if (p.textContent?.trim() !== "90 Days+") p.textContent = "90 Days+";
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
