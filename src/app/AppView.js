define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');
    var GenericSync     = require('famous/inputs/GenericSync');
    var Transitionable  = require('famous/transitions/Transitionable');

    var SearchView        = require('./SearchView');
    var FeatureView        = require('./FeatureView');

    function AppView() {
        View.apply(this, arguments);

        _createSearchView.call(this);
        _createFeatureView.call(this);
        //_handleTouch.call(this);
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
        //this.searchView.on('menuToggle', this.toggleMenu.bind(this));

        //this.menuToggle = false;
        this.searchMod = new Modifier();

        this._add(this.searchMod).add(this.searchView);
    }

    function _createFeatureView() {
        this.featureView = new FeatureView();

        this.featureMod = new Modifier({
            transform: Transform.translate(320, 0, 0)
        });

        this._add(this.featureMod).add(this.featureView);
    }
/*
    function _handleTouch() {
        this.pageViewPos = new Transitionable(0);

        this.sync = new GenericSync(function() {
            return this.pageViewPos.get(0);
        }.bind(this), {direction: GenericSync.DIRECTION_X});

        this.searchView.pipe(this.sync);

        this.sync.on('update', function(data) {
            if(this.pageViewPos.get() === 0 && data.p > 0) {
                this.FeatureView.animateStrips();
            }

            this.pageViewPos.set(Math.max(0, data.p));
        }.bind(this));

        this.sync.on('end', (function(data) {
            var velocity = data.v;
            var position = this.pageViewPos.get();

            if(this.pageViewPos.get() > this.options.posThreshold) {
                if(velocity < -this.options.velThreshold) {
                    this.slideLeft();
                } else {
                    this.slideRight();
                }
            } else {
                if(velocity > this.options.velThreshold) {
                    this.slideRight();
                } else {
                    this.slideLeft();
                }
            }
        }).bind(this));
    }*/

    /*AppView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.slideLeft();
        } else {
            this.slideRight();
            this.featureView.animateStrips();
        }
        this.menuToggle = !this.menuToggle;
    };

    AppView.prototype.slideLeft = function() {
        this.pageViewPos.set(0, this.options.transition, function() {
            this.menuToggle = false;
        }.bind(this));
    };

    AppView.prototype.slideRight = function() {
        this.pageViewPos.set(276, this.options.transition, function() {
            this.menuToggle = true;
        }.bind(this));
    };

    AppView.prototype.render = function() {
        this.spec = [];

        this.spec.push({
            // opacity: 0.5,
            // size: [300, 300],
            transform: Transform.translate(0, 0, -1),
            target: this.featureView.render()
        });

        this.spec.push({
            transform: Transform.translate(this.pageViewPos.get(), 0, 0),
            target: this.searchView.render()
        });

        return this.spec;
    };*/

    module.exports = AppView;
});
