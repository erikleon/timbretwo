define(function(require, exports, module) {
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var Timer               = require('famous/utilities/Timer');

    var HeaderFooterLayout  = require('famous/views/HeaderFooterLayout');

    var StripView           = require('./StripView');
    var FeaturedView        = require('./FeaturedView');

    var SequentialLayout    = require('famous/views/SequentialLayout');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var ContainerSurface    = require('famous/surfaces/ContainerSurface');
    var ImageSurface        = require('famous/surfaces/ImageSurface');

    function FeatureView() {
        View.apply(this, arguments);

        _createFeatureLayout.call(this);
        _createBacking.call(this);
        //_createFeaturedView.call(this);
    }

    FeatureView.prototype = Object.create(View.prototype);
    FeatureView.prototype.constructor = FeatureView;

    FeatureView.DEFAULT_OPTIONS = {};

    function _createBacking() {
        var backImg = new ImageSurface({
            size: [undefined, undefined],
            properties: {
            }
        });

        backImg.setContent('../img/balue.png');

        this.backImgMod = new Modifier({
            transform: Transform.translate(0, 0, -1)
        });

        this._add(this.backImgMod).add(backImg);
    }

    function _createFeatureLayout() {
        var featureLayout = new HeaderFooterLayout({
            headerSize: 44,
            footerSize: 44,
        });

        var layoutHead = new ContainerSurface({
            size: [undefined, 44],
            content: "Header",
            properties: {
                lineHeight: "44px",
                textAlign: "center",
                color: 'whitesmoke',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                //opacity: 0.5,
            }
        });

        var layoutBody = new ContainerSurface({
            size: [undefined, undefined],
            content: "Content",
            //classes: ["grey-bg"],
            properties: {
                lineHeight: '150px',
                textAlign: "center",
                backgroundColor: 'rgba(255, 255, 255, 0)',
                
            }
        });

        var layoutFoot = new ContainerSurface({
            size: [undefined, 44],
            //classes: ["red-bg"],
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.77)',
                //opacity: 0.5,                
            }
        });

        var searchToggle = new Surface({
            content: '&lang; Search',
            size: [70, 44],
            properties: {
                color: 'white',
                fontSize: '1.25em',

            }
        });

        this.toggleMod = new StateModifier({
            // transform: Transform.translate(25, 0, 0);
        });

        var buttonLayout = new SequentialLayout({
            direction: 0,
            size: [undefined, 120],
            properties: {}
        });

        var shareButtons = [];

        var buttonImg = [
            {iconUrl:'../img/web.png'},
            {iconUrl:'../img/star.png'},
            {iconUrl:'../img/share.png'},

        ];

        var webButton = new Surface({
            size: [90, 90],
            content: '<img width="50" src="' + buttonImg[0].iconUrl + '" />',
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                //margin: '20px',
                // origin: [0.5, 0.5],
            }
        });

        var starButton = new Surface({
            size: [90, 90],
            content: '<img width="50" src="' + buttonImg[1].iconUrl + '"/>',
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                //margin: '20px',
                //origin: [0.5, 0.5],
            }
        });

        var shareButton = new Surface({
            size: [90, 90],
            content: '<img width="50" src="' + buttonImg[2].iconUrl + '"/>',
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                //margin: '20px',
                //origin: [0.5, 0.5],
            }
        });

        this.buttonMod = new Modifier();

        this.starMod = new Modifier();

        this.shareMod = new Modifier();


        layoutBody.add(this.buttonMod.setTransform(Transform.translate(10, 20, 0))).add(webButton);
        layoutBody.add(this.starMod.setTransform(Transform.translate(116, 20, 1))).add(starButton);
        layoutBody.add(this.shareMod.setTransform(Transform.translate(220, 20, 2))).add(shareButton);
        

        layoutHead.add(this.toggleMod.setOpacity(1)).add(searchToggle);




        featureLayout.header.add(layoutHead);
        featureLayout.content.add(layoutBody);
        featureLayout.footer.add(layoutFoot);



        this.layoutMod = new StateModifier({origin: [0.5, 0.5]});

        this._add(this.layoutMod).add(featureLayout);
    }

    /*FeatureView.prototype.resetStrips = function() {
        for(var i = 0; i < this.stripModifiers.length; i++) {
            var initX = -this.options.stripWidth;
            var initY = this.options.topOffset
                + this.options.stripOffset*i
                + this.options.stripWidth*Math.tan(-this.options.angle);

            this.stripModifiers[i].setTransform(Transform.translate(initX, initY, 0));
        }

        this.featuredMod.setOpacity(0);
    };

    FeatureView.prototype.animateStrips = function() {
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
    };*/

    module.exports = FeatureView;
});
