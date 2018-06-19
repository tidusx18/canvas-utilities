// ==UserScript==
// @name         Canvas UX - Module: Quick Access Indent Icons
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Adds Indent Icons to Module Items
// @author       Matt Thomson
// @match        https://fiu.instructure.com/courses/*/modules
// @run-at       document-idle
// ==/UserScript==


(function() {

  const moduleItems = document.querySelectorAll( 'ul.ig-list > li.context_module_item' );

  for ( let i = 0; i < moduleItems.length; i++ ) {

    const admin = moduleItems[ i ].querySelector( '.ig-admin' );
    const decIndent = admin.querySelector( 'ul.al-options a.outdent_item_link' ).cloneNode( true );
    const incIndent = admin.querySelector( 'ul.al-options a.indent_item_link' ).cloneNode( true );

    decIndent.removeChild( decIndent.childNodes[ 1 ] );
    incIndent.removeChild( incIndent.childNodes[ 1 ] );

    admin.insertBefore( incIndent, admin.firstChild );
    admin.insertBefore( decIndent, admin.firstChild );

  }

})();
