/* =====================================================
   MEDVi QUAD Landing Page â€” scripts.js
   Custom and tracking scripts extracted from index.html
   Loaded with <script src="scripts.js" defer>
   ===================================================== */


/* -------------------------------------------------------
   PLAUSIBLE ANALYTICS INIT  (Snippet: XpbnqXWM1)
   Sets up the plausible() queue and passes custom URL
   parameters (affid, pub, sub1-5, page) as properties.
   ------------------------------------------------------- */
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  
  // Extract URL parameters
  const urlParams3 = new URLSearchParams(window.location.search);
  const customProps = {};
  
  // Add URL parameters if they exist
  const params = ['affid', 'pub', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'page'];
  params.forEach(param => {
    const value = urlParams3.get(param);
    if (value) {
      customProps[param] = value;
    }
  });
  
  plausible.init({
    customProperties: customProps
  });


/* -------------------------------------------------------
   FRAMER INTERNAL URL PARAMETER PROPAGATION
   Appends the current page's search params to every
   internal Framer link so query-strings survive navigation.
   ------------------------------------------------------- */
!function(){!function(){var l="framer_variant";function u(a,r){let n=r.indexOf("#"),e=n===-1?r:r.substring(0,n),o=n===-1?"":r.substring(n),t=e.indexOf("?"),m=t===-1?e:e.substring(0,t),d=t===-1?"":e.substring(t),s=new URLSearchParams(d),h=new URLSearchParams(a);for(let[i,g]of h)s.has(i)||i!==l&&s.append(i,g);let c=s.toString();return c===""?e+o:m+"?"+c+o}var w='div#main a[href^="#"],div#main a[href^="/"],div#main a[href^="."]',f="div#main a[data-framer-preserve-params]",p=true;if(window.location.search&&!navigator.webdriver&&!/bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(navigator.userAgent)){let a=document.querySelectorAll(p?`${w},${f}`:f);for(let r of a){let n=u(window.location.search,r.href);r.setAttribute("href",n)}}
}()}


/* -------------------------------------------------------
   iOS VIEWPORT & ZOOM LOCK  (Snippet: legacy-bodyEnd)
   Prevents pinch-zoom and double-tap zoom on iOS Safari,
   and locks the viewport meta when form inputs are focused.
   ------------------------------------------------------- */
(function () {
  // Needed so we can call preventDefault
  var passiveFalse = { passive: false };

  // Prevent pinch-zoom (iOS Safari fires these gesture* events)
  function stop(e){ e.preventDefault(); }
  document.addEventListener('gesturestart',  stop, passiveFalse);
  document.addEventListener('gesturechange', stop, passiveFalse);
  document.addEventListener('gestureend',    stop, passiveFalse);

  // Prevent double-tap zoom (two taps within ~300ms)
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, passiveFalse);

  // If someone edits the viewport tag, keep it locked
  function lockViewport() {
    var meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;
    var wanted = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    if (meta.content !== wanted) meta.setAttribute('content', wanted);
  }
  lockViewport();
  window.addEventListener('orientationchange', lockViewport);
})();
{ (function () {
  // Grab or create the viewport meta
  var meta = document.querySelector('meta[name="viewport"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'viewport';
    document.head.appendChild(meta);
    meta.setAttribute('content','width=device-width, initial-scale=1');
  }

  // Remember whatever you have now (so we can restore it)
  var original = meta.getAttribute('content') || 'width=device-width, initial-scale=1';

  // A "locked" version that disables zooming
  function makeLocked(base) {
    // strip any existing scale/user-scalable bits, then add our lock
    return base
      .replace(/\bmaximum-scale=[^,]+,?\s*/g,'')
      .replace(/\bminimum-scale=[^,]+,?\s*/g,'')
      .replace(/\buser-scalable=[^,]+,?\s*/g,'')
      + (base ? ', ' : '') + 'maximum-scale=1, minimum-scale=1, user-scalable=no';
  }
  var locked = makeLocked(original);

  // Lock on focus; restore on blur
  function isFormControl(el){
    return el && (
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.tagName === 'SELECT'
    );
  }

  // Use capture to catch focus from deeply nested Framer components
  document.addEventListener('focusin', function(e){
    if (isFormControl(e.target)) meta.setAttribute('content', locked);
  }, true);

  document.addEventListener('focusout', function(e){
    if (isFormControl(e.target)) {
      // restore after the blur settles
      setTimeout(function(){ meta.setAttribute('content', original); }, 0);
    }
  }, true);

  // Also guard against accidental pinch/double-tap zoom
  var passiveFalse = { passive:false };
  function stop(ev){ ev.preventDefault(); }
  document.addEventListener('gesturestart',  stop, passiveFalse);
  document.addEventListener('gesturechange', stop, passiveFalse);
  document.addEventListener('gestureend',    stop, passiveFalse);

  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, passiveFalse);
})(); }

