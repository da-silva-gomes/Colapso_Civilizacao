$(document).ready(() => {
  $endPosition = false;
  $cell = document.querySelectorAll(".cell-drag");
  $logo = document.querySelectorAll(".logo");
  $navbar = document.getElementById("navbar");
  $logoSmaller = false;

  $(".cell-drag").hover(() => {
    $("#interaction-hover")[0].classList.toggle("displayed");
    $("#drag-end")[0].classList.toggle("displayed");

    const $audioScream = $("#scream-player");
    $audioScream[0].volume = 0.2;
    $audioScream[0].play();
  })

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
    if (ui.position.top < 0) {
      $(".cell-drag").draggable('disabled');
    }
    if (ui.position.top >= 250) {
      $endPosition = true;
    } else {
      $endPosition = false;
    }

    if ($endPosition === true) {
      setTimeout(() => {
        $('#interaction-two')[0].style.display = 'flex';
        document.querySelector('#interaction-two').scrollIntoView({
          behavior: 'smooth'
        });
      }, 200);
      setTimeout(() => {
        $('#interaction-one')[0].style.display = 'none';
      }, 1000);
    }
  });

  $("#return-to-one").click(() => {
    setTimeout(() => {
      $('#interaction-one')[0].style.display = 'flex';
      document.querySelector('#interaction-two').scrollIntoView({
        behavior: 'instant'
      });
      document.querySelector('#interaction-one').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    setTimeout(() => {
      $('#interaction-two')[0].style.display = 'none';
    }, 1000);
  });

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

$.fn.isInViewport = function () {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).keydown((e) => {
  if (e.which === 13 && $("#interaction-start").isInViewport()) {
    $('#interaction-one')[0].style.display = 'flex';

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

    const $audio = $("#bg-player");
    $audio[0].volume = 0.2;
    $audio[0].play();
  }
});

$(window).scroll(() => {
  if ($logo.length == 1) {
    if ($('.interaction-one')[0].style.display !== "flex") {
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
