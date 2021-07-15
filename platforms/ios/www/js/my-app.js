var pageName = {
    MainPage: 'MainPage',
    Locations: "Locations",
    Flats:"Flats",
    Supplier:"Supplier",
    Rentalform:"Rentalform",
    RentalHistory:"RentalHistory",
    AttachemntPage:"Imagehtml"
};


// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    //domCache: false, //enable inline pages
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

function onDeviceReady() {

}
document.addEventListener("deviceready", onDeviceReady, false);

// Generate dynamic page
var dynamicPageIndex = 0;


function ShowpendingRentals(flatid)
{
        $$('#dvtablePending').attr('style', '');
        $$('#dvtablePending_h').attr('style', '');
}


jQuery(document).ready(function() {
    "use strict";

    $(".logo").animate({'top': '20px'},'slow',"easeInOutCirc");
    $(".cartitems").delay(1000).animate({'width': '30px', 'height': '30px', 'top':'10px', 'right':'10px', 'opacity':1},1000,"easeOutBounce");
    $(".main-nav ul > li")
        .css('opacity', '0')
        .each(function(index, item) {
            setTimeout(function() {
                $(item).fadeTo('slow',1,"easeInOutCirc");
            }, index*175);
        });

    $(".main-nav ul > li span")
        .css('opacity', '0')
        .each(function(index, item) {
            setTimeout(function() {
                $(item).animate({'left': '0px', 'opacity':1},500,"easeInOutCirc");
            }, index*175);
        });

    $('.item_delete').click(function(e){
        e.preventDefault();
        var currentVal = $(this).attr('id');
        $('div#'+currentVal).fadeOut('slow');
    });

    $('.qntyplus').click(function(e){

        e.preventDefault();
        var fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal)) {
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            $('input[name='+fieldName+']').val(0);
        }

    });
    $(".qntyminus").click(function(e) {
        e.preventDefault();
        var fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            $('input[name='+fieldName+']').val(0);
        }
    });

});

$$(document).on('ajaxStart',function(e){myApp.showIndicator();});
$$(document).on('ajaxComplete',function(){myApp.hideIndicator();});

$$('.popup').on('opened', function () {
    $(".close_loginpopup_button a").animate({'right':'10px', 'opacity':1},'slow',"easeInOutCirc");
});
$$('.popup').on('closed', function () {
    $(".close_loginpopup_button a").animate({'right':'0px', 'opacity':0},'slow',"easeInOutCirc");
});

myApp.onPageInit('index', function (page) {

    $(".logo").animate({'top': '20px'},'slow',"easeInOutCirc");
    // $(".cartitems").delay(1000).animate({'width': '30px', 'height': '30px', 'top':'10px', 'right':'10px', 'opacity':1},1000,"easeOutBounce");
    $(".main-nav ul > li")
        .css('opacity', '0')
        .each(function(index, item) {
            setTimeout(function() {
                $(item).fadeTo('slow',1,"easeInOutCirc");
            }, index*175);
        });
    $(".main-nav ul > li span")
        .css('opacity', '0')
        .each(function(index, item) {
            setTimeout(function() {
                $(item).animate({'left': '0px', 'opacity':1},500,"easeInOutCirc");
            }, index*175);
        });

})

$$(document).on('pageAfterAnimation', function (e) {


    var page = e.detail.page;
    var lang = localStorage.getItem(Storage.classSetting.language);
    try {
        if (cordova.platformId == 'ios') {

        }
    } catch (e)
    { }
    //mainView.showToolbar();

    //statusbar color


    if(page.name=='index'){
        $(".logo").animate({'top': '20px'},'slow',"easeInOutCirc");

        $(".main-nav ul > li")
            .css('opacity', '0')
            .each(function(index, item) {
                setTimeout(function() {
                    $(item).fadeTo('slow',1,"easeInOutCirc");
                }, index*175);
            });
        $(".main-nav ul > li span")
            .css('opacity', '0')
            .each(function(index, item) {
                setTimeout(function() {
                    $(item).animate({'left': '0px', 'opacity':1},500,"easeInOutCirc");
                }, index*175);
            });
    }

    //Util.updateNetworkConnection();
    console.log(page.name);
    if (page.name == pageName.Locations) {
        try {
            Util.showScreenLoader(true);
            DisplayLocation();
        }
        catch (e) { }
    }
    else if(page.name == pageName.Flats){
        Util.showScreenLoader(true);
        getlocationddl();
        DisplayFlats();
    }
    else if(page.name == pageName.Supplier){
        Util.showScreenLoader(true);
        DisplaySuppliers();
    }
    else if(page.name == pageName.Rentalform){
        Util.showScreenLoader(true);
        getFlatsddl();
        getSuppliersddl();
        getVAT();
    }
    else if(page.name == pageName.RentalHistory){
        Util.showScreenLoader(true);
        getFlatsddl();
    }
    else if(page.name == pageName.AttachemntPage){
        //Util.showScreenLoader(true);
        //$("#touchgallery").html("");
        //$("#touchgallery").append("<div id='floating-img'><img src='" + filename + "' width='100%' /></div>");

    }

});