/* -------------------------------------------------------
   URL PARAMETER PROPAGATION TO OUTBOUND LINKS  (Snippet: Vg1p1a1ZQ)
   Preserves current query-string across navigation to
   same-domain links and monitors dynamically added links.
   ------------------------------------------------------- */
/**
 * Append URL parameters to all outbound links
 * Preserves query parameters across navigation within the same domain
 */
(function () {
  // Get current URL parameters
  const urlParams2 = new URLSearchParams(window.location.search);
  const queryString = urlParams2.toString();
  
  // Only proceed if there are parameters to append
  if (!queryString) return;
  
  /**
   * Append parameters to a single link
   * @param {HTMLAnchorElement} link - The link element to modify
   */
  function appendParamsToLink(link) {
    try {
      const url = new URL(link.href);
      
      // Merge existing parameters with current page parameters
      urlParams2.forEach((value, key) => {
        // Only add if the link doesn't already have this parameter
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });
      
      link.href = url.toString();
    } catch (e) {
      // Skip invalid URLs
      console.warn('Invalid URL:', link.href);
    }
  }
  
  /**
   * Check if link should be processed (same domain or relative)
   * @param {HTMLAnchorElement} link - The link to check
   * @returns {boolean}
   */
  function shouldProcessLink(link) {
    return link.hostname === window.location.hostname || 
           link.getAttribute('href').startsWith('/');
  }
  
  /**
   * Process all links on the page
   */
  function processLinks() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      if (shouldProcessLink(link)) {
        appendParamsToLink(link);
      }
    });
  }
  
  /**
   * Process a single node (used for dynamically added content)
   * @param {Node} node - The node to process
   */
  function processNode(node) {
    if (node.nodeType !== 1) return; // Only process element nodes
    
    // Process if it's a link
    if (node.tagName === 'A' && node.href && shouldProcessLink(node)) {
      appendParamsToLink(node);
    }
    
    // Process child links
    if (node.querySelectorAll) {
      node.querySelectorAll('a[href]').forEach(link => {
        if (shouldProcessLink(link)) {
          appendParamsToLink(link);
        }
      });
    }
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processLinks);
  } else {
    processLinks();
  }
  
  // Observe for dynamically added links
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(processNode);
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
void 0;

/* -------------------------------------------------------
   EVERFLOW AFFILIATE TRACKING  (Snippet: Gmu02riLt)
   Fires EverFlow click events based on affid / affid2 /
   affid3 URL parameters.
   ------------------------------------------------------- */
