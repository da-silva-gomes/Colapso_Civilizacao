$(document).ready(() => {
  $endPosition = false;
  $cell = document.querySelectorAll(".cell-drag");
  console.log($cell.length);

  if ($cell.length > 0) {
    $(".cell-drag").draggable({
      axis: "y",
      cursor: "grab",
      containment: "parent"
    });
  }

  $(".cell-drag").on('drag', (event, ui) => {
    console.log(ui.position.top);
    if(ui.position.top < 0) {
      $(".cell-drag").draggable('disabled');
    }
    if(ui.position.top >= 150) {
      $endPosition = true;
    } else {
      $endPosition = false;
    }

    //script to move to next section
  })
});
