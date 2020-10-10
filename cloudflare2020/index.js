/*******************************/
/*****  Request Handlers  *****/
/*******************************/

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
      return handleHTMLRequest(request);
  }
}

/********************************/
/*****  Endpoint Handlers  *****/
/********************************/

/**
 * Handler for the static HTML page
 * @param {*} request 
 */

async function handleHTMLRequest(request) {
  const response = await fetch('https://static-links-page.signalnerve.workers.dev');
  return new HTMLRewriter().on("div", new LinksTransformer(URLs)).transform(response);
}

/**
 * Handler for /links endpoint
 * @param {*} request 
 */
async function handleLinkRequest(request) {
  return new Response(JSON.stringify(URLs), {
    headers: { 'content-type': 'application/json' },
  });
}

/*******************************/
/*****    Class Objects    *****/
/*******************************/

class LinksTransformer {
  constructor(links) {
    this.links = links;
  }
  
  async element(element) {
    if (element.tagName == 'div' && element.getAttribute('id') == 'links') {
      for (let i = 0; i < this.links.length; i++) 
        element.append(this.links[i]['name'].link(this.links[i]['url']), {html: true});
      
    }
  }
}
