// ==UserScript==
// @name         Canvas UX - Pages: Batch Delete
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Provides batch delete
// @author       Matt Thomson
// @match        https://fiu.instructure.com/courses/*/pages
// @run-at       document-idle
// ==/UserScript==

(function() {

  setTimeout( init, 500 );

  function init() {

    initObservers();
    initDeleteButton();
    updateAllPages();

  }

  function initObservers() {

    const pageObserver = new MutationObserver( pageMutation );
    const loaderObserver = new MutationObserver( loaderMutation );
    const loadMoreEl = document.querySelector( '#content > div > div.index-content-container > div.index-content > div.loading.loading-more' );

    if ( loadMoreEl ) {

      const pagesContainerEl = document.querySelector( '#content div.index-content table > tbody.collectionViewItems' );
      const loaderParentEl = document.querySelector( '#content > div.collectionView' );

      pageObserver.observe( pagesContainerEl, { childList: true } );
      loaderObserver.observe( loaderParentEl, { childList: true } );

    }

  }

  function initDeleteButton() {

    let uiEl = document.querySelector( '#content > div > div.header-bar-outer-container > div > div > div' );
    let delEl = document.createElement( 'a' );

    delEl.setAttribute( 'href', '#' );
    delEl.classList.add( 'btn', 'btn-danger' );
    delEl.innerText = 'Batch Delete'
    delEl.style.marginRight = '5px';
    delEl.addEventListener( 'click', batchDelete, false );

    uiEl.insertBefore( delEl, uiEl.children[ 0 ] );

  }

  function loaderMutation( mutations, observer ) {

    mutations.forEach( ( mutation ) => {

      const removedChildren = mutation.removedNodes;

      if ( removedChildren.length > 0 ) {

        // Canvas rebuilds the table, so add the checkbox again.
        initDeleteButton();
        updateAllPages();
        observer.disconnect();

      }

    } );

  }

  function pageMutation( mutations ) {

    mutations.forEach( ( mutation ) => {

      if ( mutation.type === 'childList' ) {

        const addedChildren = mutation.addedNodes;

        for ( let i = 0; i < addedChildren.length; i++ ) {

          addDeleteCheckbox( addedChildren[ i ] );

        }

      }

    } );

  }

  function addDeleteCheckbox( pageContainerEl ) {

    let tdEl = document.createElement( 'td' );
    let inputEl = document.createElement( 'input' );

    inputEl.setAttribute( 'type' , 'checkbox' );
    inputEl.classList.add( 'batch-delete' );

    tdEl.appendChild( inputEl );
    pageContainerEl.appendChild( tdEl );

  }

  function updateAllPages() {

    let pages = document.querySelectorAll( '#content > div > div.index-content-container > div > table > tbody > tr' );

    for ( let i = 0; i < pages.length; i++ ) {

      addDeleteCheckbox( pages[ i ] );

    }

  }

  function batchDelete() {

    const method = 'DELETE';
    const csrfToken = getCSRFToken();
    const pages = document.querySelectorAll( '#content > div > div.index-content-container > div > table > tbody > tr' );
    const delPages = [];

    for ( let i = 0; i < pages.length; i++ ) {

      if ( pages[ i ].querySelector( 'input.batch-delete' ).checked ) {

        delPages.push( i );

      }

    }

    if ( confirm( `Are you sure you want to delete ${delPages.length} page(s)?` ) ) {

      for ( let i = delPages.length - 1; i >= 0; i-- ) {

        const baseUrl = pages[ delPages[ i ] ].querySelector( 'a.wiki-page-link ').href.split( '/courses/' );
        const url = `${baseUrl[ 0 ]}/api/v1/courses/${baseUrl[ 1 ]}`;
        const request = buildRequest( method, url );
        request.onreadystatechange = itemDeleted.bind( request, pages[ delPages[ i ] ] );
        request.send( `_method=${method}&authenticity_token=${csrfToken}` );

      }

    }

  }

  function buildRequest( _method, queryURL ) {

    const request = new XMLHttpRequest();

    request.open( _method, queryURL, true );
    request.setRequestHeader( 'Accept', 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01' );
    request.setRequestHeader( 'Accept-Language', 'en-US,en;q=0.9' );
    request.setRequestHeader( 'Cache-Control', 'no-cache' );
    request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    request.setRequestHeader( 'Pragma', 'no-cache' );
    request.setRequestHeader( 'x-Requested-With', 'XMLHttpRequest' );

    return request;

  }

  function itemDeleted( node ) {

    if ( this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {

      node.parentElement.removeChild( node );

    }

  }

  function getCSRFToken() {

    const cookies = document.cookie.split( '; ');

    for ( let i = 0; i < cookies.length; i++ ) {

      if ( cookies[ i ].includes( '_csrf_token' ) ) {

        return cookies[ i ].split( '=' )[ 1 ];

      }

    }

    return null;

  }

})();
