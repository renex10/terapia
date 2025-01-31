$(document).ready(function() {
    // Control del sidebar
    const sidebarControl = {
        init: function() {
            this.checkInitialState();
            this.bindEvents();
            this.initUserMenu();
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
        }
    };

    sidebarControl.init();
});