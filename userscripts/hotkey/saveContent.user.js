// ==UserScript==
// @name         Canvas UX - Hotkey: Save
// @namespace    https://github.com/redice44
// @version      0.0.1
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @description  Hotkey: "ctrl/cmd + s" to save content.

// @include      https://[YOUR URL]/courses/*/assignments/*/edit*
// @include      https://[YOUR URL]/courses/*/discussion_topics/*/edit*
// @include      https://[YOUR URL]/courses/*/pages/*/edit*
// @include      https://[YOUR URL]/courses/*/quizzes/*/edit*

// @include      https://[YOUR URL]/courses/*/assignments/new
// @include      https://[YOUR URL]/courses/*/discussion_topics/new
// ==/UserScript==

(function() {

  function submitPage( e ) {

    const publishSelectors = [

      '#edit_assignment_form button.save_and_publish', // Assignments
      '#edit_discussion_form_buttons > button.save_and_publish', // Discussions
      '#content .form-actions button.save_and_publish', // Pages
      '#quiz_edit_actions button.save_and_publish' // Quizzes

    ];

    const submitSelectors = [

      '#edit_assignment_form > .form-actions > button[type="submit"]', // Assignments
      '#edit_discussion_form_buttons > button[type="submit"]', // Discussions
      '#content .form-actions button.submit', // Pages
      '#quiz_edit_actions button.save_quiz_button' // Quizzes

    ];

    const sKeyCode = 83;
    const ctrlKey = navigator.platform.match( 'Mac' ) ? e.metaKey : e.ctrlKey;

    if ( e.keyCode === sKeyCode && ctrlKey ) {

      e.preventDefault();

      if ( e.shiftKey ) {

        for ( let selector of publishSelectors ) {

          let selected = document.querySelector( selector );

          if ( selected ) {

            selected.click();

            return;

          }

        }

        console.log( 'No matching Submit and Publish button found. If there should be, please report this error with the URL.' );

      } else {

        for ( let selector of submitSelectors ) {

          let selected = document.querySelector( selector );

          if ( selected ) {

            selected.click();

            return;

          }

        }

        console.log( 'No matching Submit button found. If there should be, please report this error with the URL.' );

      }

    }

  }

  function tinyMCEHandler( e ) {

    if ( tinymce ) {

      const addHandler = e => {

        console.log( `TinyMCE Editor Added with ID: ${ e.editor.id }` );

        e.editor.on( 'keydown', submitPage );

      };

      tinymce.on( 'AddEditor', addHandler );

    }

  }

  document.addEventListener( 'keydown', submitPage, false);
  window.addEventListener('load', tinyMCEHandler );

})();
