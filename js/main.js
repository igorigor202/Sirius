window.onload = function () {
  "use strict";

  let body = document.getElementById('body');

  //menu open
  let toggleMenuBtns = document.querySelectorAll('.menu-toggle');
  toggleMenuBtns.forEach(element => {
    element.onclick = function () {
      let menuItem = document.getElementById('menu');
      menuItem.classList.toggle('_open');
      body.classList.toggle('_fixed');
    }
  });
  //menu open--end

  //filter-open
  let filterBtnOpen = document.querySelectorAll('.filter-toggle');
  const windowInnerWidth = window.innerWidth;
  if (windowInnerWidth < 769) {
    if (filterBtnOpen) {
      filterBtnOpen.forEach(element => {
        element.onclick = function () {

          let filterItem = document.getElementById('filter');
          filterItem.classList.toggle('_active');
          body.classList.toggle('_fixed');
        }
      });
    }
  }

  //filter-open--end


  // coollapse (Плавное открытие/скрытие блоков)

  let toggleFilterBtns = document.querySelectorAll('.filter__title-box');
  if (toggleFilterBtns.length > 0) {
    toggleFilterBtns.forEach(element => {
      element.onclick = function () {
        element.parentElement.classList.toggle('filter__item_open');
        const el = element.parentElement.querySelector(".collapse");
        const collapse = new ItcCollapse(el);
        collapse.toggle();
      }
    });
  }

  class ItcCollapse {
    constructor(target, duration = 450) {
      this._target = target;
      this._duration = duration;
    }
    show() {
      const el = this._target;
      if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
        return;
      }
      el.classList.remove('collapse');
      const height = el.offsetHeight;
      el.style.height = 0;
      el.style.overflow = 'hidden';
      el.style.transition = `height ${this._duration}ms ease`;
      el.classList.add('collapsing');
      el.offsetHeight;
      el.style.height = `${height}px`;
      window.setTimeout(() => {
        el.classList.remove('collapsing');
        el.classList.add('collapse');
        el.classList.add('collapse_show');
        el.style.height = '';
        el.style.transition = '';
        el.style.overflow = '';
      }, this._duration);
    }
    hide() {
      const el = this._target;
      if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
        return;
      }
      el.style.height = `${el.offsetHeight}px`;
      el.offsetHeight;
      el.style.height = 0;
      el.style.overflow = 'hidden';
      el.style.transition = `height ${this._duration}ms ease`;
      el.classList.remove('collapse');
      el.classList.remove('collapse_show');
      el.classList.add('collapsing');
      window.setTimeout(() => {
        el.classList.remove('collapsing');
        el.classList.add('collapse');
        el.style.height = '';
        el.style.transition = '';
        el.style.overflow = '';
      }, this._duration);
    }
    toggle() {
      this._target.classList.contains('collapse_show') ? this.hide() : this.show();
    }
  }
  // coollapse (Плавное открытие/скрытие блоков)

  //range-slider
  const rangeSlider = document.getElementById('range-slider');
  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [10, 99999],
      connect: true,
      step: 1,
      range: {
        'min': 10,
        'max': 99999
      }
    });

    const input0 = document.getElementById('range-input-0');
    const input1 = document.getElementById('range-input-1');
    const inputs = [input0, input1];


    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;
      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      });
    });
  }
  //range-slider--end


  //select
  const select1 = new CustomSelect('#select-1');
  //select--end


  //pop-up
  const popupLinks = document.querySelectorAll('.popup--link');
  const lockPadding = document.querySelectorAll('.lock--padding');

  let unlock = true;

  const timeOut = 300;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.popup--close');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock === undefined) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      if (document.querySelector("#header__fixed").classList.contains('fixed')) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = lockPaddingValue;
        }
      }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_fixed');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_fixed');
    }, timeOut);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeOut);
  }
  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelectorAll('.popup.open');
      popupClose(popupActive);
    }
  });
  //pop-up -end

  //counter
  const btns = document.querySelectorAll('.counter__btn');
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector('.counter__input');
      const currentValue = +inp.value;
      let newValue;

      if (direction === 'plus') {
        newValue = currentValue + 1;
      } else {
        newValue = currentValue - 1 >= 1 ? currentValue - 1 : 0;
        if (currentValue === 1) {
          this.parentElement.parentElement.classList.toggle("active-count");
        }
      }
      inp.value = newValue;
    })

  });
  //countr-end 

};