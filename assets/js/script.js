$(document).ready(function () {
  function updateTime() {
    var today = dayjs();
    $("#currentDay").text(today.format("dddd, MMMM D YYYY, h:mm:ss a"));
    // Current time in 24-hour format
    var now = parseInt(dayjs().format("H"));

    $(".time-block").each(function () {
      var $el = $(this);
      $el.removeClass("future past present");
      // Extracts the time number from the ID
      var blockHour = parseInt($el.attr("id").split("-")[1]);
      if (now > blockHour) {
        $el.addClass("past");
      } else if (now === blockHour) {
        $el.addClass("present");
      } else {
        $el.addClass("future");
      }
    });
  }

    // Saved localStorage
  function renderLastRegistered() {
    $(".time-block").each(function () {
      var $el = $(this);
      var hour = $el.attr("id").split("-")[1];
      $el.find("textarea").val(localStorage.getItem("time block " + hour));
    });
  }
  
  $(".saveBtn").click(function (event) {
    event.preventDefault();
    var $btnClicked = $(this);
    var $targetText = $btnClicked.siblings("textarea");
    var targetTimeBlock = $btnClicked
      .closest(".time-block")
      .attr("id")
      .split("-")[1];
    localStorage.setItem("time block " + targetTimeBlock, $targetText.val());

    // Show modal
    $("#modalSave").css("display", "block");
    // Hide modal automatically after 3 seconds
    setTimeout(function () {
      $("#modalSave").css("display", "none");
    }, 2000);
  });

  // Close the modal if the user clicks out of it
  $(window).click(function (event) {
    if ($(event.target).is("#modalSave")) {
      $("#modalSave").css("display", "none");
    }
  });

  renderLastRegistered();
  updateTime();
  // Updates the time every second
  setInterval(updateTime, 1000);
});
