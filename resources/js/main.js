const fileData = {
    'banner': {
        label: 'Banner & Poster',
        basePath: './content/banner/',
        data: [{
            imgData: ['part_2.jpg']
        }, {
            imgData: ['part_5.jpg']
        }, {
            imgData: ['part_8.jpg']
        }, {
            imgData: ['part_15.jpg']
        }, {
            imgData: ['Display_7One_Restaurant_Ahmedabad.jpg']
        }, {
            imgData: ['Display_Vasari_Ethnic_Wear_Ahmedabad.jpg']
        }]
    },
    'social_media': {
        label: 'Social Media',
        basePath: './content/social_media/',
        data: [{
            imgData: ['social_media_0.jpg']
        }, {
            imgData: ['social_media_1.jpg']
        }, {
            imgData: ['social_media_2.jpg']
        }, {
            imgData: ['social_media_3.jpg']
        }, {
            imgData: ['social_media_4.jpg']
        }, {
            imgData: ['social_media_5.jpg']
        }]
    },
    "writing": {
        label: 'Assorted Writing',
        basePath: './content/assorted-writing/',
        data: [{
            imgData: ['Flyer_Hemaxhi.jpg']
        }, {
            imgData: ['Inivitation_Blossom.jpg']
        }, {
            imgData: ['Calendar_MID30_1.jpg', 'Calendar_MID30_2.jpg', 'Calendar_MID30_3.jpg'],
            pdfName: 'MID30_Calendar.pdf'
        }, {
            imgData: ['Coffee_Associates_1.jpg', 'Coffee_Associates_2.jpg', 'Coffee_Associates_3.jpg'],
            pdfName: 'Coffee_Table_Book.pdf'
        }, {
            imgData: ['Invitation_Riddhi.jpg']
        }, {
            imgData: ['Greeting_MID30_Ahmedabad.jpg']
        }]
    }
};

const clientLogo = ['JP Sports & Events.jpg', 'Three A Communciation.jpg', 'FLXBL Design Consultancy.png', 'Medfinity Endless Media.jpg', 'Different Strokes.jpg', 'Mid30.png', 'Ku-Ke Associates.jpg', 'Extreme Fitness.jpg', 'Copy Hub.jpg', 'OASIS Test House.png', 'BCM Corporation.png', 'SugarFree Cyclothon Ahmedabad.jpg', 'The Marutinandan Grand.jpg', 'Aastha Productions.png', 'Trulyy India.jpg'];

function init() {
    renPortfSec();
    renClntSec();
}

function renPortfSec() {
    var resultArr = filterData(fileData);
    var test = portfolio.templates['nav-sec']({
        filterData: resultArr
    });
    $('.prtfolio-section').append(test);
    $('.tab-pane:first').addClass('active');
    $('.portfolio-tabs .nav-link:first').addClass('active');
    $('.tile-slider').slick({
        nextArrow: '<span class="slider-arr slider-next">></span>',
        prevArrow: '<span class="slider-arr slider-prev"><</span>',
        autoplay: true,
        autoplaySpeed: 2000,
    });

    bindPortEvents();
}

function bindPortEvents() {
    $('.link-holder').on('mouseover', function (event) {
        $(event.currentTarget).find('.details-link').addClass('dtls-lnk-show');
    });

    $('.link-holder').on('mouseout', function (event) {
        $(event.currentTarget).find('.details-link').removeClass('dtls-lnk-show');
    });
}

function renClntSec() {
    var $slider = $('.client-logo-slider'),
        counter = 0,
        $logoDiv,
        $img;

    for (; counter < clientLogo.length; counter++) {
        $logoDiv = $('<div>').attr({
            class: "clnt-logo-img-holder"
        }).css({
            'height': '150px',
            'margin': '0 10px'
        });
        $img = $('<img>').attr({
            src: './resources/client_logos/' + clientLogo[counter],
            class: 'clnt-logos-img'
        }).css({
            'height': '150px',
            'max-width': '200px'
        });

        $logoDiv.append($img);
        $slider.append($logoDiv);
    }

    $('.client-logo-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    });

}

function filterData(fileData) {
    var finArr = [],
        resultArr = [],
        allobj = {
            id: "all",
            label: "All",
            data: []
        };
    finArr.push(allobj);
    $.each(fileData, (key, value) => {
        resultObj = {};
        resultArr = [];

        $.each(value.data, (keyval, obj) => {
            imgData = [];
            $.each(obj.imgData, (index, val) => {
                imgData.push(value.basePath + val);
            });
            resultArr.push({
                imgData: imgData,
                isSlider: imgData.length > 1,
                pdfLink: obj.pdfName ? value.basePath + obj.pdfName : ''
            });
            allobj.data.push({
                imgData: imgData,
                isSlider: imgData.length > 1,
                pdfLink: obj.pdfName ? value.basePath + obj.pdfName : ''
            });
        });

        finArr.push({
            id: key,
            label: value.label,
            data: resultArr
        });
    });
    allobj.data = shuffle(allobj.data);

    return finArr;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

$(document).ready(function () {
    init();
});