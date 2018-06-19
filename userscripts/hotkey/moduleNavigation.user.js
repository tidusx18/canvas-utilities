// ==UserScript==
// @name         Canvas UX - Hotkeys: Module Navigation
// @namespace    https://github.com/redice44
// @version      0.0.1b
// @description  Hotkey: Left and right arrow key navigation through module content.
// @author       Matt Thomson <red.cataclysm@gmail.com>

// @include      https://fiu.instructure.com/courses/*/assignments/*
// @include      https://fiu.instructure.com/courses/*/discussion_topics/*
// @include      https://fiu.instructure.com/courses/*/files/*
// @include      https://fiu.instructure.com/courses/*/modules/items/*
// @include      https://fiu.instructure.com/courses/*/pages/*
// @include      https://fiu.instructure.com/courses/*/quizzes/*

// @exclude      https://fiu.instructure.com/courses/*/assignments/*/edit*
// @exclude      https://fiu.instructure.com/courses/*/discussion_topics/*/edit*
// @exclude      https://fiu.instructure.com/courses/*/pages/*/edit*
// @exclude      https://fiu.instructure.com/courses/*/quizzes/*/edit*

// @exclude      https://fiu.instructure.com/courses/*/assignments/new
// @exclude      https://fiu.instructure.com/courses/*/discussion_topics/new

// @run-at       document-idle
// ==/UserScript==

(function() {

  function hotkeyAction( event ) {

    const nextElementSelector = '#content .module-sequence-footer-content > .module-sequence-footer-button--next > a';
    const prevElementSelector = '#content .module-sequence-footer-content > .module-sequence-footer-button--previous';

    switch ( event.code ) {

      case 'ArrowLeft':

        event.preventDefault();

        try {

          document.querySelector( prevElementSelector ).click();

        } catch ( error ) {

          // Fail silently. Likely the element hasn't loaded yet.

        }

        break;

      case 'ArrowRight':

        event.preventDefault();

        try {

          document.querySelector( nextElementSelector ).click();

        } catch ( error ) {

          // Fail silently. Likely the element hasn't loaded yet.

        }

        break;

    }

  }

  function handleHotkey( event ) {

    if ( !event.code ) {

      return;

    }

    hotkeyAction( event );

  }

  document.addEventListener( 'keydown', handleHotkey, false );

})();
