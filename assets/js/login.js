$(document).ready(function() {
    // Efecto hover en inputs
    $('.form-input').hover(
        function() {
            $('body').css('background-color', 'rgba(99, 102, 241, 0.1)');
            $(this).addClass('bg-white/30');
        },
        function() {
            $('body').css('background-color', '');
            $(this).removeClass('bg-white/30');
        }
    );

    // Animación botón login
    $('.login-btn').hover(
        function() {
            $(this).css({
                'transform': 'scale(1.05)',
                'box-shadow': '0 4px 15px rgba(255, 255, 255, 0.2)'
            });
        },
        function() {
            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': 'none'
            });
        }
    );

    // Efecto hover QR
    $('.qr-btn').hover(
        function() {
            $(this).find('svg').css('transform', 'rotate(90deg)');
        },
        function() {
            $(this).find('svg').css('transform', 'rotate(0deg)');
        }
    );

    // Animación suscripción
    $('.subscribe-btn').hover(
        function() {
            $(this).css('transform', 'translateX(5px)');
        },
        function() {
            $(this).css('transform', 'translateX(0)');
        }
    );
});