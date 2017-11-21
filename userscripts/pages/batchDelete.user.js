// ==UserScript==
// @name         Canvas UX - Pages: Batch Delete
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Provides batch delete
// @author       Matt Thomson
// @match        https://[YOUR URL]/courses/*/pages
// @run-at       document-idle
// ==/UserScript==

(function() {

  setTimeout(initUI, 200);

})();

function initUI() {

  let uiEl = document.querySelector( '#content > div > div.header-bar-outer-container > div > div > div' );
  let delEl = document.createElement( 'a' );

  delEl.setAttribute( 'href', '#' );
  delEl.classList.add( 'btn', 'btn-danger' );
  delEl.innerText = 'Batch Delete'
  delEl.style.marginRight = '5px';
  delEl.addEventListener( 'click', batchDelete, false );

  uiEl.insertBefore( delEl, uiEl.children[ 0 ] );

  setupBatchDelete();

}

function setupBatchDelete() {

  let pages = document.querySelectorAll( '#content > div > div.index-content-container > div > table > tbody > tr' );

  for ( let i = 0; i < pages.length; i++ ) {

    let tdEl = document.createElement( 'td' );
    let inputEl = document.createElement( 'input' );

    inputEl.setAttribute( 'type' , 'checkbox' );
    inputEl.classList.add( 'batch-delete' );

    tdEl.appendChild( inputEl );
    pages[ i ].appendChild( tdEl );

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

  for ( let i = delPages.length - 1; i >= 0; i-- ) {

    const baseUrl = pages[ delPages[ i ] ].querySelector( 'a.wiki-page-link ').href.split( '/courses/' );
    const url = `${baseUrl[ 0 ]}/api/v1/courses/${baseUrl[ 1 ]}`;
    const request = buildRequest( method, url );
    request.onreadystatechange = itemDeleted.bind( request, pages[ delPages[ i ] ] );
    request.send( `_method=${method}&authenticity_token=${csrfToken}` );

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
