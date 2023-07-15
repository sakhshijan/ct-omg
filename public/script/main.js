const DATE_PICKER_SHOW_ITEMS = 5;
$(document).ready(function () {
  registerChangeDateAndTime();
  datePickerComponent();
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

function datePickerComponent() {
  // moment.from('1402/12/04', 'fa', 'YYYY/MM/DD').jDaysInMonth()
  (function dateInput() {
    const [year, month, day] = moment()
      .locale("fa")
      .format("YYYY/M/D")
      .split("/")
      .map(Number);
    updateValue({ day, year, month });
    inputDays(31, day);
    inputMonths(month);
    inputYears(year);
  })();

  function inputDays(totalDays, init) {
    const days = $(".date-input-days");
    const config = {
      direction: "vertical",
      loop: true,
      slidesPerView: DATE_PICKER_SHOW_ITEMS,
      grabCursor: true,
      centeredSlides: true,
      on: {
        afterInit: function () {
          if (init) this.slideTo(DATE_PICKER_SHOW_ITEMS + init - 1);
        },
        activeIndexChange: function () {
          setTimeout(() => {
            const index = days
              .find(".swiper-slide-active")
              .attr("data-swiper-slide-index");
            updateValue({ day: +index + 1 });
          }, 0);
        },
      },
    };
    days.empty();
    Array.from(new Array(totalDays)).forEach((_, index) =>
      days.append(`<li
                  class="swiper-slide date-input flex items-center justify-center text-2xl font-semibold"
                  data-value="${index + 1}"
                >
                  ${index + 1}
                </li>`)
    );
    const swiper = new Swiper(".days", config);
  }

  function inputMonths(init) {
    const _months = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const months = $(".date-input-months");
    const config = {
      direction: "vertical",
      loop: true,
      slidesPerView: DATE_PICKER_SHOW_ITEMS,
      grabCursor: true,
      centeredSlides: true,
      on: {
        afterInit: function () {
          if (init) this.slideTo(DATE_PICKER_SHOW_ITEMS + init - 1);
        },
        activeIndexChange: function () {
          setTimeout(() => {
            const index = months
              .find(".swiper-slide-active")
              .attr("data-swiper-slide-index");
            updateValue({ month: +index + 1 });
          }, 0);
        },
      },
    };
    months.empty();
    _months.map((name, index) => {
      months.append(
        `<li class="swiper-slide date-input flex items-center justify-center text-2xl font-semibold" data-value="${
          index + 1
        }">${name}</li>`
      );
    });

    const swiper = new Swiper(".months", config);
  }

  function inputYears(init) {
    const show = 8;
    const from = init - 3;
    const days = $(".date-input-years");
    const years = Array.from(new Array(show)).map(
      (_, index) => from + index + 1
    );
    const config = {
      direction: "vertical",
      slidesPerView: DATE_PICKER_SHOW_ITEMS,
      grabCursor: true,
      centeredSlides: true,
      on: {
        afterInit: function () {
          if (init) this.slideTo(DATE_PICKER_SHOW_ITEMS + (from - init));
        },
        activeIndexChange: function () {
          if (years[this.activeIndex] < init)
            this.slideTo(DATE_PICKER_SHOW_ITEMS + (from - init));
          updateValue({ year: years[this.activeIndex] });
        },
      },
    };
    days.empty();
    years.forEach((v) =>
      days.append(
        `<li class="swiper-slide date-input flex items-center justify-center text-2xl font-semibold">${v}</li>`
      )
    );
    const swiper = new Swiper(".years", config);
  }

  function updateValue(
    { day, month, year } = { day: undefined, month: undefined, year: undefined }
  ) {
    const input = $("[data-date-input]");
    const oldValue = input.val().split("/");
    if (oldValue.length !== 3) {
      input.val(`${year}/${month}/${day}`);
    } else {
      const value = [year, month, day].map((v, index) => v || oldValue[index]);
      input.val(value.join("/"));
      if (oldValue[0] !== value[0] || oldValue[1] !== value[1]) {
        const days = moment
          .from(input.val().split("/"), "fa", "YYYY/MM/DD")
          .jDaysInMonth();
        inputDays(days);
      }
    }
  }
}
