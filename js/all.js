$(document).ready(() => {
  $endPosition = false;
  $cell = document.querySelectorAll(".cell-drag");
  $logo = document.querySelectorAll(".logo");
  $navbar = document.getElementById("navbar");
  $logoSmaller = false;

  // hover interaction with cell [interaction-one]
  $(".cell-drag").hover(() => {
    $("#interaction-hover")[0].classList.toggle("displayed");
    $("#drag-end")[0].classList.toggle("displayed");

    // Playing scream audio on hover
    const $audioScream = $("#scream-player");
    $audioScream[0].volume = 0.2;
    $audioScream[0].play();
  })

  // Setting the cell as a draggable element [interaction-one]
  if ($cell.length > 0) {
    $(".cell-drag").draggable({
      axis: "y",
      cursor: "grab",
      containment: "parent",
      scroll: false,
      revert: true
    });
  }

  $(".cell-drag").on('drag', (event, ui) => {
    // Disable draggable capacity if the user tries to go on opposite direction
    if (ui.position.top < 0) {
      $(".cell-drag").draggable('disabled');
    }

    // Checking if the drag movement as reach it's maximum
    if (ui.position.top >= 250) {
      $endPosition = true;
    } else {
      $endPosition = false;
    }

    // Condition to check if the drag was completed
    // if so, the next section is presented, and eveyrthing above is hidden
    if ($endPosition === true) {
      // show timeout
      setTimeout(() => {
        $('#interaction-two')[0].style.display = 'flex';
        document.querySelector('#interaction-two').scrollIntoView({
          behavior: 'smooth'
        });
      }, 200);
      // hide timeout
      setTimeout(() => {
        $('#interaction-one')[0].style.display = 'none';
      }, 1000);
    }
  });

  // Condition to return to previous section [Between Interaction-one and Interaction-two]
  $("#return-to-one").click(() => {
    // show timeout
    setTimeout(() => {
      $('#interaction-one')[0].style.display = 'flex';
      document.querySelector('#interaction-two').scrollIntoView({
        behavior: 'instant'
      });
      document.querySelector('#interaction-one').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-two')[0].style.display = 'none';
    }, 1000);
  });

  // Condition to apply a smooth scroll to Instructions seciton
  $("#chevron-down").click(() => {
    if ($logo.length == 1) {
      $logo[0].classList.add("adjust-position");
      $logoSmaller = true;
    }
    document.querySelector('#instructions').scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Function to check if an element its visible
$.fn.isInViewport = function () {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

// Condition to check if a key is being pressed
$(document).keydown((e) => {
  // Condition to check if ENTER key it's pressed
  // Every key as it's own id
  if (e.which === 13 && $("#interaction-start").isInViewport()) {
    $('#interaction-one')[0].style.display = 'flex';

    // Condition to show first interaction and hide initial sections
    if ($('.interaction-one')[0].style.display === "flex") {
      $('#homepage')[0].style.display = 'none';
      $('#about')[0].style.display = 'none';
      $('#instructions')[0].style.display = 'none';
      $logoSmaller = true;
      $logo[0].classList.add("adjust-position");
      $navbar.classList.add("adjust-size");
    }

    document.querySelector('#interaction-one').scrollIntoView({
      behavior: 'smooth'
    });

    // play audio after starting interactions
    const $audio = $("#bg-player");
    $audio[0].volume = 0.2;
    $audio[0].play();
  }
});

// Condition to resize logo according to scroll position
// Necessary to add a condition to every interaction
$(window).scroll(() => {
  if ($logo.length == 1) {
    if ($('.interaction-one')[0].style.display !== "flex" && $('.interaction-two')[0].style.display !== "flex") {
      if ($(this).scrollTop() > 400) {
        $logo[0].classList.add("adjust-position");
        $navbar.classList.add("adjust-size");
        $logoSmaller = false;
      }
      if ($(this).scrollTop() < 400 && !$logoSmaller) {
        $logo[0].classList.remove("adjust-position");
        $navbar.classList.remove("adjust-size");
      }
    }
  }
})

//function to open and close the sidebar menu that it's actually the about page
function toggleSobre() {
  $('.about')[0].classList.toggle("opened");
  $('body')[0].style.overflow = $('body')[0].style.overflow === 'hidden' ? '' : 'hidden';
}
