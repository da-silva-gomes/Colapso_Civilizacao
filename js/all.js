let heart1 = false;
let heart2 = false;
let heart3 = false;
let heart4 = false;
let heartTimer = null;

$(document).ready(() => {
  $cell = document.querySelectorAll(".cell-drag");
  $logo = document.querySelectorAll(".logo");
  $navbar = document.getElementById("navbar");
  $boatHover = document.getElementById("boat-hover");
  $endPosition = false;
  $logoSmaller = false;
  $fiveTigers = false;

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
        $('#interaction-two')[0].style.visibility = 'hidden';
        document.querySelector('#interaction-two').scrollIntoView({
          behavior: 'smooth'
        });
      }, 200);
      // hide timeout
      setTimeout(() => {
        $('#interaction-two')[0].style.visibility = 'visible';
        $('#interaction-one')[0].style.display = 'none';
      }, 1000);
    }
  });

  $('.heart-1').click(() => {
    $('.heart-1').attr('src', 'media/interactions/hearts-left-clicked.svg');
    return heart1 = true;
  });
  $('.heart-2').click(() => {
    $('.heart-2').attr('src', 'media/interactions/hearts-left-clicked.svg');
    return heart2 = true;
  });
  $('.heart-3').click(() => {
    $('.heart-3').attr('src', 'media/interactions/hearts-right-clicked.svg');
    return heart3 = true;
  });
  $('.heart-4').click(() => {
    $('.heart-4').attr('src', 'media/interactions/hearts-right-clicked.svg');
    return heart4 = true;
  });

  heartTimer = setInterval(checkHearts, 1000);

  function checkHearts() {
    if (heart1 && heart2 && heart3 && heart4) {
      clearInterval(heartTimer);
      setTimeout(() => {
        $('#interaction-six')[0].style.display = 'flex';
        document.querySelector('#interaction-six').scrollIntoView({
          behavior: 'smooth'
        });
        heart1 = false;
        heart2 = false;
        heart3 = false;
        heart4 = false;
        $('.heart-1').attr('src', 'media/interactions/hearts-left.svg');
        $('.heart-2').attr('src', 'media/interactions/hearts-left.svg');
        $('.heart-3').attr('src', 'media/interactions/hearts-right.svg');
        $('.heart-4').attr('src', 'media/interactions/hearts-right.svg');
      }, 1200);
      // hide timeout
      setTimeout(() => {
        $('#interaction-five')[0].style.display = 'none';
      }, 1500);
    }
  }

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

  // Condition to return to previous section [Between Interaction-two and Interaction-three]
  $("#return-to-two").click(() => {
    // show timeout
    setTimeout(() => {
      $('#interaction-two')[0].style.display = 'flex';
      document.querySelector('#interaction-three').scrollIntoView({
        behavior: 'instant'
      });
      document.querySelector('#interaction-two').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-three')[0].style.display = 'none';
      $boatHover.classList.remove('no-hover');
      $boatHover.style.left = "0px";
      $($boatHover).attr('src', 'media/interactions/barco.svg');
    }, 1000);
  });

  // Condition to return to previous section [Between Interaction-three and Interaction-four]
  $("#return-to-three").click(() => {
    // show timeout
    setTimeout(() => {
      $('#interaction-three')[0].style.display = 'flex';
      document.querySelector('#interaction-four').scrollIntoView({
        behavior: 'instant'
      });
      document.querySelector('#interaction-three').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-four')[0].style.display = 'none';
    }, 1000);
    runScrollMagic(false);
  });

  // Condition to return to previous section [Between Interaction-four and Interaction-five]
  $("#return-to-four").click(() => {
    // show timeout
    setTimeout(() => {
      $('#interaction-four')[0].style.display = 'flex';
      document.querySelector('#interaction-five').scrollIntoView({
        behavior: 'instant'
      });
      document.querySelector('#interaction-four').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-five')[0].style.display = 'none';
    }, 1000);
    runScrollMagic(true);
  });

  // Condition to return to previous section [Between Interaction-five and Interaction-six]
  $("#return-to-five").click(() => {
    // show timeout
    setTimeout(() => {
      $('#interaction-five')[0].style.display = 'flex';
      document.querySelector('#interaction-six').scrollIntoView({
        behavior: 'instant'
      });
      document.querySelector('#interaction-five').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-six')[0].style.display = 'none';
      heartTimer = setInterval(checkHearts, 1000);
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

function mouseOut(outElement) {
  if ($(outElement).hasClass('heart-1') && !heart1) {
    $(outElement).attr('src', 'media/interactions/hearts-left.svg');
  } else if ($(outElement).hasClass('heart-1') && heart1) {
    $(outElement).attr('src', 'media/interactions/hearts-left-clicked.svg');
  }

  if ($(outElement).hasClass('heart-2') && !heart2) {
    $(outElement).attr('src', 'media/interactions/hearts-left.svg');
  } else if ($(outElement).hasClass('heart-2') && heart2) {
    $(outElement).attr('src', 'media/interactions/hearts-left-clicked.svg');
  }

  if ($(outElement).hasClass('heart-3') && !heart3) {
    $(outElement).attr('src', 'media/interactions/hearts-right.svg');
  } else if ($(outElement).hasClass('heart-3') && heart3) {
    $(outElement).attr('src', 'media/interactions/hearts-right-clicked.svg');
  }

  if ($(outElement).hasClass('heart-4') && !heart4) {
    $(outElement).attr('src', 'media/interactions/hearts-right.svg');
  } else if ($(outElement).hasClass('heart-4') && heart4) {
    $(outElement).attr('src', 'media/interactions/hearts-right-clicked.svg');
  }
}

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
    if ($('.interaction-one')[0].style.display !== "flex" && $('.interaction-two')[0].style.display !== "flex" && $('.interaction-three')[0].style.display !== "flex" && $('.interaction-four')[0].style.display !== "flex" && $('.interaction-five')[0].style.display !== "flex" && $('.interaction-six')[0].style.display !== "flex") {
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

//function to open and close the sidebar menu that it's actually the about page
function highlightTiger(div) {
  div.classList.add('highlighted');
  $tigers = document.querySelectorAll(".highlighted");
  // Tiger interaction, condition to check if all tigers are highlighted
  if ($tigers.length === 5) {
    $fiveTigers = true;
  }

  if ($fiveTigers) {
    // show timeout
    setTimeout(() => {
      $('#interaction-three')[0].style.display = 'flex';
      document.querySelector('#interaction-three').scrollIntoView({
        behavior: 'smooth'
      });
    }, 2200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-two')[0].style.display = 'none';
      $tigers.forEach(tiger => {
        tiger.classList.remove('highlighted');
      });
      $fiveTigers = false;
    }, 3000);
  }
}

let boatTimer = null;

function moveBoat(image) {
  var newLeft = parseInt(image.style.left) + 10 + 'px';
  image.style.left = newLeft;

  return newLeft;
}

// condition for boat movement
function boatMovement(image, mouseIn) {
  if (mouseIn) {
    boatTimer = setInterval(() => {
      image.style.left = moveBoat(image);

      if (image.style.left >= '920px') {
        clearInterval(boatTimer);
        mouseIn = false;
        image.classList.add('no-hover');
        $(image).attr('src', 'media/interactions/barco-moved.svg');
        runScrollMagic(true);

        // show timeout
        setTimeout(() => {
          $('#interaction-four')[0].style.display = 'flex';
          $('#interaction-four')[0].style.visibility = 'hidden';
          document.querySelector('#interaction-four').scrollIntoView({
            behavior: 'smooth'
          });
        }, 200);
        // hide timeout
        setTimeout(() => {
          $('#interaction-four')[0].style.visibility = 'visible';
          $('#interaction-three')[0].style.display = 'none';
          $boatHover.classList.remove('no-hover');
          $boatHover.style.left = "0px";
          $($boatHover).attr('src', 'media/interactions/barco.svg');
        }, 1000);
      }
    }, 100);
  } else {
    clearInterval(boatTimer);
  }
}

let bottleTimer = null;
let controller = null;
let containerScene = null;

function runScrollMagic(interactionUp) {
  if (interactionUp) {
    $(function () {
      controller = new ScrollMagic.Controller();
      let hs = new TimelineMax();

      // animate panels
      hs.fromTo("#bottle-cap", 1,
        { marginBottom: 500 },
        { marginBottom: -32, ease: Circ.easeInOut }
      );

      containerScene = new ScrollMagic.Scene({
        triggerElement: '#bottle-wrapper',
        duration: '1000'
      })
        .setPin('#bottle-wrapper')
        .setClassToggle("#bottle-wrapper", "interacted")
        .setTween(hs)
        .triggerHook(0.3)
        .addTo(controller);
    });

    bottleTimer = setInterval(checkForChanges, 1500);
  } else {
    containerScene.destroy(true);
    containerScene = null;
    controller.destroy(true);
    controller = null;
  }
}

function checkForChanges() {
  if ($('.bottle-wrapper').hasClass('interacted')) {
    $('#bottle-cap').attr('src', 'media/interactions/bottle-cap-hover.svg');
    $('#bottle').attr('src', 'media/interactions/bottle-hover.svg');
  } else {
    // change interaction
    clearInterval(bottleTimer);
    setTimeout(() => {
      $('#interaction-five')[0].style.display = 'flex';
      $('#interaction-five')[0].style.visibility = 'hidden';
      document.querySelector('#interaction-five').scrollIntoView({
        behavior: 'smooth'
      });
    }, 200);
    // hide timeout
    setTimeout(() => {
      $('#interaction-five')[0].style.visibility = 'visible';
      $('#interaction-four')[0].style.display = 'none';
    }, 1000);
    runScrollMagic(false);
  }
}

let toggleSound = false;

function toggleObject() {
  toggleSound = !toggleSound;
  if(toggleSound) {
    var url = 'http://localhost:8000?action=soundOn';

    fetch(url, {
      mode:'no-cors',
    })

    $('.object-trigger')[0].innerHTML = 'Disable Sound';
  } else {
    var url = 'http://localhost:8000?action=soundOff';

    fetch(url, {
      mode:'no-cors',
    })

    $('.object-trigger')[0].innerHTML = 'Enable Sound';
  }
}
