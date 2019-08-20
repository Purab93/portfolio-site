const fileData = {
    'banner': {
        label: 'Banner & Poster',
        basePath: './content/banner/',
        data: [{
            imgName: 'banner1.png',
            pdfName: 'banner1.pdf'
        }, {
            imgName: 'banner2.jpeg',
            pdfName: 'banner1.pdf'
        }]
    },
    "writing": {
        label: 'Assorted Writing',
        basePath: './content/assorted-writing/',
        data: [{
            imgName: 'writing1.jpeg'
        }, {
            imgName: 'writing2.jpeg'
        }]
    }
};

function init() { 
    var resultArr = filterData(fileData);
    var test = portfolio.templates['nav-sec']({
        filterData: resultArr
    });
    $('.prtfolio-section').append(test);
    $('.tab-pane:first').addClass('active');
    $('.portfolio-tabs .nav-link:first').addClass('active');
}

function filterData(fileData) { 
    var finArr = [],
        resultArr =[],
        allobj = {
            id:"all",
            label: "All",
            data: []
        };
    finArr.push(allobj);
    $.each(fileData, (key, value) => {
        resultObj = {};
        resultArr = [];
        
        $.each(value.data, (key,obj) => {
            resultArr.push({
                imgPath: value.basePath + obj.imgName,
                pdfLink: obj.pdfName ? value.basePath + obj.pdfName : ''
            });
            allobj.data.push({
                imgPath: value.basePath + obj.imgName,
                pdfLink: obj.pdfName ? value.basePath + obj.pdfName : ''
            });
        });

        finArr.push({
            id: key,
            label: value.label,
            data: resultArr
        });
    });

    return finArr;
}

$(document).ready(function () {
    init();
});