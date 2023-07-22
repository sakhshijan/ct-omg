const DATE_PICKER_SHOW_ITEMS = 5;
const NUMBER_OF_YEARS = 8;
const slideTransition = "cubic-bezier(0.645, 0.045, 0.355, 1)";

$(document).ready(function () {
  Step1();
  Step2();
  SignInPage();
  indexPage();
  Step1AddUserProfile();
});

function Step2() {
  const triggerDeliveryType = $("[data-delivery-type-trigger]");
  // const deliveryBox = $("[data-delivery-box]");
  const selectedDateTime = $("#selected-date-time");
  const submitBtn = $("[data-submit]");
  const dialogTrigger = $("[data-date-time-trigger]");
  const dialogBox = $("[data-date-time-box]");
  const nextBtn = dialogBox.find("[data-next-btn]");
  const backBtn = dialogBox.find("[data-back-btn]");
  const timeInput = $('input[name="delivery_time"]');

  submitBtn.click(() => {
    const confirmDialog = $("#confirm-data");

    const time = $("[data-time]");
    const name = $("[data-name]");
    const phone = $("[data-phone]");
    const date = $("[data-full-date]");
    const m = moment.from(date.text(), "fa");
    const deliveryDate = m.locale("fa").format("D MMM yyyy");
    const day = $("[data-day-name]");
    const deliveryType = $('input[name="delivery_type"]');
    const descriptionLabel = $();
    const deliveryDateLabel = $("[data-delivery-date-label]");
    const deliveryTimeLabel = $("[data-delivery-time-label]");
    const phoneLabel = $("[data-phone-label]");
    const iconLabel = $();
    const deliveryNameLabel = $();
    const nameLabel = $("[data-receiver-name]");
    nameLabel.text(name.text());
    confirmDialog.addClass("show");
    phoneLabel.text(phone.text());
    deliveryDateLabel.text(deliveryDate);
    deliveryTimeLabel.text("ساعت " + time.text());
    const len = nameLabel.text().length;
    console.log(len);
  });

  triggerDeliveryType.click(function () {});

  timeInput.change(function () {
    nextBtn.attr("disabled", false);
  });
  dialogTrigger.click(function () {
    dialogBox.addClass("show step-1");
  });
  backBtn.click(function () {
    nextBtn.attr("disabled", false);
    if (dialogBox.hasClass("step-1")) {
      dialogBox.removeClass("show");
    } else {
      dialogBox.removeClass("step-2");
      dialogBox.addClass("step-1");
    }
  });
  nextBtn.click(function () {
    if (dialogBox.hasClass("step-2")) {
      dialogBox.removeClass("show step-2");
      if (selectedDateTime.hasClass("hidden"))
        selectedDateTime.toggleClass("hidden flex");
      if (nextBtn.length > 0) updateLabel();
    } else {
      $(this).attr("disabled", true);
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
        mousewheel: true,
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
        days.append(
          $("<li>", {
            class:
              "swiper-slide date-input flex items-center justify-center text-2xl font-semibold",
            attr: {
              "data-value": index + 1,
            },
            text: index + 1,
          })
        )
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
        mousewheel: true,
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
          $("<li>", {
            text: name,
            attr: { "data-value": index + 1 },
            class:
              "swiper-slide date-input month-input-text flex items-center pb-4 justify-center text-2xl font-semibold",
          })
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
        mousewheel: true,
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
          $("<li>", {
            text: v,
            class:
              "swiper-slide date-input flex items-center justify-center text-2xl font-semibold",
          })
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
      const oldValue = input.val().split("/").map(Number);
      if (oldValue.length !== 3) {
        input.val(`${year}/${month}/${day}`);
      } else {
        const value = [year, month, day].map((v, index) =>
          Number(v || oldValue[index])
        );
        input.val(value.join("/"));
        const m = moment.from(input.val(), "fa", "YYYY/MM/DD");
        if (+oldValue[0] !== +value[0] || +oldValue[1] !== +value[1]) {
          const oldDate = moment.from(oldValue.join("/"), "fa", "YYYY/MM/DD");
          if (oldDate.jDaysInMonth() !== m.jDaysInMonth())
            inputDays(m.jDaysInMonth());
        }
        if (!m.isAfter(Date.now())) {
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

  function onDiscountCodeChange() {
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
    inputs.on("input-changed", function () {
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

function SignInPage() {
  ConfirmCodeBox();
  StepOne();
  SignIn();
  CloseConfirmBox();
  StepTwoForm();
  $(".singin-carousel").owlCarousel({
    rtl: true,
    loop: true,
    items: 1,
    center: true,
    autoplayTimeout: 8000,
    autoplaySpeed: 1000,
    margin: 10,
    dots: false,
    autoplay: true,
    slideTransition,
  });

  function StepOne() {
    const userPhoneLabel = $(".phone-placeholder"); //any placeholder for user phone number used in page
    const phoneInput = $("#phone-input"); //phone text input
    const phoneIcon = $("#icon"); //icon box to apply animation
    const inputErrorMessageLabel = $("#input-message"); //error label
    const submitButton = $("#submit-form-btn"); //submit button for form 1
    phoneInput.on("input", inputChange); // on user changed phone number input

    function inputChange(e) {
      const { value } = e.target;
      e.target.value = value.replace(/\D/g, ""); //only accept numbers

      //show error when phone didnt start with 09 and length is less than 1
      if (!value.startsWith("09") && value.length > 1) {
        inputErrorMessageLabel.text("لطفا یک شماره معتبر وارد کنید!");
        inputErrorMessageLabel.removeClass("opacity-0"); // remove opacity class to make it visible
        phoneInput.addClass("error"); //add error class
        return; // return to prevent any other actions
      } else {
        phoneInput.removeClass("error");
        inputErrorMessageLabel.addClass("opacity-0");
      }

      if (value.length === 11) {
        userPhoneLabel.text(value);
        submitButton.removeClass("hidden-button"); //make submit button visible
      } else {
        submitButton.addClass("hidden-button");
      }

      //ui controls
      if (e.target.value.length > 0) {
        e.target.setAttribute("dir", "ltr");
        phoneInput.addClass("text-center tracking-[5px] font-medium");
        phoneInput.removeClass("pr-20 pl-10");
        phoneIcon.addClass("translate-x-14 opacity-0");
        return;
      }
      e.target.setAttribute("dir", "rtl");
      phoneInput.removeClass("text-center tracking-[5px] font-medium");
      phoneInput.addClass("pr-20 pl-10");
      phoneIcon.removeClass("translate-x-14 opacity-0");
    }
  }

  function ConfirmCodeBox() {
    const inputs = [...$(".ct-phone-input.confirmation-code")];
    inputs.forEach((input, index) => {
      input.addEventListener("keydown", (e) => {
        if (e.keyCode === 8 && e.target.value === "")
          inputs[Math.max(0, index - 1)].focus();
      });
      input.addEventListener("input", (e) => {
        const [first, ...rest] = e.target.value;
        e.target.value = first ?? "";
        const lastInputBox = index === inputs.length - 1;
        const didInsertContent = first !== undefined;
        if (didInsertContent && !lastInputBox) {
          inputs[index + 1].focus();
          inputs[index + 1].value = rest.join("");
          inputs[index + 1].dispatchEvent(new Event("input"));
        }
      });
    });
  }

  function SignIn() {
    const stepOneForm = $("#step-1");
    // const input = $("#phone-input");
    const finishedCheck = $("#correct-phone");

    stepOneForm.on("submit", (e) => {
      e.preventDefault();
      finishedCheck.removeClass("hidden");
      finishedCheck.addClass("flex");
      showCodeInput();
    });
  }

  function showCodeInput() {
    const confirmBox = $("#confirm-box");
    const stepOneForm = $("#step-1");

    confirmBox.removeClass("hidden-confirm-box");
    stepOneForm.addClass("hidden-phone-input");
  }

  function CloseConfirmBox() {
    const closeBtn = $("#close-confirm-code-window");
    closeBtn.on("click", closeCodeInput);
  }

  //submit confirmation code here
  function StepTwoForm() {
    const form = $("#step-2");
    const codeInputLabel = $("#code-input-label");
    const inputGroup = $("#confirmation-code-group");
    form.on("submit", (e) => {
      e.preventDefault();
      // const inputs = [...$("input[name='code']")];
      // const code = inputs.map((i) => i.value).join("");
      //remove success and error to make sure have default state
      inputGroup.removeClass("success");
      inputGroup.removeClass("error");
      inputGroup.addClass(Math.random() > 0.5 ? "success" : "error"); //add a random class
      if (inputGroup.hasClass("error")) {
        codeInputLabel.text("کد وارد شده صحیح نمیباشد!");
        codeInputLabel.addClass("opacity-100");
        codeInputLabel.removeClass("opacity-0");
      } else {
        codeInputLabel.text("");
        codeInputLabel.addClass("opacity-0");
        codeInputLabel.removeClass("opacity-100");
      }
    });
  }

  //get input code
  function getCode() {
    const inputs = [...$("input[name='code']")];
    return inputs.map((i) => i.value).join("");
  }

  function closeCodeInput() {
    const confirmBox = $("#confirm-box");
    const form1 = $("#step-1");
    confirmBox.addClass("hidden-confirm-box");
    form1.removeClass("hidden-phone-input");
  }
}

function indexPage() {
  $(".serial-carousel").owlCarousel({
    rtl: true,
    loop: true,
    items: 1.3,
    center: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    autoplay: true,
    slideTransition,
  });

  $(".brands-carousel").owlCarousel({
    rtl: true,
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    slideTransition: "linear",
    autoplay: true,
    responsiveClass: true,
    dots: false,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 3,
        margin: 5,
      },
      380: {
        items: 3.2,
        margin: 8,
      },
      450: {
        items: 4.2,
        margin: 10,
      },
      768: {
        items: 4.8,
        margin: 16,
      },
      1024: {
        items: 5,
        margin: 12,
      },
      1570: {
        items: 6,
        margin: 32,
      },
    },
  });
  $(".why-us-carousel").owlCarousel({
    rtl: true,
    loop: true,
    slideTransition,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    autoplay: true,
    responsive: {
      0: {
        items: 2,
      },
      380: {
        items: 2,
      },
      450: {
        items: 3,
      },
      768: {
        items: 4,
      },
      1024: {
        loop: false,
        items: 5,
      },
    },
  });

  $(".category-slider").owlCarousel({
    loop: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    slideTransition: "linear",
    autoplay: true,
    responsiveClass: true,
    dots: false,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 2.5,
      },
      380: {
        items: 2.5,
      },
      450: {
        items: 3,
      },
      768: {
        items: 4,
      },
      1024: {
        items: 5,
      },
      1570: {
        items: 6,
      },
    },
  });
  $(".main-carousel").owlCarousel({
    rtl: true,
    loop: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    slideTransition,
    autoplay: true,
    items: 1,
  });
}

function Step1AddUserProfile() {
  const userInputArea = $("#user-data-inputs");
  const submitBtn = userInputArea.find("[data-submit-lvl]");
  const closeBtn = userInputArea.find("[data-close-btn]");
  const cases = [caseOne, caseTwo, caseThree];
  let _step = 0;
  submitBtn.click(() => ChangeStep(++_step));
  closeBtn.click(() => ChangeStep(--_step));

  function CloseDialog() {
    userInputArea.removeClass("step-1 step-2 step-3");
    userInputArea.css("display", "none");
  }

  function ChangeStep(step) {
    if (step >= 3 || step < 0) {
      CloseDialog();
      return;
    }
    cases[step]();
  }

  function caseOne() {
    userInputArea.addClass("step-1");
    userInputArea.removeClass("step-2 step-3");
  }

  function caseTwo() {
    userInputArea.addClass("step-2");
    userInputArea.removeClass("step-1 step-3");
  }

  function caseThree() {
    userInputArea.addClass("step-3");
    userInputArea.removeClass("step-2 step-1");
  }
}

function JustNumber() {
  $(this).val($(this).val().replace(/\D/g, ""));
}
