'use strict';

class Router {
  constructor(routes, allowCaching = true) {
    this._routes = routes;
    this.allowCaching = allowCaching;

    // Set default route.
    if(!location.hash) {
      location.hash = "#/";
    }

    // Element where content of requested page get inserted.
    document.querySelector('body').insertAdjacentHTML('beforeend', `<div class="content"></div>`);
    this.contentEL = document.querySelector('.content');

    this.requestPage = this.requestPage.bind(this);

    window.addEventListener("hashchange", this.requestPage);
  }

  get routes() {
    return this._routes;
  }

  set routes(newRoute) {
    this._routes = newRoute;
  }

  requestPage() {
    let path = location.hash;
    let pageId = this._routes[path];

    if(localStorage[pageId]) {
      this.contentEL.innerHTML = localStorage[pageId];
    }
    else {
      let pageURL = pageId + '.html';
      let init = { 
                    method: 'GET',
                    mode: 'same-origin',
                    cache: 'default' 
                  };

      // Requesting for data.
      fetch(pageURL, init)
      .then((response) => response.text())
      .then((data) => {
        if(this.allowCaching) {
          // Storing page data to cache.
          localStorage.setItem(pageId, data);
        }

        // displaying the data in UI
        this.contentEL.innerHTML = data;
      });
    }
  }

}