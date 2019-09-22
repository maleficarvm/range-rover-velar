/* JQuery */

var ScreenHeight;
var ScrollTopPositionNav;
var ScrollTopPosition;
var ScrollTopIteration = 0;
var ScrollAction = true;

// Установка доп ЦСС для задания размера 
var PageResize = function () {
    ScreenHeight = $(self).innerHeight();
    // $('.page-container').css({height: H + "px"});
    document.write('<style>.page-container{height:' + ScreenHeight + 'px}</style>');
};
PageResize();

// Таймер ожидания завершения скролла
var PageScrollTo = function (Iteration) {
    setTimeout(function () {
        if (ScrollTopIteration == Iteration) {
            PageScrollToAction(ScrollTopPosition, ScrollTopPositionNav);
        }
    }, 50);
};

var PageMoveToBoxByNumber = function (BoxNumber) {
    ScrollAction = false;
    BoxListPos = BoxNumber * ScreenHeight;
    $("html, body").stop().animate({scrollTop: BoxListPos}, 1000, 'swing', function () {
        ScrollAction = true;
    });
};

// плавная прокрутка
var PageScrollToAction = function (CurrentPos, MoveTo) {
    ScrollAction = false;
    var BoxListPos = CurrentPos / ScreenHeight;
    BoxListPos += MoveTo == 'down' ? 0.49 : -0.49;
    PageMoveToBoxByNumber(Math.round(BoxListPos));
};

$(document)
    .scroll(function () { // действия при скролле
        var ScrollPos = $(document).scrollTop();
        ScrollTopPositionNav = ScrollPos > ScrollTopPosition ? 'down' : 'up';
        ScrollTopPosition = ScrollPos;
        ScrollTopIteration++;
        if (ScrollAction) {
            PageScrollTo(ScrollTopIteration);
        }
    })
    .on('click', '#maskOpener', function () {
        $('html, body').css({"overflow-y":"hidden"});
        $('#menu > ul > *').css({'display':'none'});
        $('#menuMask').fadeIn(500,function(){
            $('#menu').css({display: 'block'});
            $('#menu > ul').stop().animate({
                'margin-left': -300
            }, 500);
            $('#menu > ul > *').slideDown(500);
        });
        return false;
    })

    .on('click', '#menuMask', function () {
        $('#menu > ul').stop().animate({
            'margin-left': 0
        }, 500);
        $('#menu > ul > *').slideUp(500,function(){
            $('#menuMask').fadeOut(500,function(){
                $('html, body').css({"overflow-y":"auto"});
            });
        });
        return false;
    })

    .ready(function () { //On page loaded
        //PageResize();
        ScrollTopPosition = $(document).scrollTop();
    });
;

