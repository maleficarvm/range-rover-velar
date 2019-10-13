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
    document.write('<style id="globalStyleJS">' +
        '.page-container{height:' + ScreenHeight + 'px} ' +
        '#wrapper{height:' + ScreenHeight + 'px} ' +
        '</style>');
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
    $("#wrapper").stop().animate({scrollTop: BoxListPos}, 1000, 'swing', function () {
        ScrollAction = true;
    });
    LeftNavSetPos(BoxNumber);
};

// плавная прокрутка
var PageScrollToAction = function (CurrentPos, MoveTo) {
    ScrollAction = false;
    var BoxListPos = CurrentPos / ScreenHeight;
    BoxListPos += MoveTo == 'down' ? 1 : -1;
    BoxListPos = BoxListPos < 0 ? 0 : BoxListPos;
    PageMoveToBoxByNumber(Math.round(BoxListPos));
};

var LeftNavSetPos = function (BoxNumber) {
    $('#leftnav li.active').removeClass('active');
    var TargetContainer = $('#leftnav li a[goto-screen="' + BoxNumber + '"]').parent();
    TargetContainer.addClass('active showed');
    setTimeout(function () {
        TargetContainer.removeClass('showed');
    }, 2000);
}

$(document)
    .on('click', '#maskOpener', function () {
        $('html, body').css({"overflow-y": "hidden"});
        $('#menu > ul > *').css({'display': 'none'});
        $('#menuMask').fadeIn(500, function () {
            $('#menu').css({display: 'block'});
            $('#menu > ul').stop().animate({
                'margin-left': -300
            }, 500);
            $('#menu > ul > *').slideDown(500);
        });
        return false;
    })

    .on('click', '#leftnav li a', function () {
        CALL_SCREEN = $(this).attr('goto-screen');
        PageMoveToBoxByNumber(CALL_SCREEN);
        return false;
    })
    .on('click', '#menuMask', function () {
        $('#menu > ul').stop().animate({
            'margin-left': 0
        }, 500);
        $('#menu > ul > *').slideUp(500, function () {
            $('#menuMask').fadeOut(500, function () {
                $('html, body').css({"overflow-y": "auto"});
            });
        });
        return false;
    })

    .ready(function () { //On page loaded
        LeftNavHeight = $("#leftnav").innerHeight();
        leftNavTop = Math.round((ScreenHeight - LeftNavHeight) / 2);
        $('#globalStyleJS').append('#leftnav{top:' + leftNavTop + 'px;} ');
        ScrollTopPosition = $('#wrapper').scrollTop();

        document.getElementById('wrapper').addEventListener('touchmove', function (e) {
            e.returnValue = false;
        });

        document.getElementById('wrapper').addEventListener('wheel', function (e) {
            var ScrollPos = $('#wrapper').scrollTop();
            ScrollTopPositionNav = e.wheelDeltaY < 0 ? 'down' : 'up';
            ScrollTopPosition = ScrollPos;
            ScrollTopIteration++;
            if (ScrollAction) {
                PageScrollTo(ScrollTopIteration);
            }
            e.returnValue = false;
        });
    });
;

//$('title').text('Хуй всем!');

