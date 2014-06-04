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
    var StateModifier       = require('famous/modifiers/StateModifier');
    var EventHandler        = require('famous/core/EventHandler');

    function SearchView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createHeaderView.call(this);
        _createBody.call(this);
        _setListeners.call(this);
    }

    SearchView.prototype = Object.create(View.prototype);
    SearchView.prototype.constructor = SearchView;

    SearchView.DEFAULT_OPTIONS = {
        nameArray: [],
    };


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

        this.headerMod = new Modifier({
            transform: Transform.translate(0, 0, 1),
        });

        this.subscribe(this.headerView);

        this._add(this.headerMod).add(this.headerView);
    }

    function _createBody() {
        this.scrollView = new ScrollView();

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

        this.scrollView.sequenceFrom(searchResults);

        this.temp;

        this.eventHandler = new EventHandler();

        var lineLengths = [];

        var marginCorrected = [];

        this.nameSurfaces = [];

        var xPos = [];

        for (var i = 0; i < bandNames.length; i++) {
            // console.log((window.innerHeight - 44) / 11);

            this.temp = new ContainerSurface({
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

            this.temp.pipe(this.scrollView);
            searchResults.push(this.temp);

            var marginRand = Math.floor((Math.random() * 175) + 1);

            this.nameSurface = new Surface({
                size: [bandNames[i].name.length * 11, ((window.innerHeight - 44) / 12) - 15],
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

            this.options.nameArray.push(this.nameSurface);

            lineLengths.push(marginRand);

            var rightMargin = Math.floor((window.innerWidth - lineLengths[i]) - (bandNames[i].name.length * 11)); 

            var axis = 0;

            if (lineLengths[i] < 95){
                marginCorrected.push(rightMargin);
                var axis = 1;
                xPos.push(axis);
            } else {
                marginCorrected.push(lineLengths[i]);
                var axis = 0;
                xPos.push(axis);
            }

            this.nameLines = new Surface({
                size: [marginCorrected[i], 3],
                properties: {
                    backgroundColor: 'black',
                    marginTop: '10px,',
                }
            });

            //console.log(marginCorrected);

            this.lineState = new StateModifier({origin: [xPos[i], 0.5]});

            this.nameState = new StateModifier({origin: [0, 0.5]});

            this.temp.add(this.nameState).add(this.nameSurface);
            this.temp.add(this.lineState).add(this.nameLines);

            this.scrollView.subscribe(this.temp);
            this.nameSurface.pipe(this.eventHandler);

        }

        this.add(new Modifier({ transform: Transform.translate(0, 44, 0),})).add(this.scrollView);
    }

    function _setListeners() {
        this.eventHandler.on('touchstart', function() {
            this.tagetElement = event.target;
            //console.log(event.target);
            console.log(this.nameSurfaces);
        }.bind(this));

        this.eventHandler.on('touchend', function() {
            this._eventOutput.emit('animateList');
            this._eventOutput.emit('menuToggle');
            console.log('zzzzz');
            SearchView.prototype.animateList(this);
        }.bind(this));
    }

    SearchView.prototype.animateList = function() {
        if(this.animateList) {
            this.listBreak();
        } else {
            this.listAssemble();
            //this.featureView.animateStrips();
        }
        this.animateList = !this.animateList;
    };

    SearchView.prototype.listBreak = function() {
        console.log(this.options.nameArray);
        var l = this.options.nameArray.length;
        for (var i = 0; i < l; i++){
            if (nameSurfaces[i] != this.tagetElement){

            } else {

            }
        }
    };

    SearchView.prototype.listAssemble = function() {
        console.log('xxxx');
    };

    // function _setListeners() {
    //     this._eventInput.on('menuToggle', function() {
    //         this._eventOutput.emit('menuToggle');
    //     }.bind(this));
    // }

    module.exports = SearchView;
});
