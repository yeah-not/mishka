// Поддержка внешних SVG use
svg4everybody();

$(function() {
  $('body').toggleClass('no-js js');

  const AJAX_ERROR = 'Совсем нет никаких данных :(';

  let $mainNav = $('.main-nav');
  let addToCartPopup = $('.add-to-cart').popup({closeBtn: false, overlay: true})[0];
  let contactUsPopup = $('.contact-us').popup()[0];

  $('.main-nav__toggle').on('click', function(evt) {
    evt.preventDefault();
    $mainNav.toggleClass('main-nav--closed main-nav--opened');
  });

  $('.js-add-to-cart-show').on('click', function(evt) {
    evt.preventDefault();
    addToCartPopup.open();
  });

  $('.js-contact-us-show').on('click', function(evt) {
    evt.preventDefault();
    contactUsPopup.open();
  });

  $('.add-to-cart__form').on('submit', function(evt) {
    onPopupSubmit(evt, {
      response: '.add-to-cart__response',
      errorClass: 'add-to-cart__response--error'
    });
  });

  $('.contact-us__form').on('submit', function(evt) {
    onPopupSubmit(evt);
  });

  function onPopupSubmit(evt, settings) {
    evt.preventDefault();

    let defaults = {
      response: '.form__response',
      errorClass: 'form__response--error',
    }

    let options = $.extend(defaults, settings);
    let form = evt.target;
    let $form = $(evt.target);
    let $response = $form.find(options.response);
    let errorClass = options.errorClass;
    let popup = $form.parents('.modal')[0];

    $.post(form.action, $form.serialize(), function(data){
      if (data === AJAX_ERROR) {
        $response.addClass(errorClass);
      } else {
        $response.removeClass(errorClass);

        setTimeout(function() {
          form.reset();
          $response.empty();
          popup.close();
        }, 2000);
      }

      $response.html(data);
    });
  }
});
