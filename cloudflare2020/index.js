// Array of Links for JSON API
const URLs = [{'name': 'Website Home', 'url': 'https://tientavu.com/'}, {'name': 'LinkedIn', 'url': 'https://linkedin.com/in/tien-tavu'}, 
              {'name': 'GitHub', 'url': 'https://github.com/its-tn10'}, {'name': 'YouTube', 'url': 'https://www.youtube.com/channel/UC8gmErEWus2TC3Tm_4U1yGQ'}];

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const requestURL = new URL(request.url);
  switch (requestURL.pathname) {
    case '/links':
      return handleLinkRequest(request);

    default:
      return new Response(null, {
        headers: { 'content-type': 'text/plain' },
      });
  }
}

/**
 * Handler for /links endpoint
 */
async function handleLinkRequest(request) {
  return new Response(JSON.stringify(URLs), {
    headers: { 'content-type': 'application/json' },
  });
}