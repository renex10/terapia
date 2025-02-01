$(document).ready(function() {
    // Animación de aparición de la frase
    $('.frase').delay(300).animate({opacity: 1}, 1500);
    
    // Efecto hover dinámico
    $('.mensaje-vidrio').hover(
        function() {
            $(this).stop().animate({
                'padding-top': '35px',
                'padding-bottom': '35px',
                'border-width': '3px'
            }, 200);
        },
        function() {
            $(this).stop().animate({
                'padding-top': '30px',
                'padding-bottom': '30px',
                'border-width': '2px'
            }, 300);
        }
    );
});