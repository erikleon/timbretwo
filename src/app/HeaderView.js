define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    function HeaderView() {
        View.apply(this, arguments);

        _createHeader.call(this);
        _setListeners.call(this);
    }

    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.constructor = HeaderView;

    function _createHeader() {
        var backgroundSurface = new Surface({
            size: [undefined, 44],
            properties: {
                backgroundColor: 'black'
            }
        });

        this._add(backgroundSurface);

        this.hamburgerSurface = new Surface({
            size: [44, 44],
            content: '<img width="44" src="../img/hamburger.png"/>'
        });

        this.searchSurface = new Surface({
            size: [232, 44],
            content: '<img width="232" src="../img/search.png"/>'
        });

        this.iconSurface = new Surface({
            size: [44, 44],
            content: '<img width="44" src="../img/icon.png"/>'
        });

        this.hamburgerModifier = new Modifier();

        this.searchModifier = new Modifier({
            origin: [0.5, 0]
        });

        this.iconModifier = new Modifier({
            origin: [1, 0]
        });

        this._add(this.hamburgerModifier).add(this.hamburgerSurface);
        this._add(this.searchModifier).add(this.searchSurface);
        this._add(this.iconModifier).add(this.iconSurface);
    }

    function _setListeners() {
        this.hamburgerSurface.on('touchstart', function() {
            this.hamburgerModifier.setOpacity(0.5);
        }.bind(this));

        this.hamburgerSurface.on('touchend', function() {
            this.hamburgerModifier.setOpacity(1);
            this._eventOutput.emit('menuToggle');
        }.bind(this));
    }

    module.exports = HeaderView;
});
