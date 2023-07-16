const DATE_PICKER_SHOW_ITEMS = 5;
const NUMBER_OF_YEARS = 8;

$(document).ready(function () {
  registerChangeDateAndTimeButton();
  Step1();
});

function registerChangeDateAndTimeButton() {
  const triggerDeliveryType = $("[data-delivery-type-trigger]");
  const deliveryBox = $("[data-delivery-box]");
  const selectedDateTime = $("#selected-date-time");
  const dialogTrigger = $("[data-date-time-trigger]");
  const dialogBox = $("[data-date-time-box]");
  const nextBtn = dialogBox.find("[data-next-btn]");
  const timeInput = $('input[name="delivery_time"]');

  triggerDeliveryType.click(function () {});

  timeInput.change(function () {
    nextBtn.attr("disabled", false);
  });
  dialogTrigger.click(function () {
    dialogBox.toggleClass("show step-1");
  });
  nextBtn.click(function () {
    if (dialogBox.hasClass("step-2")) {
      dialogBox.removeClass("show step-2");
      if (selectedDateTime.hasClass("hidden"))
        selectedDateTime.toggleClass("hidden flex");
      if (nextBtn.length > 0) updateLabel();
    } else {
      dialogBox.toggleClass("step-1 step-2");
    }
  });
  if (nextBtn.length > 0) datePickerComponent();

  function updateLabel() {
    const timeInput = $('input[name="delivery_time"]:checked');
    const fullDate = $("[data-date-input]");
    const date = $("[data-full-date]");
    const dayName = $("[data-day-name]");
    const time = $("[data-time]");
    time.text(timeInput.val());
    date.text(fullDate.val());
    const day = moment
      .from(fullDate.val(), "fa", "YYYY/MM/DD")
      .locale("fa")
      .format("dddd");
    dayName.text(day);
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
      inputYears(year);
      inputMonths(month);
    })();

    function inputDays(totalDays, init) {
      const days = $(".date-input-days");
      const config = {
        direction: "vertical",
        loop: true,
        slidesPerView: DATE_PICKER_SHOW_ITEMS,
        grabCursor: true,
        centeredSlides: true,
        rtl: false,
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
        rtl: false,

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
          `<li class="swiper-slide date-input month-input-text flex items-center pb-4 justify-center text-2xl font-semibold" data-value="${
            index + 1
          }">${name}</li>`
        );
      });

      const swiper = new Swiper(".months", config);
    }

    function inputYears(init) {
      const from = init - 3;
      const days = $(".date-input-years");
      const years = Array.from(new Array(NUMBER_OF_YEARS)).map(
        (_, index) => from + index + 1
      );
      const config = {
        direction: "vertical",
        slidesPerView: DATE_PICKER_SHOW_ITEMS,
        grabCursor: true,
        centeredSlides: true,
        rtl: false,
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
      { day, month, year } = {
        day: undefined,
        month: undefined,
        year: undefined,
      }
    ) {
      const input = $("[data-date-input]");
      const oldValue = input.val().split("/");
      if (oldValue.length !== 3) {
        input.val(`${year}/${month}/${day}`);
      } else {
        const value = [year, month, day].map(
          (v, index) => v || oldValue[index]
        );
        input.val(value.join("/"));
        if (oldValue[0] !== value[0] || oldValue[1] !== value[1]) {
          const days = moment
            .from(input.val(), "fa", "YYYY/MM/DD")
            .jDaysInMonth();
          inputDays(days);
        }
      }
    }
  }
}

// Basket Page . Step 1
function Step1() {
  changeQty();
  let state = 1;
  const states = ["hidden-discount", "show-discount", "undo-discount"];

  const closeDiscountBtn = $("#close-discount");
  const discountButton = $("#discount-button");
  const discountInput = $("#discount-code-input");
  closeDiscountBtn.on("click", () => {
    closeDiscount();
  });
  discountButton.on("click", () => {
    const status = states[state++ % 3];
    switch (status) {
      case states[0]: {
        hiddenDiscount();
        break;
      }
      case states[1]: {
        showDiscount();
        break;
      }
      case states[2]: {
        removeDiscount();
        break;
      }
    }
  });
  //add success class to discount code input
  discountInput.on("input", onDiscountCodeChange);

  function onDiscountCodeChange(e) {
    const discountInput = $("#discount-code-input");
    const discountValue = $("#discount-value");
    const discountValueLabel = $("#discount-value .price");
    discountValueLabel.text(
      Math.round(Math.random() * 1000000).toLocaleString()
    );
    discountInput.removeClass("success");
    discountInput.removeClass("error");
    if (discountInput.val().length === 5) {
      discountValue.removeClass("hidden-discount");
      discountInput.addClass("success");
    } else if (discountInput.val().length > 5) {
      discountInput.addClass("error");
      discountValue.addClass("hidden-discount");
    } else {
      discountValue.addClass("hidden-discount");
    }
  }

  function closeDiscount() {
    const discountArea = $("#discount-area");
    const discountButton = $("#discount-button");
    state = 3;
    discountArea.addClass("hidden-discount");
    discountArea.removeClass("show-discount undo-discount");
    discountButton.text("حذف تخفیف");
  }

  function hiddenDiscount() {
    const discountButton = $("#discount-button");
    const discountArea = $("#discount-area");
    discountArea.addClass("hidden-discount");
    discountArea.removeClass("show-discount undo-discount");
    discountButton.text("از سی تی کلاب تخفیف بگیر");
  }

  function showDiscount() {
    const discountButton = $("#discount-button");
    const discountArea = $("#discount-area");

    discountArea.addClass(" show-discount");
    discountArea.removeClass("hidden-discount undo-discount");
    discountButton.text("تخفیف سی تی بن");
  }

  function removeDiscount() {
    const discountButton = $("#discount-button");
    const discountArea = $("#discount-area");
    discountArea.addClass("undo-discount");
    discountArea.removeClass("hidden-discount show-discount");
    discountButton.text("حذف تخفیف");
  }

  function changeQty() {
    const box = $("[data-qty-input]");

    const inputs = box.find("input");
    inputs.on("input-changed", function (value) {
      const _this = $(this);
      const id = _this.attr("id");
      const increaseBtn = box.find(`[data-input="${id}"][data-increase]`);
      const decreaseBtn = box.find(`[data-input="${id}"][data-decrease]`);
      if (+_this.val() >= +_this.attr("max")) {
        increaseBtn.attr("disabled", true);
      } else if (+_this.val() <= +_this.attr("min")) {
        decreaseBtn.attr("disabled", true);
      } else {
        increaseBtn.attr("disabled", false);
        decreaseBtn.attr("disabled", false);
      }
    });

    box.find("button:first-child").click(function () {
      const _this = $(this);
      const belongs = _this.attr("data-input");
      const input = box.find(`#${belongs}`);
      input.val(+input.val() + 1);
      input.trigger("input-changed", input.val());
    });
    box.find("button:last-child").click(function () {
      const _this = $(this);
      const belongs = _this.attr("data-input");
      const input = box.find(`#${belongs}`);
      input.val(+input.val() - 1);
      input.trigger("input-changed", input.val());
    });
  }
}
