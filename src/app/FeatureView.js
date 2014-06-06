define(function(require, exports, module) {
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var Timer               = require('famous/utilities/Timer');

    var HeaderFooterLayout  = require('famous/views/HeaderFooterLayout');
    
    var SearchView          = require('./SearchView');

    var SequentialLayout    = require('famous/views/SequentialLayout');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var ContainerSurface    = require('famous/surfaces/ContainerSurface');
    var ImageSurface        = require('famous/surfaces/ImageSurface');
    var EventHandler        = require('famous/core/EventHandler');

    function FeatureView() {
        View.apply(this, arguments);

        _createFeatureLayout.call(this);
        _createBacking.call(this);
        _setListeners.call(this);
    }

    FeatureView.prototype = Object.create(View.prototype);
    FeatureView.prototype.constructor = FeatureView;

    FeatureView.DEFAULT_OPTIONS = {};

    // Background ImageSurface
    // Should eventually be dynamically set based upon the clikced band 
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

        this.buttonSlide = function() {
    
            var headMod = this.headMod;
            var infoMod = this.infoContainerMod;
            var buttonMod = this.buttonMod;
            var shareMod = this.shareMod;
            var starMod = this.starMod;

            Timer.setTimeout(function(){
                headMod.setTransform(Transform.translate(0, 0, 0), {curve: "easeInOut", duration: 250});
                infoMod.setTransform(Transform.translate(15, 200, 0), {curve: "easeInOut", duration: 250});
                shareMod.setTransform(Transform.translate(215, 20, 2), {curve: "easeInOut", duration: 500});
                buttonMod.setTransform(Transform.translate(15, 20, 2), {curve: "easeInOut", duration: 500});
                starMod.setTransform(Transform.translate(115, 20, 1), {curve: "easeInOut", duration: 500});
            }, 1500);
        };

        this.resetButtons = function() {
            var headMod = this.headMod;
            var infoMod = this.infoContainerMod;
            var buttonMod = this.buttonMod;
            var shareMod = this.shareMod;
            var starMod = this.starMod;

            Timer.setTimeout(function(){
                headMod.setTransform(Transform.translate(0, -44, 0));
                infoMod.setTransform(Transform.translate(15, 244, 0));
                shareMod.setTransform(Transform.translate(-(90 + window.innerWidth), 20, 2));
                buttonMod.setTransform(Transform.translate(-(90 + window.innerWidth), 20, 2));
                starMod.setTransform(Transform.translate(-(90 + window.innerWidth), 20, 1));
            }, 1250);

        };
    }

    // Creates Feature Page
    function _createFeatureLayout() {

        var featureLayout = new HeaderFooterLayout({
            headerSize: 44,
            footerSize: 44,
        });

        // ContainerSurface to hold header surfaces
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

        this.headMod = new StateModifier({
            transform: Transform.translate(0, -44, 0),
        });

        this.searchToggle = new Surface({
            content: ' ' + '&lang; Search',
            size: [true, 44],
            properties: {
                color: 'white',
                fontSize: '1.25em',

            }
        });
        // Header Modifier
        this.toggleMod = new Modifier({
            transform: Transform.translate(10, 0, 0),
        });

        // ContainerSurface to hold body surfaces
        var layoutBody = new ContainerSurface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                
            }
        });

        // share button content array
        var buttonImg = [
            {iconUrl:'../img/web.png'},
            {iconUrl:'../img/star.png'},
            {iconUrl:'../img/share.png'},

        ];

        var webButton = new ImageSurface({
            size: [90, 90],
        });
        webButton.setContent('../img/web.png');

        var starButton = new ImageSurface({
            size: [90, 90],
        });
        starButton.setContent('../img/star.png');


        var shareButton = new ImageSurface({
            size: [90, 90],
        });
        shareButton.setContent('../img/share.png');


        // Share buttons modifiers
        this.buttonMod = new Modifier({
            transform: Transform.translate(-(90 + window.innerWidth), 20, 0),
        });
        this.starMod = new Modifier({
            transform: Transform.translate(-(90 + window.innerWidth), 20, 1),
        });
        this.shareMod = new Modifier({
            transform: Transform.translate(-(90 + window.innerWidth), 20, 2),
        });

        var infoContainer = new ContainerSurface({
            size: [290, 200],
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.77)',
            }
        });

        this.infoContainerMod = new StateModifier({
            transform: Transform.translate(15, 244, 1),
        });

        var subInfoContainer = new ContainerSurface({
            size: [290, 44],
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 1)',
            }
        });

        this.subInfoContainerMod = new Modifier({
            transform: Transform.translate(15, 399, 0),
        });

        var mapImg = new ImageSurface({
            size: [true, 20],
        });
        mapImg.setContent('../img/pin.png');
        this.mapImgMod = new Modifier({
            transform: Transform.translate(45, 10, 0),
        });

        var calImg = new ImageSurface({
            size: [true, 20],
        });
        calImg.setContent('../img/cal.png');
        this.calImgMod = new Modifier({
            transform: Transform.translate(150, 10, 0),
        });

        var pinLabel = new Surface({
            size: [true, true],
            content: 'Map',
            properties: {
                fontSize: '1em',
                color: 'white',
                fontFamily: 'GillSans', 
            }
        });

        this.pinLabelMod = new Modifier({
            transform: Transform.translate(65, 10, 0),
        });

        var calLabel = new Surface({
            size: [true, true],
            content: 'Calender',
            properties: {
                fontSize: '1em',
                color: 'white',
                fontFamily: 'GillSans', 
            }
        });

        this.calLabelMod = new Modifier({
            transform: Transform.translate(180, 10, 0),
        });


        subInfoContainer.add(this.mapImgMod).add(mapImg);
        subInfoContainer.add(this.pinLabelMod).add(pinLabel);
        subInfoContainer.add(this.calImgMod).add(calImg);
        subInfoContainer.add(this.calLabelMod).add(calLabel);


        // ContainerSurface to hold footer surfaces
        var layoutFoot = new ContainerSurface({
            size: [undefined, 44],
            properties: {
                backgroundColor: 'rgba(0, 0, 0, 0.77)',
            }
        });

        var iTunesLogo = new ImageSurface({
            size: [true, true],
        });
        iTunesLogo.setContent('../img/iTunesLogo.png');

        this.iTunesLogoMod = new Modifier({
            transform: Transform.translate(245, 10, 0),
        });

        var playPause = new ImageSurface({
            size: [true, true],
        });
        playPause.setContent('../img/pause.png');

        this.playPauseMod = new Modifier({
            transform: Transform.translate(15, 10, 0),
        });

        var songTitle = new Surface({
            size: [true, true],
            content: 'Australian Summer',
            properties: {
                fontSize: '1em',
                color: 'white',
                fontFamily: 'GillSans', 
            }
        });

        this.songTitleMod = new Modifier({
            transform: Transform.translate(45, 10, 0),
        });


        // Header Content and Modifier are added to Header Container Surface
        layoutHead.add(this.toggleMod.setOpacity(1)).add(this.searchToggle);

        // Body Content and Modifiers are added to Body Container Surface
        layoutBody.add(this.buttonMod).add(webButton);
        layoutBody.add(this.starMod).add(starButton);
        layoutBody.add(this.shareMod).add(shareButton);
        layoutBody.add(this.infoContainerMod).add(infoContainer);
        layoutBody.add(this.subInfoContainerMod).add(subInfoContainer);
        
        // Footer Content and Modifiers are added to Footer Container Surface
        layoutFoot.add(this.iTunesLogoMod).add(iTunesLogo);
        layoutFoot.add(this.playPauseMod).add(playPause);
        layoutFoot.add(this.songTitleMod).add(songTitle);
        



        // Adds header, body, and footer to layout view
        featureLayout.header.add(this.headMod).add(layoutHead);
        featureLayout.content.add(layoutBody);
        featureLayout.footer.add(layoutFoot);


        // Event Handler to work with _setListeners
        this.eventHandler = new EventHandler();
        this.searchToggle.pipe(this.eventHandler);
        this.secondEvent = new EventHandler();
        this.secondEvent.subscribe(FeatureView);


        // layout view modifier
        this.layoutMod = new StateModifier({origin: [0.5, 0.5]});

        // Adds the layout view to the App view
        this._add(this.layoutMod).add(featureLayout);
    }

    function _setListeners() {

        this.eventHandler.on('touchstart', function() {
            //console.log();
            this.toggleMod.setOpacity(0.5);
            this._eventOutput.emit('reset search');
        }.bind(this));

        this.eventHandler.on('touchend', function() {
            this._eventOutput.emit('menuToggle');
            this.toggleMod.setOpacity(1);
        }.bind(this));
    }

    module.exports = FeatureView;
});
