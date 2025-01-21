(function(window) {
    'use strict';

    function DOM(selector) {
        this.element = document.querySelector(selector);
    }

    DOM.prototype.on = function(event, callback) {
        this.element.addEventListener(event, callback, false);
    }

    DOM.prototype.get = function() {
        return this.element;
    }

    DOM.prototype.append = function(child) {
        this.element.appendChild(child);
    }

    DOM.prototype.html = function(content) {
        this.element.innerHTML = content;
    }

    window.DOM = DOM;
    
})(window);