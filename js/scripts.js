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

// плавная прокрутка
var PageScrollToAction = function (CurrentPos, MoveTo) {
    ScrollAction = false;
    var BoxListPos = CurrentPos / ScreenHeight;
    BoxListPos += MoveTo == 'down' ? 0.49 : -0.49;
    BoxListPos = Math.round(BoxListPos) * ScreenHeight;
    $("html, body").stop().animate({scrollTop: BoxListPos}, 1000, 'swing',function(){
        ScrollAction = true;
    });
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
    .ready(function () { //On page loaded
        //PageResize();
        ScrollTopPosition = $(document).scrollTop();
    });
;
