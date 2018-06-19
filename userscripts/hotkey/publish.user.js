// ==UserScript==
// @name         Canvas UX - Hotkey: Publish
// @namespace    https://github.com/redice44
// @version      0.0.1
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @description  Hotkey: "ctrl/cmd + p" hotkey to publish content.

// @include      https://fiu.instructure.com/courses/*/assignments/*
// @include      https://fiu.instructure.com/courses/*/discussion_topics/*
// @include      https://fiu.instructure.com/courses/*/pages/*
// @include      https://fiu.instructure.com/courses/*/quizzes/*

// @exclude      https://fiu.instructure.com/courses/*/assignments/*/edit*
// @exclude      https://fiu.instructure.com/courses/*/discussion_topics/*/edit*
// @exclude      https://fiu.instructure.com/courses/*/pages/*/edit*
// @exclude      https://fiu.instructure.com/courses/*/quizzes/*/edit*

// @exclude      https://fiu.instructure.com/courses/*/assignments/new
// @exclude      https://fiu.instructure.com/courses/*/discussion_topics/new
// ==/UserScript==

(function() {

  function hotkeyAction( e ) {

    const selectors = [

      '#assignment_publish_button', // Assignments
      '#topic_publish_button', // Discussions
      '#wiki_page_show button.btn-publish', // Pages
      '#wiki_page_show button.btn-published', // Pages
      '#quiz-publish-link' // Quizzes

    ];

    e.preventDefault();

    const publishBtnSelector = selectors.filter( s => !!document.querySelector( s ) )[ 0 ];

      try {

        document.querySelector( publishBtnSelector ).click();

      } catch ( e ) {

        console.log( 'No matching Publish button found. If there should be, please report this error with the URL.' );

      }

  }

  function handleHotkey( e ) {

    const pKeyCode = 80;
    const ctrlKey = navigator.platform.match( 'Mac' ) ? e.metaKey : e.ctrlKey;

    if ( e.keyCode === pKeyCode && ctrlKey ) {

      hotkeyAction( e );

    }

  }

  function tinyMCEHandler( e ) {

    if ( tinymce ) {

      const addHandler = e => {

        console.log( `TinyMCE Editor Added with ID: ${ e.editor.id }` );

        e.editor.on( 'keydown', handleHotkey );

      };

      tinymce.on( 'AddEditor', addHandler );

    }

  }

  document.addEventListener( 'keydown', handleHotkey, false );
  window.addEventListener( 'load', tinyMCEHandler );

})();
