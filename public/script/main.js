$(document).ready(function () {
  registerChangeDateAndTime();
});

function registerChangeDateAndTime() {
  let step = 1;
  const dialogTrigger = $("[data-date-time-trigger]");
  const dialogBox = $("[data-date-time-box]");
  const datePicker = dialogBox.find("[data-date-picker]");
  const timePicker = dialogBox.find("[data-time-picker]");
  const nextBtn = dialogBox.find("[data-next-btn]");
  dialogTrigger.click(function () {
    const _this = $(this);
    dialogBox.toggleClass("show");
  });
}
