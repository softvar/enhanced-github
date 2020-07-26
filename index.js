$(document).ready(function () {
    // hljs.initHighlighting();

    function unhighlightAllNavBarLinks() {
        $('.top-nav-link').removeClass('is-active  active');
        $('.features-nav-link').removeClass('is-active  active');
        $('.privacy-policy-nav-link').removeClass('is-active  active');
        $('.screenshots-nav-link').removeClass('is-active  active');
    }

    function onScroll() {
        var topOffset = $(this).scrollTop(),
            viewportHeight = document.documentElement.clientHeight;

        topOffset += 65; // fixed topbar

        // showing scroll to top logic
        if ($(this).scrollTop() > 100) {
            $('#scrollUp').fadeIn();
        } else {
            $('#scrollUp').fadeOut();
        }

        // nav bar activation logic
        unhighlightAllNavBarLinks();
        if (topOffset <= 1 * viewportHeight) {
            $('.top-nav-link').addClass('is-active  active');
        } else if (topOffset > 1 * viewportHeight && topOffset < 2 * viewportHeight) {
            $('.features-nav-link').addClass('is-active  active');
        } else if (topOffset > 2 * viewportHeight && topOffset < 3 * viewportHeight) {
            $('.screenshots-nav-link').addClass('is-active  active');
        } else if (topOffset > 3 * viewportHeight && topOffset < 4 * viewportHeight) {
            $('.privacy-policy-nav-link').addClass('is-active  active');
        } else {
            unhighlightAllNavBarLinks()
        }
    }

    if (!window.location.hash) {
        $('html, body').animate({
            scrollTop: 0
        }, 0);
    }

    $(document).on('click', 'a.animate--scroll', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 20
        }, 500);
    });

    $(document).on('click', '.fragment-id, .mdl-navigation__link', function (event) {
        window.location.hash = event.currentTarget.hash;
    });

    $(window).on('scroll', function () {
        onScroll();
    });

    $('#scrollUp').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $('.mdl-layout__drawer-button').click(function () {
        $('.mdl-layout__obfuscator').addClass('is-visible');
        $('.mdl-layout__drawer').addClass('is-visible');
    });

    $('.mdl-layout__obfuscator').click(function () {
        $(this).removeClass('is-visible');
        $('.mdl-layout__drawer').removeClass('is-visible');
    });

    // Call onScroll on init too to highlight the appropriate navlink
    onScroll();

    new Glide('.glide', {
        type: 'slider',
        gap: 30,
        autoplay: 3500,
        startAt: 0,
        perView: 1
    }).mount()
});
