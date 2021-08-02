// ES6 or Vanilla JavaScript
// helper function to place modal window as the first child
// of the #page node
var m = document.getElementById('modal_window'),
    p = document.getElementById('content');

function swap() {
  if (m !== null && p !== null) {
    p.parentNode.insertBefore(m, p);
  }
}

swap(); // modal window

(function () {
  'use strict'; // list out the vars

  var mOverlay = getId('modal_window'),
      mOpen = getId('modal_open'),
      mCreate = getId('modal_create'),
      mClose = getId('modal_close'),
      modal = getId('modal_holder'),
      emailField = getId('emailAddress'),
      allNodes = document.querySelectorAll("*"),
      modalOpen = false,
      lastFocus,
      i; // wrap all this and check the modal is on the page first

  if (mOverlay !== null) {
    // Let's open the modal
    function modalShow(event) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      lastFocus = document.activeElement;
      mOverlay.setAttribute('aria-hidden', 'false');
      modalOpen = true;
      modal.setAttribute('tabindex', '0');
      modal.forms[0].elements[0].focus();
      modal.focus();
      mOverlay.scrollTop(0);
      emailField.focus();
    } // binds to both the button click and the escape key to close the modal window
    // but only if modalOpen is set to true


    function modalClose(event) {
      if (modalOpen && (!event.keyCode || event.keyCode === 27)) {
        mOverlay.setAttribute('aria-hidden', 'true');
        modal.setAttribute('tabindex', '-1');
        event.preventDefault();
        modalOpen = false;
        lastFocus.focus();
      }
    } // Restrict focus to the modal window when it's open.
    // Tabbing will just loop through the whole modal.
    // Shift + Tab will allow backup to the top of the modal,
    // and then stop.


    function focusRestrict(event) {
      if (modalOpen && !modal.contains(event.target)) {
        event.stopPropagation();
        modal.focus();
      }
    } // Close modal window by clicking on the overlay


    mOverlay.addEventListener('click', function (e) {
      if (e.target == modal.parentNode) {
        modalClose(e);
      }
    }, false); // open modal by btn click/hit
    // mOpen.addEventListener('click', modalShow)

    mCreate.addEventListener('click', modalShow, false); // close modal by btn click/hit

    mClose.addEventListener('click', modalClose); // close modal by keydown, but only if modal is open

    document.addEventListener('keydown', modalClose); // restrict tab focus on elements only inside modal window

    for (i = 0; i < allNodes.length; i++) {
      allNodes.item(i).addEventListener('focus', focusRestrict);
    }
  } // Let's cut down on what we need to type to get an ID


  function getId(id) {
    return document.getElementById(id);
  }
})();

$(document).ready(function () {
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init(); // expand ID document image in ID checker

  $(".idcheck-image-expand-button").on("click", function (e) {
    e.preventDefault();
    $(e.target).closest(".nhsuk-grid-column-one-half").toggleClass("expanded");
    $(e.target).toggleClass("expanded");
  }); // expand ID document image in ID checker

  $(".idcheck-video-paired-button").on("click", function (e) {
    e.preventDefault();

    if ($(e.target).closest(".nhsuk-grid-column-one-half").hasClass('expanded')) {
      $(e.target).closest(".nhsuk-grid-column-one-half").toggleClass("expanded");
      $(e.target).closest(".idcheck-media").children('.idcheck-image-container').hide();
      $(e.target).text("Show ID");
    } else {
      $(e.target).closest(".nhsuk-grid-column-one-half").toggleClass("expanded");
      $(e.target).closest(".idcheck-media").children('.idcheck-image-container').show();
      $(e.target).text("Hide ID");
    }
  }); // change CTA of transcoded video when clicked

  $(".nhsuk-transcodedvideo-link__text").on("click", function (e) {
    e.preventDefault();
    var currentText = $(e.target).text();

    if (currentText == 'Show the original video') {
      $(e.target).text("Show the transcoded video");
    } else {
      $(e.target).text("Show the original video");
    }
  });
}); // remove table rows 
//  jQuery('#master').on('click', function(e) {
// 	if($(this).is(':checked',true))  
// 	{
// 		$(".sub_chk").prop('checked', true);  
// 	}  
// 	else  
// 	{  
// 		$(".sub_chk").prop('checked',false);  
// 	}  
// });
// jQuery('.delete_all').on('click', function(e) { 
//   var allVals = [];  
//       $(".sub_chk:checked").each(function() {  
//         allVals.push($(this).attr('data-id'));
//       });  
//       //alert(allVals.length); return false;  
//       if(allVals.length <=0)  
//       {  
//         alert("Please select row.");  
//       }  
//       else {  
//         //$("#loading").show(); 
//         WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";  
//         var check = confirm(WRN_PROFILE_DELETE);  
//         if(check == true){  
//           //for server side
//           /*
//           var join_selected_values = allVals.join(","); 
//           $.ajax({   
//             type: "POST",  
//             url: "delete.php",  
//             cache:false,  
//             data: 'ids='+join_selected_values,  
//             success: function(response)  
//             {   
//               $("#loading").hide();  
//               $("#msgdiv").html(response);
//               //referesh table
//             }   
//           });*/
//                 //for client side
//           $.each(allVals, function( index, value ) {
//             $('table tr').filter("[data-row-id='" + value + "']").remove();
//           });
//         }  
//       }  
//     });
//     jQuery('.remove-row').on('click', function(e) {
//       WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";  
//         var check = confirm(WRN_PROFILE_DELETE);  
//         if(check == true){
//           $('table tr').filter("[data-row-id='" + $(this).attr('data-id') + "']").remove();
//         }
//     });

$(".deletebutton").on('click', function () {
  var checked = jQuery('input:checkbox:checked').map(function () {
    return this.value;
  }).get();
  jQuery('input:checkbox:checked').parents("tr").remove();
});