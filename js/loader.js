var Words = window.Words || {};
Words.loader = Words.loader || {};
Words.data = Words.data || {};

(function() {
    "use strict";


    Words.loader.loadTerms = function(filename) {
        var request = new XMLHttpRequest();
        request.open("GET", filename, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var lines = this.responseText.split("\n");
                var i, length;
                Words.data.terms = [];
                for (i = 0, length = lines.length; i < length; i++) {
                    Words.data.terms.push(lines[i].split(" - "));
                }
            } else {
                alert("Server returned error code: " + this.status);
            }
        };
        request.send();
    };
}());