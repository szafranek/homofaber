var Words = window.Words || {};
Words.models = Words.models || {};

(function() {
    "use strict";

    Words.models.reset = function() {
        Words.models.hits = 0;
        Words.models.misses = 0;
    };

    Words.models.addHit = function() {
        Words.models.hits++;
    };

    Words.models.addMiss = function() {
        Words.models.misses++;
    };

    Words.models.randomTerms = function(count) {
        var i, randomIndex,
            selectedIndices = [], selectedTerms = [];
        var terms = Words.data.terms;
        var getRandomIndex = function() {
            return Math.floor(Math.random() * terms.length);
        };
        for(i = 0; i < count; i++) {
            randomIndex = getRandomIndex();
            while (selectedIndices.indexOf(randomIndex) !== -1) {
                randomIndex = getRandomIndex();
            }
            selectedIndices.push(randomIndex);
            selectedTerms.push(terms[randomIndex]);
        }

        return selectedTerms;
    };
}());
