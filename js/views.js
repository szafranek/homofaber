var Words = window.Words || {};
Words.views = Words.views || {};

(function() {
    "use strict";

    var wordListCache;

    Words.views.fillTerms = function(terms, targetIndex) {
        var lis = document.querySelectorAll(".answers>li");
        var i;
        for (i = 0; i < lis.length; i++) {
            lis[i].classList.toggle("correct", i === targetIndex);
            lis[i].classList.toggle("wrong", i !== targetIndex);
            lis[i].querySelector("div").innerHTML = terms[i][1];
        }
        document.querySelector(".target").innerHTML = terms[targetIndex][0];
    };

    Words.views.deactivateAnswer = function() {
        var li = document.querySelector(".answers>li.active");
        if (li) {
            Words.views.deselect(li);
        }
    };

    Words.views.select = function(element) {
        element.classList.add("active");
    };

    Words.views.deselect = function(element) {
        element.classList.remove("active");
    };

    Words.views.updateHits = function(score) {
        document.querySelector(".hits .value").innerHTML = score;
    };

    Words.views.updateMisses = function(score) {
        document.querySelector(".misses .value").innerHTML = score;
    };

    Words.views.enableLearningMode = function() {
        var answers = document.querySelector(".answers");
        answers.classList.add("learningMode");
    };
    Words.views.disableLearningMode = function() {
        var answers = document.querySelector(".answers");
        answers.classList.remove("learningMode");
    };

    Words.views.hideAllAnswers = function() {
        var answers = document.querySelector(".answers");
        answers.classList.add("hide");
    };

    Words.views.showAllAnswers = function() {
        var answers = document.querySelector(".answers");
        answers.classList.remove("hide", "learningMode");
    };

    Words.views.hideTarget = function() {
        var target = document.querySelector(".screen.game .target");
        target.classList.add("hide");
    };

    Words.views.showTarget = function() {
        var target = document.querySelector(".screen.game .target");
        target.classList.remove("hide");
    };

    // Navigation
    Words.views.goToScreen = function(newScreenClass) {
        var bodyClasses = document.body.classList;
        var screens = document.querySelectorAll(".screens>.screen");
        var i, j;
        for (i = 0; i< bodyClasses.length; i++) {
            for (j = 0; j < screens.length; j++) {
                if (screens[j].classList.contains(bodyClasses[i]) && bodyClasses[i] !== newScreenClass) {
                    bodyClasses.remove(bodyClasses[i]);
                }
            }
        }
        document.body.classList.add(newScreenClass);
    };

    // Word Practice
    Words.views.createPracticeContent = function(terms) {
        var wordsContainer = document.querySelector(".screen.practice .words");
        if (!wordListCache) {
            var docFragment = document.createDocumentFragment();
            var ul = document.createElement("ul");

            var offset = 100;
            terms.slice(0, offset).forEach(function(term) {
                addTermLi(ul, term);
            });
            docFragment.appendChild(ul);
            wordListCache = docFragment;
        }
        wordsContainer.appendChild(wordListCache.cloneNode(true));

        var i;
        var batchSize = 100;
        var limit = Math.ceil(terms.length / batchSize);
        for (i = 0; i < limit; i++) {
            var slice = terms.slice(offset + i * batchSize, offset + (i + 1) * batchSize);
            setTimeout(createRemainingWords, i * 500, slice);
        }

    };

    Words.views.detachPracticeContent = function() {
        var wordList = document.querySelector(".screen.practice .words>ul");
        wordList.parentNode.removeChild(wordList);
    };

    /** Private */
    var addTermLi = function(parent, term) {
        var li = document.createElement("li");
        var original = document.createElement("div");
        original.className = "original";
        original.innerHTML = term[0];

        var translated = document.createElement("div");
        translated.className = "translated";
        translated.innerHTML = term[1];

        var score = document.createElement("div");
        score.className = "score";
        var i;
        for (i = 0; i < 4; i++) {
            var bar = document.createElement("span");
            bar.className = "bar";
            if (Math.random() > 0.5) {
                bar.classList.add("wrong");
            }
            score.appendChild(bar);
        }
        li.appendChild(original);
        li.appendChild(translated);
        li.appendChild(score);
        parent.appendChild(li);
    };

     var createRemainingWords = function(remainingTerms) {
         var docFragment = document.createDocumentFragment();
         remainingTerms.forEach(function(term) {
             addTermLi(docFragment, term);
         });

         var wordList = document.querySelector(".screen.practice .words>ul");
         wordList.appendChild(docFragment);
     };

}());
