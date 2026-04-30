(function ($) {
    "use strict";

    function getMaxSlidesPerView(config) {
        var maxSlides = 1;
        if (typeof config.slidesPerView === 'number') {
            maxSlides = config.slidesPerView;
        }
        if (config.breakpoints && typeof config.breakpoints === 'object') {
            Object.keys(config.breakpoints).forEach(function (bp) {
                var bpConfig = config.breakpoints[bp];
                if (bpConfig && typeof bpConfig.slidesPerView === 'number') {
                    maxSlides = Math.max(maxSlides, bpConfig.slidesPerView);
                }
            });
        }
        return maxSlides;
    }

    function createSafeSwiper(target, config) {
        var element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) {
            return null;
        }
        var finalConfig = Object.assign({}, config);
        var wrapper = element.querySelector('.swiper-wrapper');
        var slidesCount = wrapper ? wrapper.children.length : 0;
        if (finalConfig.loop) {
            var neededSlides = getMaxSlidesPerView(finalConfig);
            if (slidesCount <= neededSlides) {
                finalConfig.loop = false;
            }
        }
        return new Swiper(element, finalConfig);
    }

    /*===========================================
        =    		Mobile Menu			      =
    =============================================*/
    //SubMenu Dropdown Toggle
    if ($('.tgmenu__wrap li.menu-item-has-children ul').length) {
        $('.tgmenu__wrap .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="plus-line"></span></div>');
    }

    //Mobile Nav Hide Show
    if ($('.tgmobile__menu').length) {

        var mobileMenuContent = $('.tgmenu__wrap .tgmenu__main-menu').html();
        $('.tgmobile__menu .tgmobile__menu-box .tgmobile__menu-outer').append(mobileMenuContent);

        //Dropdown Button
        $('.tgmobile__menu li.menu-item-has-children .dropdown-btn').on('click', function () {
            $(this).toggleClass('open');
            $(this).prev('ul, .tg-mega-menu-wrap').slideToggle(300);
        });
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function () {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.tgmobile__menu-backdrop, .tgmobile__menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });
    };


    /*===========================================
        =     Menu sticky & Scroll to top      =
    =============================================*/
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $("#sticky-header").removeClass("sticky-menu");
            $('.scroll-to-target').removeClass('open');
            $("#header-fixed-height").removeClass("active-height");

        } else {
            $("#sticky-header").addClass("sticky-menu");
            $('.scroll-to-target').addClass('open');
            $("#header-fixed-height").addClass("active-height");
        }
    });


    /*===========================================
        =           Scroll Up  	         =
    =============================================*/
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 0);

        });
    }



    /*===========================================
        =          Data Background    =
    =============================================*/
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });

    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"));
    });


    /*=============================================
        =            Header Top            =
    =============================================*/
    $(".tg-header__top-close").on("click", function () {
        $(".tg-header__top").toggleClass("active");
    });

    /*=============================================
        =        Brand Active		      =
    =============================================*/
    var brandSwiper = createSafeSwiper('.brand-active', {
        // Optional parameters
        slidesPerView: 5,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            '1500': {
                slidesPerView: 6,
            },
            '1200': {
                slidesPerView: 6,
            },
            '992': {
                slidesPerView: 5,
            },
            '768': {
                slidesPerView: 4,
            },
            '576': {
                slidesPerView: 3,
            },
            '0': {
                slidesPerView: 2,
            },
        },
    });


    /*=============================================
        =        hosting Active		      =
    =============================================*/
var brandSwiper = createSafeSwiper('.hosting-active', {
        // Optional parameters
        slidesPerView: 5,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            '1500': {
                slidesPerView: 5,
            },
            '1200': {
                slidesPerView: 5,
            },
            '992': {
                slidesPerView: 4,
            },
            '768': {
                slidesPerView: 3,
            },
            '576': {
                slidesPerView: 3,
            },
            '0': {
                slidesPerView: 2,
            },
        },
        navigation: {
            nextEl: ".hosting-button-next",
            prevEl: ".hosting-button-prev"
        },
        pagination: {
            el: ".hosting-pagination",
            clickable: true
        },
    });

