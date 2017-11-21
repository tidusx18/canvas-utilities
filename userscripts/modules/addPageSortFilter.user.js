// ==UserScript==
// @name         Canvas UX - Module: Sort and Filter Adding Pages
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Sorts and filters the pages list when adding a new page to a module
// @author       Matt Thomson
// @match        https://[YOUR URL]/courses/*/modules
// @run-at       document-idle
// ==/UserScript==

(function() {

  const selectEl = document.querySelector('#wiki_pages_select > div:nth-child(2) > select');
  const opts = [];

  makeFilter();

  while ( selectEl.children.length > 1 ) {

    opts.push( selectEl.removeChild( selectEl.children[ 1 ] ) );

  }

  opts.sort( ( a, b ) => a.innerText > b.innerText ? 1 : -1 );
  opts.forEach( opt => { selectEl.appendChild( opt ); } );

  function makeFilter() {

    const parentEl = document.querySelector( '#wiki_pages_select' );

    let divEl = document.createElement( 'div' );
    let inputEl = document.createElement( 'input' );
    let btnEl = document.createElement( 'button' );

    divEl.style.marginTop = '10px';
    divEl.style.marginBottom = '10px';

    btnEl.innerText = 'Filter';
    btnEl.classList.add('btn','btn-primary');
    btnEl.style.marginRight = '10px';

    inputEl.classList.add( 'item_title' );
    inputEl.setAttribute( 'type', 'text' );
    inputEl.id = 'page_filter';
    inputEl.style.marginBottom = '0';

    divEl.appendChild( btnEl );
    divEl.appendChild( inputEl );

    parentEl.insertBefore( divEl, document.querySelector( '#wiki_pages_select > div.new' ) );

    btnEl.addEventListener( 'click', e => {

      const opts = document.querySelectorAll( '#wiki_pages_select > div:nth-child(2) > select > option' );
      const input = document.querySelector( '#wiki_pages_select #page_filter' ).value;

      for ( let i = 1; i < opts.length; i++ ) {

        if ( !input ) {

          opts[ i ].style.display = 'block';

        } else {

          opts[ i ].style.display = opts[ i ].innerText.includes( input ) ? 'block' : 'none';

        }

      }

    } );

  }

})();

