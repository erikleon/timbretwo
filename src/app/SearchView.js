define(function(require, exports, module) {
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var Engine              = require('famous/core/Engine');

    var HeaderView          = require('./HeaderView');
    var NamesView           = require('./NamesView');

    var ContainerSurface    = require('famous/surfaces/ContainerSurface');
    var SequentialLayout    = require('famous/views/SequentialLayout');
    var ScrollView          = require('famous/views/ScrollView');

    function SearchView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createHeaderView.call(this);
        _createBody.call(this);
        //_setListeners.call(this);
    }

    SearchView.prototype = Object.create(View.prototype);
    SearchView.prototype.constructor = SearchView;

    function _createBacking() {
        var backing = new Surface({
            properties: {
                backgroundColor: 'whitesmoke',
                //boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }
        });

        this._add(backing);
    }

    function _createHeaderView() {
        this.headerView = new HeaderView();

        this.subscribe(this.headerView);

        this._add(this.headerView);
    }

    function _createBody() {
        var scrollView = new ScrollView();

        var containerSurface = new ContainerSurface({
            size: [undefined, window.innerHeight - 44],
            properties: {
                overflow: 'hidden',
            }
        });

        var searchLayout = new SequentialLayout();

        var searchResults = [];

        var bandNames = [
            {name: 'COLIN meloy'},
            {name: 'common'},
            {name: 'EVVY'},
            {name: 'Jeremih'},
            {name: 'Schoolboy Q'},
            {name: 'BALUE'},
            {name: 'My.Head'},
            {name: 'DRAKE'},
            {name: 'son Little'},
            {name: 'crooked colours'},
            {name: 'Broods'},
            {name: 'Chrome sparks'},
            {name: 'EVVY'},
            {name: 'Jeremih'},
            {name: 'Schoolboy Q'},
            {name: 'BALUE'},
            {name: 'My.Head'},
            {name: 'DRAKE'},
            {name: 'son Little'},
            {name: 'crooked colours'},
            {name: 'Broods'},
            {name: 'Chrome sparks'},
            {name: 'EVVY'},
            {name: 'Jeremih'},
            {name: 'Schoolboy Q'},
            {name: 'BALUE'},
            {name: 'My.Head'},
            {name: 'DRAKE'},
            {name: 'son Little'},
            {name: 'crooked colours'},
            {name: 'Broods'},
            {name: 'Chrome sparks'},            
        ];

        containerSurface.add(scrollView);
        scrollView.sequenceFrom(searchResults);

        var temp; 

        var lineLengths = [];

        for (var i = 0; i < bandNames.length; i++) {
            // console.log((window.innerHeight - 44) / 11);

            temp = new ContainerSurface({
                size: [undefined, ((window.innerHeight - 44) / 12)],
                properties: {
                    backgroundColor: 'white',
                    color: 'whitesmoke',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    position: 'fixed',
                    //margin: '20px',
                }
            });

            temp.pipe(scrollView);
            searchResults.push(temp);

            var marginRand = Math.floor((Math.random() * 175) + 1);

            var nameSurface = new Surface({
                size: [bandNames[i].name.length * 11, ((window.innerHeight - 44) / 12) - 10],
                content: bandNames[i].name,
                properties: {
                    backgroundColor: 'black',
                    color: 'whitesmoke',
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    marginLeft: '' + marginRand + 'px',
                    fontSize: '1.25em',
                }
            });

            

            lineLengths.push(marginRand);

            var nameLines = new Surface({
                size: [lineLengths[i], 5],
                properties: {
                    backgroundColor: 'black',
                }
            });

            console.log(lineLengths);

            temp.add(nameSurface);
            temp.add(nameLines);
        }

        this.add(new Modifier({ transform: Transform.translate(0, 44, 0),})).add(scrollView);
        /*this.bodySurface = new Surface({
            content: '<img width="' + window.innerWidth + '" src="../img/body.png"/>'
        });

        this.bodySurface.pipe(this._eventOutput);

        this.bodyModifier = new Modifier({
            transform: Transform.translate(0, 44, 0)
        });

        this._add(this.bodyModifier).add(this.bodySurface);*/
    }

    function _setListeners() {
        this._eventInput.on('menuToggle', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));
    }

    module.exports = SearchView;
});
