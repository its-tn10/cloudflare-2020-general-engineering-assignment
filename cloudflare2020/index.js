/*******************************/
/*****  Request Handlers  *****/
/*******************************/

// Array of Links for JSON API
const URLs = [{'name': 'Website', 'url': 'https://tientavu.com/'}, {'name': 'LinkedIn', 'url': 'https://linkedin.com/in/tien-tavu'}, 
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
  return new HTMLRewriter().on('*', new ElementTransformer(URLs)).transform(response);
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

class ElementTransformer {
  constructor(links) {
    this.links = links;
  }
  
  async element(element) {
    if (element.tagName == 'div') {
      switch (element.getAttribute('id')) {
        case 'links':
          for (let i = 0; i < this.links.length; i++) 
            element.append(this.links[i]['name'].link(this.links[i]['url']), {html: true});

          break;

        case 'profile':
          element.removeAttribute('style');

          break;
      }
    } else if (element.tagName == 'img' && element.getAttribute('id') == 'avatar') {
      element.setAttribute('src', 'https://tientavu.com/static/media/bitmoji.png');
    } else if (element.tagName == 'h1' && element.getAttribute('id') == 'name') {
      element.setInnerContent('Tien Tavu');
    }
  }
}
