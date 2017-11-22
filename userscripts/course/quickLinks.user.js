// ==UserScript==
// @name         Canvas UI - Course: Quick Links
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Adds quick links to deeply nested items.
// @author       Matt Thomson
// @match        https://[YOUR URL]/courses/*
// @run-at       document-idle
// ==/UserScript==

(function() {

  const menuItems = [

    {

      title: 'Question Banks',
      url: '/question_banks',
      addToTop: true

    },
    {

      title: 'Student View',
      url: '/student_view',
      addToTop: true,
      method: 'post'

    }

  ];

  buildMenu();

  function buildMenu() {

    const menuEl = document.querySelector( '#section-tabs' );

    for ( let i = 0; i < menuItems.length; i++ ) {

      let itemEl = makeMenuItem( menuItems[ i ].title, menuItems[ i ].url, menuItems[ i ].method );

      if ( menuItems[ i ].addToTop ) {

        menuEl.insertBefore( itemEl, menuEl.children[ 0 ] );

      } else {

        menuEl.appendChild( itemEl );

      }

    }

  }

  function makeMenuItem( title, url, method ) {

    const baseUrl = window.location.href.split( '/courses/' )[ 0 ];
    const courseID = window.location.href.split( '/' )[ 4 ];
    const itemEl = document.createElement( 'li' );
    const linkEl = document.createElement( 'a' );

    itemEl.classList.add( 'section' );

    linkEl.setAttribute( 'href', `${baseUrl}/courses/${courseID}${url}` );

    if ( method ) {

      // Unsure if other methods work. Currently only tested post
      linkEl.setAttribute( 'data-method', method );

    }

    linkEl.innerHTML = title;

    itemEl.appendChild( linkEl );

    return itemEl;

  }

})();
