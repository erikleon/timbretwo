define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform       = require('famous/core/Transform');
    var View            = require('famous/core/View');

    function StripView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createTitle.call(this);
        _createIcon.call(this);
    }

    StripView.prototype = Object.create(View.prototype);
    StripView.prototype.constructor = StripView;

    StripView.DEFAULT_OPTIONS = {
        angle: 0,
        width: 0,
        height: 0,
        title: '',
        iconUrl: '',
        fontSize: 26
    };

    function _createBacking() {
        var backSurface = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: 'black'
            }
        });

        var rotateModifier = new Modifier({
            transform: Transform.rotateZ(this.options.angle)
        });

        var skewModifier = new Modifier({
            transform: Transform.skew(0, 0, this.options.angle)
        });

        this._add(rotateModifier).add(skewModifier).add(backSurface);
    }

    function _createTitle() {
        var titleSurface = new Surface({
            content: this.options.title,
            properties: {
                color: 'white',
                fontSize: this.options.fontSize + 'px',
                textTransform: 'uppercase',
            }
        });

        var titleModifier = new Modifier({
            transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -4, 0])
        });

        this._add(titleModifier).add(titleSurface);
    };

    function _createIcon() {
        var iconSurface = new Surface({
            content: '<img width="32" src="' + this.options.iconUrl + '"/>'
        });

        var iconModifier = new Modifier({
            transform: Transform.translate(24, 2, 0)
        });

        this._add(iconModifier).add(iconSurface);
    };

    module.exports = StripView;
});
