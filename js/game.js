var Words = window.Words || {};
Words.game = Words.game || {};

(function() {
    "use strict";

    Words.game.interactionBlocked = false;
    Words.game.learningMode = false;
    var BUTTON_DELAY = 300;
    var SCREEN_DELAY = 500;

    Words.game.start = function() {
        Words.models.reset();
        Words.game.disableLearningMode();
        Words.game.updateScore();
        Words.views.goToScreen("game");
        setTimeout(Words.game.initRound, SCREEN_DELAY);
    };

    Words.game.end = function() {
        Words.game.completeRound();
        Words.views.goToScreen("start");
        setTimeout(Words.models.reset, BUTTON_DELAY);
        setTimeout(Words.game.updateScore, BUTTON_DELAY);
    };


    Words.game.startPractice = function() {
        Words.views.goToScreen("practice");
        setTimeout(function() {
            Words.views.createPracticeContent(Words.data.terms);
        }, SCREEN_DELAY);
    };

    Words.game.endPractice = function() {
        Words.views.detachPracticeContent();
        Words.views.goToScreen("start");
    };

    Words.game.initRound = function() {
        Words.game.blockInteraction();
        setupTerms();
        Words.views.showAllAnswers();
        Words.views.showTarget();
        setTimeout(Words.game.unblockInteraction, BUTTON_DELAY);
    };

    Words.game.completeRound = function() {
        Words.game.blockInteraction();
        Words.views.hideTarget();
        Words.views.hideAllAnswers();
        setTimeout(Words.views.deactivateAnswer, BUTTON_DELAY);
        setTimeout(Words.game.unblockInteraction, BUTTON_DELAY);
    };

    Words.game.updateScore = function() {
        Words.views.updateHits(Words.models.hits);
        Words.views.updateMisses(Words.models.misses);
    };

    Words.game.buttonSelect = function(event) {
        if (!Words.game.interactionBlocked) {
            Words.views.select(event.currentTarget);
        }
    };
    Words.game.buttonDeselect = function(event) {
        if (!Words.game.interactionBlocked) {
            Words.views.deselect(event.currentTarget);
        }
    };

    Words.game.answerSelect = function(event) {
        var correctSelected = event.currentTarget.classList.contains("correct");
        if (!Words.game.learningMode || correctSelected) {
            Words.game.buttonSelect(event);
        }
    };

    Words.game.answerDeselect = function(event) {
        var currentAnswer = event.currentTarget;
        if (Words.game.interactionBlocked || !currentAnswer.classList.contains("active")) {
            return;
        }

        var correctSelected = currentAnswer.classList.contains("correct");
        if (correctSelected) {
            if (Words.game.learningMode) {
                Words.game.disableLearningMode();
            } else {
                Words.models.addHit();
                Words.game.updateScore();
            }
            Words.game.completeRound();
            setTimeout(Words.game.initRound, BUTTON_DELAY);
        } else {
            Words.models.addMiss();
            Words.game.updateScore();
            Words.game.enableLearningMode();
            setTimeout(Words.views.deactivateAnswer, BUTTON_DELAY);
        }
    };

    Words.game.blockInteraction = function() {
        Words.game.interactionBlocked = true;
    };

    Words.game.unblockInteraction = function() {
        Words.game.interactionBlocked = false;
    };

    Words.game.enableLearningMode = function() {
        Words.game.learningMode = true;
        Words.views.enableLearningMode();
    };

    Words.game.disableLearningMode = function() {
        Words.game.learningMode = false;
        Words.views.disableLearningMode();
    };


    var setupTerms = function() {
        var count = 6;

        var terms = Words.models.randomTerms(count);
        var targetIndex = Math.floor(Math.random() * count);
        Words.views.fillTerms(terms, targetIndex);
    };
}());