(function () {
  var params = new URLSearchParams(window.location.search);
  var afid = params.get('afid');
  var affid3 = params.get('affid3');
  var affid2 = params.get('affid2');

  if (afid === 'kt') {
    var script = document.createElement('script');
    script.src = 'https://www.mnbvpo8trk.com/scripts/sdk/everflow.js';
    script.onload = function() {
      EF.click({
        offer_id: params.get('oid'),
        affiliate_id: params.get('affid'),
        sub1: params.get('sub1'),
        sub2: params.get('sub2'),
        sub3: params.get('sub3'),
        sub4: params.get('offer_id'),
        sub5: params.get('transaction_id'),
        uid: params.get('uid'),
        source_id: params.get('publisher_id'),
        transaction_id: params.get('_ef_transaction_id')
      });
    };
    document.head.appendChild(script);

  } else if (affid3) {
    var script = document.createElement('script');
    script.src = 'https://www.mnbvpo8trk.com/scripts/main.js';
    script.onload = function() {
      var p = EF.click({
        tracking_domain: 'https://www.blazntrak.com',
        offer_id: EF.urlParameter('oid3'),
        affiliate_id: EF.urlParameter('affid3'),
        sub1: EF.urlParameter('sub1'),
        sub2: EF.urlParameter('sub2'),
        sub3: EF.urlParameter('sub3'),
        sub4: EF.urlParameter('sub4'),
        sub5: EF.urlParameter('sub5'),
      });
      if (p && typeof p.then === 'function') {
        p.then(function(transaction_id) {
          EF.click({
            tracking_domain: 'https://www.mnbvpo8trk.com',
            offer_id: EF.urlParameter('oid'),
            affiliate_id: EF.urlParameter('affid'),
            sub1: EF.urlParameter('sub1'),
            sub2: EF.urlParameter('sub2'),
            sub3: EF.urlParameter('sub3'),
            sub4: EF.urlParameter('sub4'),
            sub5: transaction_id,
            uid: EF.urlParameter('uid'),
            source_id: EF.urlParameter('source_id'),
          });
        });
      }
    };
    document.head.appendChild(script);

  } else if (affid2) {
    var script = document.createElement('script');
    script.src = 'https://www.mnbvpo8trk.com/scripts/main.js';
    script.onload = function() {
      var p = EF.click({
        tracking_domain: 'https://www.brcvhf7tf.com',
        offer_id: EF.urlParameter('oid2'),
        affiliate_id: EF.urlParameter('affid2'),
        sub1: EF.urlParameter('sub1'),
        sub2: EF.urlParameter('sub2'),
        sub3: EF.urlParameter('sub3'),
        sub4: EF.urlParameter('sub4'),
        sub5: EF.urlParameter('sub5'),
      });
      if (p && typeof p.then === 'function') {
        p.then(function(transaction_id) {
          EF.click({
            tracking_domain: 'https://www.mnbvpo8trk.com',
            offer_id: EF.urlParameter('oid'),
            affiliate_id: EF.urlParameter('affid'),
            sub1: EF.urlParameter('sub1'),
            sub2: EF.urlParameter('sub2'),
            sub3: EF.urlParameter('sub3'),
            sub4: EF.urlParameter('sub4'),
            sub5: transaction_id,
            uid: EF.urlParameter('uid'),
            source_id: EF.urlParameter('source_id'),
          });
        });
      }
    };
    document.head.appendChild(script);

  } else {
    var script = document.createElement('script');
    script.src = 'https://www.mnbvpo8trk.com/scripts/main.js';
    script.onload = function() {
      EF.configure({
        organic: {
          offer_id: 13,
          affiliate_id: 6
        }
      });
      EF.click({
        tracking_domain: 'https://www.mnbvpo8trk.com',
        offer_id: EF.urlParameter('oid'),
        affiliate_id: EF.urlParameter('affid'),
        sub1: EF.urlParameter('sub1'),
        sub2: EF.urlParameter('sub2'),
        sub3: EF.urlParameter('sub3'),
        sub4: EF.urlParameter('sub4'),
        sub5: EF.urlParameter('sub5'),
        uid: EF.urlParameter('uid'),
        source_id: EF.urlParameter('source_id'),
        transaction_id: EF.urlParameter('_ef_transaction_id'),
      });
    };
    document.head.appendChild(script);
  }
})();