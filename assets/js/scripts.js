$(document).ready(function() {
    // Control del sidebar y menús
    const sidebarControl = {
        init: function() {
            this.checkInitialState();
            this.bindEvents();
            this.initUserMenu();
            this.initNotificationsMenu(); // Nueva función para manejar notificaciones
            this.initSubmenus(); // Función para submenús
        },
        
        checkInitialState: function() {
            if ($(window).width() < 768) {
                $('#sidebar').addClass('-translate-x-full');
                this.toggleIcons('menu');
            }
        },
        
        bindEvents: function() {
            $('#sidebarToggle').click(() => this.toggleSidebar());
            $('#sidebarOverlay').click(() => this.closeSidebar());
            $(window).resize(() => this.handleResize());
            $(document).click((e) => this.handleOutsideClick(e));
        },
        
        toggleSidebar: function() {
            $('#sidebar').toggleClass('-translate-x-full');
            $('#sidebarOverlay').toggleClass('hidden');
            this.toggleIcons($('#sidebar').hasClass('-translate-x-full') ? 'menu' : 'close');
        },
        
        closeSidebar: function() {
            $('#sidebar').addClass('-translate-x-full');
            $('#sidebarOverlay').addClass('hidden');
            this.toggleIcons('menu');
        },
        
        handleResize: function() {
            if ($(window).width() >= 768) {
                $('#sidebar').removeClass('-translate-x-full');
                $('#sidebarOverlay').addClass('hidden');
                this.toggleIcons('hidden');
            } else {
                $('#sidebar').addClass('-translate-x-full');
                this.toggleIcons('menu');
            }
        },
        
        handleOutsideClick: function(e) {
            if ($(window).width() < 768 && 
                !$(e.target).closest('#sidebar, #sidebarToggle').length &&
                !$('#sidebar').hasClass('-translate-x-full')) {
                this.closeSidebar();
            }
        },
        
        toggleIcons: function(state) {
            if (state === 'menu') {
                $('#menuIcon').removeClass('hidden');
                $('#closeIcon').addClass('hidden');
            } else if (state === 'close') {
                $('#menuIcon').addClass('hidden');
                $('#closeIcon').removeClass('hidden');
            } else {
                $('#menuIcon').addClass('hidden');
                $('#closeIcon').addClass('hidden');
            }
        },
        
        initUserMenu: function() {
            const userButton = $('#userButton');
            const userDropdown = $('#userDropdown');

            userButton.click(function(e) {
                e.stopPropagation();
                userDropdown.toggleClass('hidden');
            });

            $(document).click(function(e) {
                if (!$(e.target).closest('#userMenu').length) {
                    userDropdown.addClass('hidden');
                }
            });

            $(window).resize(function() {
                userDropdown.addClass('hidden');
            });
        },

        // Nueva función para manejar el menú de notificaciones
        initNotificationsMenu: function() {
            const notificationsButton = $('#notificationsButton');
            const notificationsDropdown = $('#notificationsDropdown');
            const closeNotificationsButton = $('#closeNotifications');

            // Abrir/cerrar notificaciones al hacer clic en el botón de notificaciones
            notificationsButton.click(function(e) {
                e.stopPropagation();
                notificationsDropdown.toggleClass('hidden');
            });

            // Cerrar notificaciones al hacer clic en el icono de cierre (X)
            closeNotificationsButton.click(function(e) {
                e.stopPropagation();
                notificationsDropdown.addClass('hidden');
            });

            // Cerrar notificaciones al hacer clic fuera del área de notificaciones
            $(document).click(function(e) {
                if (!$(e.target).closest('#notificationsMenu').length) {
                    notificationsDropdown.addClass('hidden');
                }
            });
        },

        // Nueva función para manejar submenús
        initSubmenus: function() {
            $('.has-submenu > a').click(function(e) {
                e.preventDefault();
                const submenu = $(this).next('ul');
                const icon = $(this).find('.submenu-icon');

                // Cerrar otros submenús abiertos
                $('.has-submenu > ul').not(submenu).slideUp(200);
                $('.has-submenu > a').not($(this)).find('.submenu-icon').removeClass('rotate-180');

                // Alternar el submenú actual
                submenu.slideToggle(200);
                icon.toggleClass('rotate-180');
            });

            // Cerrar submenús al hacer clic fuera
            $(document).click(function(e) {
                if (!$(e.target).closest('.has-submenu').length) {
                    $('.has-submenu > ul').slideUp(200);
                    $('.submenu-icon').removeClass('rotate-180');
                }
            });
        }
    };

    sidebarControl.init();
});