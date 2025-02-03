// Scroll Navigation Effect
$(window).scroll(function(){
    if($(this).scrollTop() > 50){
        $('#mainNav').addClass('scrolled');
    } else {
        $('#mainNav').removeClass('scrolled');
    }
});

// Mobile Menu Toggle
$('#mobileMenuBtn').click(function(){
    $('#mobileMenu').slideToggle(300);
    $(this).find('i').toggleClass('fa-bars fa-times');
});

// Cerrar menú al cambiar tamaño de pantalla
$(window).resize(function() {
    if($(window).width() >= 768) {
        $('#mobileMenu').slideUp(300);
        $('#mobileMenuBtn i').removeClass('fa-times').addClass('fa-bars');
    }
});