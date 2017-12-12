// ==UserScript==
// @name         Canvas UX - Pages: Filter
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Provides a filter for the page list
// @author       Matt Thomson
// @match        https://[YOUR URL]/courses/*/pages
// @run-at       document-idle
// ==/UserScript==

(function() {

  let filterInput = '';

  setTimeout( init, 500 );

  function init() {

    initObservers();
    makeFilter();
    filterPages();

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

  function loaderMutation( mutations, observer ) {

    mutations.forEach( ( mutation ) => {

      const removedChildren = mutation.removedNodes;

      if ( removedChildren.length > 0 ) {

        makeFilter();
        document.querySelector( '#page_filter' ).value = filterInput;
        filterPages();
        observer.disconnect();

      }

    } );

  }

  function pageMutation( mutations ) {

    mutations.forEach( ( mutation ) => {

      if ( mutation.type === 'childList' ) {

        const addedChildren = mutation.addedNodes;

        for ( let i = 0; i < addedChildren.length; i++ ) {

          updatePage( addedChildren[ i ] );

        }

      }

    } );

  }

  function updatePage( pageContainerEl ) {

    const title = pageContainerEl.querySelector( 'td > a.wiki-page-link' ).innerText.trim().toLowerCase();

    if ( !filterInput ) {

      pageContainerEl.style.display = 'table-row';

    } else {

      pageContainerEl.style.display = title.includes( filterInput ) ? 'table-row' : 'none';

    }

  }

  function makeFilter() {

    const parentEl = document.querySelector( '#content .header-bar' );
    const rightEl = document.querySelector( '#content .header-bar > .header-bar-right' );

    let divEl = document.createElement( 'div' );
    let inputEl = document.createElement( 'input' );
    let btnEl = document.createElement( 'button' );

    parentEl.classList.add( 'flex-container' );
    rightEl.classList.add( 'header-right-flex' );

    divEl.style.marginTop = '10px';
    divEl.style.marginBottom = '10px';
    divEl.classList.add( 'header-bar-left', 'header-left-flex' );

    btnEl.innerText = 'Filter';
    btnEl.classList.add('btn','btn-primary');
    btnEl.style.marginRight = '10px';

    inputEl.classList.add( 'item_title' );
    inputEl.setAttribute( 'type', 'text' );
    inputEl.id = 'page_filter';
    inputEl.style.marginBottom = '0';

    divEl.appendChild( btnEl );
    divEl.appendChild( inputEl );

    parentEl.insertBefore( divEl, rightEl );

    btnEl.addEventListener( 'click', filterPages, false );

  }

  function filterPages( event ) {

    filterInput = document.querySelector( '#content #page_filter' ).value.toLowerCase();

    const pages = document.querySelectorAll( '#content div.index-content table > tbody.collectionViewItems > tr' );

    for ( let i = 0; i < pages.length; i++ ) {

      updatePage( pages[ i ] );

    }

  }

})();