/*=============================================
  =        TLD slider in banner               =
=============================================*/
var tldSwiperEl = document.querySelector('.tld-swiper');
if (tldSwiperEl) {
    createSafeSwiper(tldSwiperEl, {
        loop: true,
        spaceBetween: 12,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        breakpoints: {
            '576': { slidesPerView: 3 },
            '768': { slidesPerView: 4 }
        }
    });
}


    /*=============================================
        =        Testimonial Active		      =
    =============================================*/
    var brandSwiper = createSafeSwiper('.testimonial-active-two', {
        // Optional parameters
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        breakpoints: {
            '1500': {
                slidesPerView: 4,
            },
            '1200': {
                slidesPerView: 4,
            },
            '992': {
                slidesPerView: 3,
            },
            '768': {
                slidesPerView: 3,
            },
            '576': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        },
        // And if we need scrollbar
        navigation: {
            nextEl: ".testimonial-button-next",
            prevEl: ".testimonial-button-prev"
        },
    });



    /*=============================================
        =    		Testimonial Active			      =
    =============================================*/
    $('.testimonial-active').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        appendArrows: ".testimonial__nav",
        fade: true,
        dots: false,
        asNavFor: '.testimonial-nav'
    });
    $('.testimonial-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.testimonial-active',
        centerMode: true,
        focusOnSelect: true,
        dots: false,
        arrows: false,
    });

    /*===========================================
          =      Nice Select Js    =
    =============================================*/
    $('.select').niceSelect();


    /*=============================================
        =    		pricing Active  	       =
    =============================================*/
    $(".pricing-tab-switcher, .tab-btn").on("click", function () {
        $(".pricing-tab-switcher, .tab-btn").toggleClass("active"),
            $(".pricing-tab").toggleClass("seleceted"),
            $(".pricing__price").toggleClass("change-subs-duration");
    });

    /*=============================================
        =        Faq Active 	       =
    =============================================*/
    $(".accordion-header").on('click', function () {
        $(".accordion-item").removeClass("active"),
            $(this).parent().addClass("active")
    });


    /*=============================================
        =       Pricing Active	       =
    =============================================*/
    $(".pricing__select").on('click', function () {
        $(this).parent().toggleClass("active")
    });


    /*===========================================
        =           Aos Active       =
    =============================================*/
    function aosAnimation() {
        AOS.init({
            duration: 1000,
            mirror: true,
            once: true,
            disable: 'mobile',
        });
    }


})(jQuery);

(function ($) {
    "use strict";

    $(function () {
        var $form = $('#domainForm');
        var $table = $('#tableDomainsList');
        var $bulkBar = $('#domainsBulkBar');
        var $bulkCount = $('#domainsBulkCount');
        var $bulkCountText = $('#domainsBulkCountText');
        var $searchInput = $('#domainsPageSearch');

        if (!$form.length || !$table.length || !$bulkBar.length) {
            return;
        }

        function getDataTableInstance() {
            if (!$.fn.dataTable || !$.fn.dataTable.isDataTable($table)) {
                return null;
            }

            return $table.DataTable();
        }

        function setSelectedRowStates() {
            $table.find('tbody tr').each(function () {
                var $row = $(this);
                var checked = $row.find('input.domids').is(':checked');
                $row.toggleClass('is-selected', checked);
            });
        }

        function updateBulkSelectionState() {
            var selected = $form.find('input.domids:checked').length;
            $bulkCount.text(selected);
            $bulkCountText.text(selected);
            $bulkBar.toggleClass('d-none', selected === 0);
            setSelectedRowStates();
        }

        function syncHeaderSearchFromTable() {
            var table = getDataTableInstance();
            if (!table || !$searchInput.length) {
                return;
            }

            var value = table.search() || '';
            if ($searchInput.val() !== value) {
                $searchInput.val(value);
            }
        }

        if ($searchInput.length) {
            $searchInput.on('input', function () {
                var table = getDataTableInstance();
                if (!table) {
                    return;
                }

                table.search($(this).val()).draw();
            });
        }

        $form.on('change', 'input.domids', function () {
            updateBulkSelectionState();
        });

        $form.on('click', '.domains-bulkbar .setBulkAction', function (event) {
            event.preventDefault();
            $('#bulkaction').val(this.id);
            $form.trigger('submit');
        });

        $(document).on('draw.dt', function () {
            updateBulkSelectionState();
            syncHeaderSearchFromTable();
        });

        setTimeout(function () {
            updateBulkSelectionState();
            syncHeaderSearchFromTable();
        }, 0);
    });

})(jQuery);

(function ($) {
    "use strict";

    $(function () {
        var $root = $('.hv-domain-details');
        if (!$root.length) {
            return;
        }

        function setNsInputsDisabled(isDefault) {
            var $inputs = $root.find('.domnsinputs');
            $inputs.prop('disabled', isDefault);
            if (isDefault) {
                $inputs.closest('.panel-collapse').removeClass('show').hide();
            } else {
                $inputs.closest('.panel-collapse').addClass('show').show();
            }
        }

        var nsChoice = $root.find('input[name="nschoice"]:checked').val();
        if (nsChoice) {
            setNsInputsDisabled(nsChoice === 'default');
        }

        $root.on('change', 'input[name="nschoice"]', function () {
            setNsInputsDisabled(this.value === 'default');
        });

        $root.on('click', '.panel-switch[submit-form]', function (event) {
            if ($(event.target).is('input, label, button, a')) {
                return;
            }
            event.preventDefault();
            $(this).closest('form').trigger('submit');
        });

        $root.on('change', '.panel-switch .switch__checkbox[name="reglock"]', function () {
            $(this).closest('form').trigger('submit');
        });

        if (window.location.hash) {
            var targetTab = window.location.hash;
            if ($root.find(targetTab).length && $.fn.tab) {
                $root.find('.tabControlLink[href="' + targetTab + '"]').tab('show');
            }
        }
    });

})(jQuery);
