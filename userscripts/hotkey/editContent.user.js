// ==UserScript==
// @name         Canvas UX - Hotkey: Edit Content
// @namespace    https://github.com/redice44
// @version      0.0.1
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @description  Hotkey: "ctrl/cmd + e" to edit content.

// @include      https://[YOUR URL]/courses/*/assignments/*
// @include      https://[YOUR URL]/courses/*/discussion_topics/*
// @include      https://[YOUR URL]/courses/*/pages/*
// @include      https://[YOUR URL]/courses/*/quizzes/*

// @exclude      https://[YOUR URL]/courses/*/assignments/*/edit*
// @exclude      https://[YOUR URL]/courses/*/discussion_topics/*/edit*
// @exclude      https://[YOUR URL]/courses/*/pages/*/edit*
// @exclude      https://[YOUR URL]/courses/*/quizzes/*/edit*

// @exclude      https://[YOUR URL]/courses/*/assignments/new
// @exclude      https://[YOUR URL]/courses/*/discussion_topics/new

// ==/UserScript==

(function() {

  function hotkeyAction( event ) {

    const selectors = [

      '#wiki_page_show a.edit-wiki', // Pages
      '#discussion-managebar a.edit-btn', // Discussions
      '#assignment_show a.edit_assignment_link', // Assignments
      '#quiz_show > .header-bar a.quiz-edit-button' // Quizzes

    ];

    event.preventDefault();

    const editBtnSelector = selectors.filter( s => document.querySelector( s ) )[ 0 ];

      try {

        document.querySelector( editBtnSelector ).click();

      } catch ( error ) {

        console.log( 'No matching Edit button found. If there should be, please report this error with the URL.' );

      }

  }

  function handleHotkey( event ) {

    const eKeyCode = 69;
    const ctrlKey = navigator.platform.match( 'Mac' ) ? event.metaKey : event.ctrlKey;

    if ( event.keyCode === eKeyCode && ctrlKey ) {

      hotkeyAction( event );

    }

  }

  document.addEventListener( 'keydown', handleHotkey, false );

} )();
