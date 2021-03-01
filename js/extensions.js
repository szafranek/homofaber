(function(){
    "use strict";

    NodeList.prototype.addEventListener = function(type, listener, useCapture) {
        var i;
        for (i = 0; i < this.length; i++) {
            this[i].addEventListener(type, listener, useCapture);
        }
    };

    NodeList.prototype.removeEventListener = function(type, listener, useCapture) {
        var i;
        for (i = 0; i < this.length; i++) {
            this[i].removeEventListener(type, listener, useCapture);
        }
    };
}());
