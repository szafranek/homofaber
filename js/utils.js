var Words = window.Words || {};
Words.utils = Words.utils || {};

(function() {
    "use strict";

    Words.utils.closest = function(element, tagName, context) {
        if (element === context) {
            return false;
        }
        var closest = element.parentNode;
        while (closest !== context &&
            closest.tagName.toLowerCase() !== tagName.toLowerCase() &&
            closest.parentNode.nodeType === 1) {
            closest = closest.parentNode;
        }
        console.assert(closest.tagName.toLowerCase() === tagName.toLowerCase(), "tagName of the found element doesn't match.");
        return closest;
    };

    // Bernstein hash
    Words.utils.hash = function(key) {
        var hash, length, i;
        for (i = 0, hash = 0, length = key.length; i < length; i++) {
            hash = 33 * hash + key.charCodeAt(i);
        }
        return hash;
    };

}());
