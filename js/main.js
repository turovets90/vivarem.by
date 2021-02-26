$(document).ready(function(){

    /* перевод картинки svg в код */
    $('.icon img, img.icon').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
    /* end перевод картинки svg в код */
    $('.search_toggler').click(function(){
        $(this).toggleClass('act');
    });

    $('.hamburger').click(function () {
        $('.main_menu').toggleClass('open');
        $('html').toggleClass('page-noscroll');

        $('.main_menu .mm_close').click(function () {
            $('.main_menu').removeClass('open');
            $('html').removeClass('page-noscroll');
        });
        return false;
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".main_menu.open").length) {
            $(".main_menu.open").removeClass('open');
            $("html").removeClass('page-noscroll');
        }
        e.stopPropagation();
    });

    $('.main_menu .arrow').click(function(){
        $(this).next().slideToggle();
        $(this).toggleClass('act');
    });

    $(".main_slider").slick({
        infinite: true,
        arrows: false,
        dots: true,
        fade: true,
        //autoplay: true,
        //speed: 3000,
        //autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.ms_prev').click(function(){
        $('.main_slider').slick('slickPrev');
    })

    $('.ms_next').click(function(){
        $('.main_slider').slick('slickNext');
    })


    $(function () {
        $('input, textarea').each(function () {
            $(this).blur(function(){
                if(!this.value){
                    $(this).removeClass('hide_label');
                }
                else{
                    $(this).addClass('hide_label');
                }
            });
            if ( !this.value ) {
                $(this).removeClass('hide_label');
            }
            else{
                $(this).addClass('hide_label');
            }
        });
    });


    $('.product_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.product_slider_nav'
    });
    $('.product_slider_nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product_slider',
        dots: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });


    $('.nav-tabs_product li ').each(function(){
        var tab_link=$(this).index();
        var tab_content=$('.tab-content_product .tab-pane').index();
        console.log(tab_link);
        $(this).click(function(){
            console.log(tab_link);
            $('.nav-tabs_product li ').removeClass('act');
            $('.tab-content_product .tab-pane').removeClass('active');
            $(this).addClass('act');
            $('.tab-content_product .tab-pane').eq(tab_link).addClass('active');
        });
    });



    $('.range_values').each(function(){
        var range=$(this).find('.range');
        var rub_left=$(this).find('.rub_left');
        var rub_right=$(this).find('.rub_right');
        var tasks_status1=$(this).find('.tasks_status1');
        var tasks_status2=$(this).find('.tasks_status2');
        $(range).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [10, 1000],
            step: 10,
            slide: function(event, ui) {
                $(rub_left).text(ui.values[0] + ' мм.');
                $(rub_right).text(ui.values[1] + ' мм.');
                $(tasks_status1).val( ui.values[0] );
                $(tasks_status2).val( ui.values[1] );
            }
        });
        $(rub_left).text($(range).slider("values", 0) + ' мм.');
        $(rub_right).text($(range).slider("values", 1) + ' мм.');
    });
    $(document).on("change","input[class=tasks_status1]", function() {
        $(this).closest('.range_values').find('.range').slider('values',0,$(this).val());
        $(this).closest('.range_values').find('.rub_left').text($('.range').slider("values", 0) + ' мм.');
    });
    $(document).on("change","input[class=tasks_status2]", function() {
        $(this).closest('.range_values').find('.range').slider('values',1,$(this).val());
        $(this).closest('.range_values').find('.rub_right').text($('.range').slider("values", 1) + ' мм.');
    });

    $('.filter_title').click(function(){
        $(this).toggleClass('act');
    });

    $('.filter_toggler').click(function(){
        $(this).next().slideToggle();
    });


    $(window).resize(function(){
        var header_height = $('header').outerHeight();
        $('header').next().css({'margin-top': header_height+'px'});
    });
    $(window).resize();




});





