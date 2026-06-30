export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const slug = url.pathname.replace(/^\/story\//, '').replace(/\/$/, '') || '';

  if (!slug) {
    const tpl = await env.ASSETS.fetch(new URL('/story.html', url));
    return new Response(tpl.body, { status: 200, headers: { 'Content-Type': 'text/html', 'Cache-Control': 'public, max-age=0, s-maxage=300' } });
  }

  const isPreview = url.searchParams.get('preview') === '1';
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_KEY;

  let story = null;
  try {
    let apiUrl = supabaseUrl + '/rest/v1/stories?slug=eq.' + encodeURIComponent(slug) + '&select=*';
    if (!isPreview) apiUrl += '&status=eq.published';
    const res = await fetch(apiUrl, {
      headers: { apikey: supabaseKey, Authorization: 'Bearer ' + supabaseKey, Accept: 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) story = data[0];
    }
  } catch (e) {
    // fall through
  }

  const tplRes = await env.ASSETS.fetch(new URL('/story.html', url));
  let html = await tplRes.text();

  if (!story) {
    return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html', 'Cache-Control': 'public, max-age=0, s-maxage=300' } });
  }

  const esc = (s) => (s || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const title = esc(story.meta_title || story.title);
  const desc = esc(story.meta_description || story.summary);
  const ogImage = story.og_image || story.fact_check_image || '';

  html = html.replace('<title>The Breakdown — Story</title>',
    '<title>' + title + ' — The Breakdown</title>\n' +
    '    <meta name="description" content="' + desc + '">\n' +
    '    <meta property="og:title" content="' + title + '">\n' +
    '    <meta property="og:description" content="' + desc + '">\n' +
    '    <meta property="og:type" content="article">\n' +
    '    <meta property="og:url" content="https://thebreakdown.in/story/' + slug + '">\n' +
    (ogImage ? '    <meta property="og:image" content="' + ogImage + '">\n' : '') +
    '    <meta name="twitter:card" content="summary_large_image">\n' +
    '    <meta name="twitter:title" content="' + title + '">\n' +
    '    <meta name="twitter:description" content="' + desc + '">\n' +
    (ogImage ? '    <meta name="twitter:image" content="' + ogImage + '">\n' : '')
  );

  html = html.replace('const API = \'\';',
    'const API = \'\';\nconst SSR_STORY = ' + JSON.stringify(story).replace(/'/g, '&#39;') + ';'
  );

  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html', 'Cache-Control': 'public, max-age=0, s-maxage=300' } });
}
