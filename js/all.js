$(document).ready(() => {
  $endPosition = false;
  $cell = document.querySelectorAll(".cell-drag");
  $logo = document.querySelectorAll(".logo");
  $navbar = document.getElementById("navbar");
  $logoSmaller = false;

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
    console.log(ui.position.top);
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
        document.querySelector('#interaction-two').scrollIntoView({
          behavior: 'smooth'
        });
      }, 200);
    }
  })

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

$(window).scroll(() => {
  if ($logo.length == 1) {
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
})

$.fn.isInViewport = function () {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).keydown((e) => {
  if (e.which === 13 && $("#interaction-start").isInViewport()) {
    console.log(e.which);
  }
});
