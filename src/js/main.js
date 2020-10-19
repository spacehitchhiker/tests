
let destroy = true;

function slideDetect() {
    if (document.documentElement.clientWidth > 1000 && !destroy) {
        $('.advantages').slick('unslick');
        destroy = true;
    } else if (document.documentElement.clientWidth < 1000 && destroy) {
        $('.advantages').slick({
            arrows: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                        infinite: true,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        infinite: true,
                        slidesToScroll: 1,
                        dots: true
                    }
                }
            ]
        });
        destroy = false;
    }
}

function sliderWhyUs() {
    let destroy = true;
    if (document.documentElement.clientWidth > 1170 && !destroy) {
        $('.why-us').slick('unslick');
        destroy = true;
    } else if (document.documentElement.clientWidth < 1170 && destroy) {
        $('.why-us').slick({
            arrows: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        infinite: true,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
            ]
        });
        destroy = false;
    }
}

function sliderFeedback() {
    let destroy = true;
    if (document.documentElement.clientWidth > 1080 && !destroy) {
        $('.feedback').slick('unslick');
        destroy = true;
    } else if (document.documentElement.clientWidth < 1080 && destroy) {
        $('.feedback').slick({
            arrows: false,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        infinite: true,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
            ]
        });
        destroy = false;
    }
}


$(document).ready(function () {

    slideDetect();
    sliderWhyUs();
    sliderFeedback();
    $(window).resize(function() {
        slideDetect();
        sliderWhyUs();
        sliderFeedback();
    });

});


		















































