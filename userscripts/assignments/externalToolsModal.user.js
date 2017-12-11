// ==UserScript==
// @name         Canvas UX - Assignments: External Tool Modal
// @namespace    https://github.com/redice44
// @version      0.0.1
// @author       Matt Thomson <red.cataclysm@gmail.com>
// @description  Enlarges the find external tool modal.
// @include      https://[YOUR URL]/courses/*/assignments/*/edit*
// @include      https://[YOUR URL]/courses/*/assignments/new
// @run-at       document-idle
// ==/UserScript==

(function() {

  const findBtnEl = document.querySelector( '#assignment_external_tool_tag_attributes_url_find' );

  findBtnEl.addEventListener( 'click', () => {

    // Canvas needs to build the dom node first.
    setTimeout( resizeModal, 100 );

  } , false );

  function resizeModal() {

    const padding = 50;
    const contentHeight = window.innerHeight - padding * 2 - 220;
    const toolHeight = contentHeight - 100;
    const containerTop = window.scrollY + padding;
    const containerWidth = window.innerWidth - padding * 2;

    const contentEl = document.querySelector(' #select_context_content_dialog' );
    const containerEl = contentEl.parentElement;
    const toolContainerEl = contentEl.querySelector( 'ul' );

    contentEl.style.height = `${ contentHeight }px`;
    containerEl.style.width =  `${ containerWidth }px`;
    containerEl.style.left = `${ padding }px`;
    containerEl.style.top = `${ containerTop }px`;
    toolContainerEl.style.maxHeight = `${ toolHeight }px`;

  }

})();