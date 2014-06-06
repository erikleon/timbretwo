define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var GenericSync     = require('famous/inputs/GenericSync');
    var Transitionable  = require('famous/transitions/Transitionable');
    var Timer           = require('famous/utilities/Timer');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var EventHandler    = require('famous/core/EventHandler');

    var SearchView        = require('./SearchView');
    var FeatureView        = require('./FeatureView');

    function AppView() {
        View.apply(this, arguments);

        _createSearchView.call(this);
        _createFeatureView.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        posThreshold: 138,
        velThreshold: 0.75,
        transition: {
            duration: 300,
            curve: 'easeOut'            
        }
    };

    function _createSearchView() {
        this.searchView = new SearchView();

        this.searchView.on('menuToggle', this.toggleMenu.bind(this));

        this.menuToggle = false;

        this.searchMod = new Modifier();

        this._add(this.searchMod).add(this.searchView);


        this.searchView.on('jaRock', function(){
            this.featureView.buttonSlide();
        }.bind(this));


    }

    function _createFeatureView() {
        this.featureView = new FeatureView();

        this.menuToggle = false;

        this.featureMod = new StateModifier({
            transform: Transform.translate(window.innerWidth, 0, 3)
        });

        this._add(this.featureMod).add(this.featureView);
        
        this.featureView.on('menuToggle', this.toggleMenu.bind(this));

        this.featureView.on('reset search', function(){
            this.searchView.listAssemble();
            this.featureView.resetButtons();
        }.bind(this));
        
    }

    AppView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.slideRight();
        } else {
            Timer.setTimeout(this.slideLeft.bind(this), 500);
            //this.featureView.animateStrips();
        }
        this.menuToggle = !this.menuToggle;
    };

    AppView.prototype.slideLeft = function() {
        var startPos = window.innerWidth;
        var featureSlide = new Transitionable(startPos);
        //console.log(this.featureMod);
        this.featureMod.setTransform(Transform.translate(0, 0, 3), {curve: "easeIn", duration: 1000});
        this.searchMod.setTransform(Transform.translate(-window.innerWidth, 0, 0), {curve: "easeIn", duration: 1000});
        
    };

    AppView.prototype.slideRight = function() {
        this.featureMod.setTransform(Transform.translate(window.innerWidth, 0, 3), {curve: "easeIn", duration: 1000});
        this.searchMod.setTransform(Transform.translate(0, 0, 0), {curve: "easeIn", duration: 1000});
    };

    module.exports = AppView;
});
