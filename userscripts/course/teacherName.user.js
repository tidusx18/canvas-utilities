// ==UserScript==
// @name         Canvas UI - Course: Show Teacher Name
// @namespace    https://github.com/redice44
// @version      0.0.1
// @description  Displays teacher name on course list
// @author       Matt Thomson
// @match        https://fiu.instructure.com/courses
// @run-at       document-idle
// ==/UserScript==

(function() {

  const host = window.location.host;

  // CSS IDs of the tables to add teachers to.
  const courseTables = [
    'my_courses_table',
    'past_enrollments_table',
    'future_enrollments_table'
  ];

  // Array of IDs (numbers) to filter. Useful for filtering test accounts.
  const teacherIdFilters = [];

  // Enrollment ID(s) for the teacher role.
  const teacherEnrollmentId = '6';

  main();

  function main() {

    const updateTable = table => {

      buildHeader( table );
      addTeachers( table );

    };

    courseTables.forEach( updateTable );

  }

  function buildHeader( tableId ) {

    const heading = document.querySelector( `#${ tableId } > thead > tr` );
    const teacherHeading = document.createElement( 'th' );
    teacherHeading.appendChild( document.createTextNode( 'Teacher' ) );
    teacherHeading.style.width = '40%';
    heading.insertBefore( teacherHeading, heading.querySelector( 'th:nth-child(3)' ) );

  }

  function getCourseId( course ) {

    const courseLink = course.querySelector( 'td:nth-child(2) a' );

    if ( !courseLink ) {

      return null;

    }

    const hrefSplit = courseLink.href.split( '/' );
    return hrefSplit[ hrefSplit.length - 1 ];

  }

  function addTeacher ( course, teacher ) {

    const td = document.createElement( 'td' );
    td.appendChild( document.createTextNode( teacher ) );
    course.insertBefore(
      td,
      course.querySelector( 'td:nth-child(3)' )
    );

  }

  function addTeachers( tableId ) {

    const activeCourses = Array.prototype.slice.call( document.querySelectorAll( `#${ tableId } > tbody > tr` ) );
    const courseIds = activeCourses.map( getCourseId );

    for( let i = 0; i < activeCourses.length; i++ ) {

      if ( courseIds[ i ] ) {

        getTeacher( courseIds[ i ], teacher => {

          addTeacher( activeCourses[ i ], teacher );

        } );

      } else {

        addTeacher( activeCourses[ i ], '' );

      }

    }

  }

  function getTeacher( courseId, cb ) {

    const method = 'GET';
    const csrfToken = decodeURIComponent( getCSRFToken() );
    const url = `https://${ host }/api/v1/courses/${ courseId }/users?enrollment_role_id=${ teacherEnrollmentId }`;
    const request = buildRequest( method, url, csrfToken );
    request.onreadystatechange = () => {

      if ( request.readyState == XMLHttpRequest.DONE && request.status == 200 ) {

        const names = JSON.parse( request.responseText )
          .filter( d => !teacherIdFilters.includes( parseInt( d.id ) ) )
          .map( d => d.name );
        cb( names.join( ', ' ) );

      }

    }

    request.send();

  }

  function buildRequest( _method, queryURL, csrfToken ) {

    const request = new XMLHttpRequest();

    request.open( _method, queryURL, true );
    request.setRequestHeader( 'Accept', 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01' );
    request.setRequestHeader( 'Accept-Language', 'en-US,en;q=0.9' );
    request.setRequestHeader( 'Cache-Control', 'no-cache' );
    request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' );
    request.setRequestHeader( 'Pragma', 'no-cache' );
    request.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
    request.setRequestHeader( 'X-CSRF-Token', csrfToken );

    return request;

  }

  function getCSRFToken() {

    const cookies = document.cookie.split( '; ');

    for ( let i = 0; i < cookies.length; i++ ) {

        if ( cookies[ i ].includes( '_csrf_token' ) ) {

            return cookies[ i ].split( '=' )[ 1 ];

        }

    }

    return null;

  }

})();
