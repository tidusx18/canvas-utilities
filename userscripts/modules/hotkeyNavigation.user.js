// ==UserScript==
// @name         Canvas UX - Module: Hotkey Navigation
// @namespace    https://github.com/redice44
// @version      0.0.1a
// @description  Adds arrow key navigation through modules
// @author       Matt Thomson
// @match        https://[YOUR URL]/courses/*?module_item_id=*
// @match        https://[YOUR URL]/courses/*/modules/items/*
// @run-at       document-idle
// ==/UserScript==

(function() {

  document.addEventListener( 'keydown', handleHotkey, false );

  function handleHotkey( e ) {

    if ( !e.code ) {

      return;

    }

    const nextElementSelector = '#content .module-sequence-footer-content > .module-sequence-footer-button--next > a';
    const prevElementSelector = '#content .module-sequence-footer-content > .module-sequence-footer-button--previous';

    switch ( e.code ) {

      case 'ArrowLeft':

        e.preventDefault();
        const prevEl = document.querySelector( prevElementSelector ).click();

        break;

      case 'ArrowRight':

        e.preventDefault();
        const nextEl = document.querySelector( nextElementSelector ).click();

        break;

    }

  }

})();
