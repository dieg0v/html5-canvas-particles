/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/
 */

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = ( function() {

          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                  };
        })();

}

