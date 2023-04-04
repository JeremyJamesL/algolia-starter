import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits, configure, panel, pagination, refinementList } from 'instantsearch.js/es/widgets';
const appID = 'YSWWVAX5RB';
const searchAPIKey = '9fb3db0222f7b5aef0e2b30791ee6201';
const indexName = 'federated_ecomm_PRODUCTS';

const searchClient = algoliasearch(appID, searchAPIKey)


const search = instantsearch({
  indexName: indexName,
  searchClient,
});

search.addWidgets([
    searchBox({
      container: "#searchbox"
    }),
    hits({
        container: '#hits',
        templates: {
          item(hit, { html, components }) {
            return html`
              <h2>
                ${components.Highlight({ attribute: 'name', hit })}
              </h2>
              <p>${hit.description}</p>
            `;
          },
        },
      }),
    configure({
        hitsPerPage: 8,
      }),
    panel({
        templates: { header: 'brand' },
      })(refinementList)({
        container: '#brand-list',
        attribute: 'brand',
      }),
      pagination({
        container: '#pagination',
      }),
  ]);


search.start();
