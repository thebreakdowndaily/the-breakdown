const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://plausible.io https://static.cloudflareinsights.com https://translate.google.com blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://translate.google.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src https://cdn.pixabay.com; connect-src 'self' https://plausible.io https://the-breakdown-cms.onrender.com https://lvfovvidtowadmnggzzf.supabase.co https://static.cloudflareinsights.com https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.gstatic.com https://*.ingest.us.sentry.io; frame-src 'self' https:; worker-src 'self' blob:"
};

/**
 * Routing rules:
 *   /story/*          → proxied to Render (SSR)
 *   /api/*            → proxied to Render
 *   /admin*           → proxied to Render
 *   /usage, /models   → proxied to Render
 *   Known static pages → served from Cloudflare Pages
 *   Everything else    → served from Cloudflare Pages (includes homepage index.html)
 *
 * To change story template: edit fact-check-cms/public/story.html, push CMS repo
 * For deploy: .\scripts\deploy.ps1
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Known static pages served from Cloudflare Pages
    const staticPages = ['/stories', '/about', '/contact', '/topics', '/team', '/funding', '/thank-you', '/editorial-policy', '/corrections', '/ai-policy', '/privacy-policy', '/terms-of-service', '/cookies-policy', '/robots.txt', '/og-image.png'];
    if (staticPages.includes(path)) {
      return env.ASSETS.fetch(request);
    }

    // Proxy API, story, admin, usage, models, and sitemap to Render
    if (path.startsWith('/api/') || path.startsWith('/story/') || path.startsWith('/admin') || path === '/usage' || path === '/models' || path === '/sitemap.xml') {
      const target = 'https://the-breakdown-cms.onrender.com' + path + url.search;
      let res;
      try {
        res = await fetch(target, {
          method: request.method,
          headers: request.headers,
          body: request.body,
          signal: AbortSignal.timeout(15000)
        });
      } catch (e) {
        return env.ASSETS.fetch(request);
      }
      const headers = new Headers(res.headers);
      headers.delete('Content-Encoding');
      headers.delete('Transfer-Encoding');
      headers.delete('Content-Length');
      Object.entries(SECURITY_HEADERS).forEach(([k, v]) => headers.set(k, v));
      let body = await res.text();
      if (path.startsWith('/story/')) {
        // Patch missing hasIntel declaration (CMS template may not be deployed yet)
        if (body.indexOf('var hasIntel') === -1) {
          body = body.replace(
            /(tocLinks=tocItems\.map\([^;]+;)(\s*\n)(\s*var img=)/,
            '$1 var hasIntel=/<div class="intel-summary">/i.test(c);$2$3'
          );
        }
        // Inject fix script to ensure SVGs render and hero placeholders don't show letters
        const fixScript = '<script>(function(){var c=document.getElementById("content");if(!c)return;var o=new MutationObserver(function(){var b=c.querySelector(".story-body");if(b){b.querySelectorAll("svg").forEach(function(s){if(!s.getAttribute("width"))s.setAttribute("width","100%");if(!s.getAttribute("height"))s.setAttribute("height","auto")});var p=c.querySelector(".story-hero-placeholder");if(p&&p.querySelector("span")){p.innerHTML="";p.style.background="linear-gradient(135deg,#111 0%,#1a1a1a 50%,#0A0A0A 100%)"}}});o.observe(c,{childList:true,subtree:true})})();<\/script>';
        const bodyEnd = body.lastIndexOf('</body>');
        if (bodyEnd >= 0) {
          body = body.substring(0, bodyEnd) + fixScript + '</body>';
        }
      }
      return new Response(body, { status: res.status, headers });
    }

    // Static assets from Pages
    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    Object.entries(SECURITY_HEADERS).forEach(([k, v]) => headers.set(k, v));
    return new Response(res.body, { status: res.status, headers });
  }
}
