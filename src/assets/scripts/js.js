
$(document).ready(function () {
  $(document).on('click', '.cta', function () {
    $(this).toggleClass('active')
  })
});



$(document).ready(function () {
  $(".nav-link").hover(function () {
    $('.sidebar-menu').removeClass("flowHide");
    $(this).addClass('tax-active');

  }, function () {
    $('.sidebar-menu')
      .addClass("flowHide");
    $(this).removeClass('tax-active');

  });
});




