var Animate = function(objectId, className) {
    var object = document.getElementById(objectId);

    // If object is mounted and animatable:
    if (object) {
        // Add class with animation.
        object.classList.add(className);

        // Remove animation class.
        setTimeout(function() {
            object.classList.remove(className);
        }, 1000);
    }
};


module.exports = Animate;
