define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var Timer           = require('famous/utilities/Timer');

    var StripView       = require('./StripView');
    var FeaturedView    = require('./FeaturedView');

    function MenuView() {
        View.apply(this, arguments);

        _createStripViews.call(this);
        _createFeaturedView.call(this);
    }

    MenuView.prototype = Object.create(View.prototype);
    MenuView.prototype.constructor = MenuView;

    MenuView.DEFAULT_OPTIONS = {
        angle: -0.2,
        stripWidth: 320,
        stripHeight: 54,
        topOffset: 37,
        stripOffset: 58,
        duration: 400,
        staggerDelay: 35
    };

    function _createStripViews() {
        this.stripModifiers = [];

        var stripData = [
            {title: 'search', iconUrl: '../img/strip-icons/search.png'},
            {title: 'starred', iconUrl: '../img/strip-icons/starred.png'},
            {title: 'friends', iconUrl: '../img/strip-icons/friends.png'},
            {title: 'settings', iconUrl: '../img/strip-icons/settings.png'}
        ];

        for(var i = 0; i < stripData.length; i++) {
            var stripView = new StripView({
                angle: this.options.angle,
                width: this.options.stripWidth,
                height: this.options.stripHeight,
                title: stripData[i].title,
                iconUrl: stripData[i].iconUrl
            });

            var yOffset = this.options.topOffset + this.options.stripOffset * i;

            var stripModifier = new Modifier({
                transform: Transform.translate(0, yOffset, 0)
            });

            this.stripModifiers.push(stripModifier);
            this._add(stripModifier).add(stripView);            
        }
    }

    function _createFeaturedView() {
        var featuredView = new FeaturedView({ angle: this.options.angle });

        this.featuredMod = new Modifier({
            transform: Transform.translate(0, 280, 0),
            opacity: 0
        });

        this._add(this.featuredMod).add(featuredView);
    }

    MenuView.prototype.resetStrips = function() {
        for(var i = 0; i < this.stripModifiers.length; i++) {
            var initX = -this.options.stripWidth;
            var initY = this.options.topOffset
                + this.options.stripOffset*i
                + this.options.stripWidth*Math.tan(-this.options.angle);

            this.stripModifiers[i].setTransform(Transform.translate(initX, initY, 0));
        }

        this.featuredMod.setOpacity(0);
    };

    MenuView.prototype.animateStrips = function() {
        this.resetStrips();

        for(var i = 0; i < this.stripModifiers.length; i++) {
            // use Timer.setTimeout instead of window.setTimeout
            // Time can be found in famous/utilities

            Timer.setTimeout(function(i) {
                var yOffset = this.options.topOffset + this.options.stripOffset * i;

                this.stripModifiers[i].setTransform(
                    Transform.translate( 0, yOffset, 0),
                    { duration: this.options.duration, curve: 'easeOut' });
            }.bind(this, i), i*this.options.staggerDelay);
        }

        Timer.setTimeout((function() {
            this.featuredMod.setOpacity(1, { duration: this.options.duration, curve: 'easeInOut' });
        }).bind(this), this.options.duration);
    };

    module.exports = MenuView;
});
