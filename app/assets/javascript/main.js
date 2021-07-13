// ES6 or Vanilla JavaScript

// helper function to place modal window as the first child
// of the #page node
var m = document.getElementById('modal_window'),
  p = document.getElementById('content')

function swap () {
  if (m !== null && p !== null) {
    p.parentNode.insertBefore(m, p)
  }
}

swap();

// modal window
(function() {

  'use strict'

  // list out the vars
  var mOverlay = getId('modal_window'),
    mOpen = getId('modal_open'),
    mCreate = getId('modal_create'),
    mClose = getId('modal_close'),
    modal = getId('modal_holder'),
    emailField = getId('emailAddress'),
    allNodes = document.querySelectorAll("*"),
    modalOpen = false,
    lastFocus,
    i

  // wrap all this and check the modal is on the page first
  if (mOverlay !== null) {
    // Let's open the modal
    function modalShow ( event ) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false
      lastFocus = document.activeElement
      mOverlay.setAttribute('aria-hidden', 'false')
      modalOpen = true
      modal.setAttribute('tabindex', '0')
      modal.forms[0].elements[0].focus()
      modal.focus()
      mOverlay.scrollTop(0)
      emailField.focus()
    }

    // binds to both the button click and the escape key to close the modal window
    // but only if modalOpen is set to true
    function modalClose ( event ) {
      if (modalOpen && ( !event.keyCode || event.keyCode === 27 ) ) {
        mOverlay.setAttribute('aria-hidden', 'true')
        modal.setAttribute('tabindex', '-1')
        event.preventDefault()
        modalOpen = false
        lastFocus.focus()
      }
    }

    // Restrict focus to the modal window when it's open.
    // Tabbing will just loop through the whole modal.
    // Shift + Tab will allow backup to the top of the modal,
    // and then stop.
    function focusRestrict ( event ) {
      if (modalOpen && !modal.contains( event.target ) ) {
        event.stopPropagation()
        modal.focus()
      }
    }

    // Close modal window by clicking on the overlay
    mOverlay.addEventListener('click', function( e ) {
      if (e.target == modal.parentNode) {
        modalClose( e )
      }
    }, false)

    // open modal by btn click/hit
    // mOpen.addEventListener('click', modalShow)
    mCreate.addEventListener('click', modalShow, false)
    // close modal by btn click/hit
    mClose.addEventListener('click', modalClose)

    // close modal by keydown, but only if modal is open
    document.addEventListener('keydown', modalClose)

    // restrict tab focus on elements only inside modal window
    for (i = 0; i < allNodes.length; i++) {
      allNodes.item(i).addEventListener('focus', focusRestrict)
    }
  }

  // Let's cut down on what we need to type to get an ID
  function getId ( id ) {
    return document.getElementById(id)
  }
})()

$(document).ready(function () {
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()


  // expand ID document image in ID checker
  $(".idcheck-image-expand-button").on("click", function(e) {
    e.preventDefault()
    $( e.target ).closest(".nhsuk-grid-column-one-half").toggleClass( "expanded" )
    $( e.target ).toggleClass( "expanded" )
  })

  // expand ID document image in ID checker
  $(".idcheck-video-paired-button").on("click", function(e) {
    e.preventDefault()

    if ($( e.target ).closest(".nhsuk-grid-column-one-half").hasClass('expanded')) {
      $( e.target ).closest(".nhsuk-grid-column-one-half").toggleClass( "expanded" )
      $( e.target ).closest(".idcheck-media").children('.idcheck-image-container').hide()
      $( e.target ).text( "Show ID" )
    } else {
      $( e.target ).closest(".nhsuk-grid-column-one-half").toggleClass( "expanded" )
      $( e.target ).closest(".idcheck-media").children('.idcheck-image-container').show()
      $( e.target ).text( "Hide ID" )
    }
  })

  // change CTA of transcoded video when clicked
  $(".nhsuk-transcodedvideo-link__text").on("click", function(e) {
    e.preventDefault()
    var currentText= $( e.target ).text()
    if (currentText== 'Show the original video'){
      $( e.target ).text( "Show the transcoded video" )
    }
    else {
      $( e.target ).text( "Show the original video" )
    }

  })


})

// Checkboxes JS
$(function () {
  $("body").addClass("js-enabled");
  $("thead input[type=checkbox]").focus(function () {
    $(this).closest(".block-label").addClass("focused");
          })
          $("thead input[type=checkbox]").focusout(function () {
              $(this).closest(".block-label").removeClass("focused");
          })
          $("input[type=checkbox]").focus(function () {
              $(this).closest("tr").addClass("focused");
          })
          $("input[type=checkbox]").blur(function () {
                  $(this).closest("tr").removeClass("focused");
              })
              /* Checkbox, set classes to apply styles */
          $("input[type=checkbox]").click(function () {
              if ($(this).closest("tr").hasClass("head")) return;
              if ($(this).is(":checked")) {
                  $(this).closest("tr").addClass("row-selected");
                  $(this).closest(".selection-button-checkbox").addClass('selected');
              }
              else {
                  $(this).closest("tr").removeClass("row-selected");
                  $(this).closest(".selection-button-checkbox").removeClass('selected');
              }
          });
          $("#toggleAll").click(function () {
              if ($(this).hasClass("all-selected")) {
                  $(this).removeClass("all-selected");
                  $("input[type=checkbox]").each(function () {
                      $(this).closest(".selection-button-checkbox").removeClass('selected');
                      $(this).closest("tr").removeClass("row-selected");
                      $(this).attr("checked", false);
                  })
              }
              else {
                  $(this).addClass("all-selected");
                  $("input[type=checkbox]").each(function () {
                      $(this).closest(".selection-button-checkbox").addClass('selected');
                      if ($(this).attr("id") != "toggleAll") $(this).closest("tr").addClass("row-selected");
                      $(this).attr("checked", true);
                  })
              }
          })
          $(".row-select tbody tr").click(function (e) {
              selectRowChange($(this));
          })
          $("input[type=checkbox]").keyup(function (e) {
              if (e.which == 13) boxPressed($(this));
          })

          function selectRowChange(row) {
              if (row.find("select").is(":focus")) return;
              if (row.hasClass("row-selected")) {
                  row.removeClass("row-selected");
                  row.find("input[type=checkbox]").first().attr("checked", false);
                  row.find(".selection-button-checkbox").first().removeClass("selected");
              }
              else {
                  row.addClass("row-selected");
                  row.find("input[type=checkbox]").first().attr("checked", true);
                  row.find(".selection-button-checkbox").first().addClass("selected");
              }
          }

          function boxPressed(cbox) {
              if (cbox.closest("select").is(":focus")) return;
              if (cbox.closest("tr").hasClass("row-selected")) {
                  cbox.closest("tr").removeClass("row-selected");
                  cbox.attr("checked", false);
                  cbox.closest("label").removeClass("selected");
              }
              else {
                  cbox.closest("tr").addClass("row-selected");
                  cbox.attr("checked", true);
                  cbox.closest("label").addClass("selected");
              }
          }
})
