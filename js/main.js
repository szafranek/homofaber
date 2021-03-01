/*jshint*/
var Words = window.Words || {};

(function() {
    "use strict";
    Words.WIDTH = 960;
    Words.HEIGHT = 600;
    Words.userTouchEvent = "";
    Words.userTouchEndEvent = "";

    var resize = function() {
        resizeContainer();
        setBaseFontSize();
    };

    var setBaseFontSize = function() {
        var defaultWidth = Words.WIDTH;
        var defaultSize = 10;
        var factor = parseInt(document.querySelector(".main").style.width, 10) / defaultWidth;
        document.querySelector("html").style.fontSize = defaultSize * factor + "px";
    };

    var resizeContainer = function() {
        var widthToHeight = Words.WIDTH / Words.HEIGHT;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        var main = document.querySelector(".main");
        main.style.width = newWidth + "px";
        main.style.height = newHeight + "px";
    };

    var setupScreen = function() {
        if (window.ontouchstart !== undefined) {
            document.body.classList.add("touch");
            Words.userTouchEvent = "touchstart";
            Words.userTouchEndEvent = "touchend";
        } else {
            Words.userTouchEvent = "mousedown";
            Words.userTouchEndEvent = "mouseup";
        }
        resize();
        window.addEventListener('resize', resize, false);
        // The timeout is a necessary workaround for iOS bug in handling orientation change in PWAs:
        // https://bugs.webkit.org/show_bug.cgi?id=170595
        window.addEventListener("orientationchange", () => setTimeout(resize, 500), false);
    };

    var setupUserEvents = function() {
        var answers = document.querySelectorAll(".answers>li");
        answers.addEventListener(Words.userTouchEvent, Words.game.answerSelect);
        answers.addEventListener(Words.userTouchEndEvent, Words.game.answerDeselect);

        document.querySelector(".button.game").addEventListener(Words.userTouchEvent, Words.game.start);
        // document.querySelector(".button.practice").addEventListener(Words.userTouchEvent, Words.game.startPractice);

        document.querySelectorAll(".back").addEventListener(Words.userTouchEvent, Words.game.buttonSelect);
        document.querySelectorAll(".back").addEventListener(Words.userTouchEndEvent, Words.game.buttonDeselect);

        document.querySelectorAll(".screen.game .back").addEventListener(Words.userTouchEndEvent, Words.game.end);
        // document.querySelectorAll(".screen.practice .back").addEventListener(Words.userTouchEndEvent, Words.game.endPractice);
    };

    window.addEventListener("load", function() {
        Words.loader.loadTerms("./data/homofaber.txt");
        setupScreen();
        setupUserEvents();
        Words.game.start();
    });
}());
