define(function(require, exports, module) {
    var Surface             = require('famous/core/Surface');
    var Modifier            = require('famous/core/Modifier');
    var Transform           = require('famous/core/Transform');
    var View                = require('famous/core/View');
    var Engine              = require('famous/core/Engine');

    var HeaderView          = require('./HeaderView');

    var ContainerSurface    = require('famous/surfaces/ContainerSurface');
    var SequentialLayout    = require('famous/views/SequentialLayout');
    var ScrollView          = require('famous/views/ScrollView');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var EventHandler        = require('famous/core/EventHandler');
    var Transitionable      = require("famous/transitions/Transitionable");

    function SearchView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createHeaderView.call(this);
        _createBody.call(this);
    }

    SearchView.prototype = Object.create(View.prototype);
    SearchView.prototype.constructor = SearchView;

    SearchView.DEFAULT_OPTIONS = {
        nameArray: [],
        targetElement: '',
    };


    function _createBacking() {
        var backing = new Surface({
            properties: {
                backgroundColor: 'whitesmoke',
            }
        });

        this._add(backing);

        this.listAssemble = function() {
            var axis = this.xPos;
            var l = this.nameSurfaces.length;
            var nameMods = this.nameMods;
            var lineMods = this.lineMods;
            var whereTo = this.nameTrans;
            for (var i = 0; i < l; i++){
                nameMods[i].setTransform(Transform.translate(whereTo[i].get(), 0, 1), {curve: "easeInOut", duration: 2000});
                lineMods[i].setTransform(Transform.translate(0, 0, 0), {curve: "easeInOut", duration: 2000});
            }
        };
    }

    function _createHeaderView() {
        this.headerView = new HeaderView();

        this.headerMod = new Modifier({
            transform: Transform.translate(0, 0, 2),
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

        var lineLengths = [];

        var marginCorrected = [];

        this.nameSurfaces = [];

        this.lineSurfaces = [];

        this.nameMods = [];

        this.lineMods = [];

        this.nameTrans = [];

        this.xPos = [];

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

            this.offsetTransitionable = new Transitionable(marginRand);
            this.nameTrans.push(this.offsetTransitionable);

            //console.log(offsetTransitionable);

            this.nameSurface = new Surface({
                size: [bandNames[i].name.length * 11, ((window.innerHeight - 44) / 12) - 15],
                content: bandNames[i].name,
                properties: {
                    backgroundColor: 'black',
                    color: 'whitesmoke',
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    //marginLeft: '' + marginRand + 'px',
                    fontSize: '1.25em',
                }
            });

            this.nameSurface.index = i;

            this.nameSurfaces.push(this.nameSurface);

            lineLengths.push(marginRand);

            var rightMargin = Math.floor((window.innerWidth - lineLengths[i])); //- (bandNames[i].name.length * 11)); 

            var axis = 0;

            if (lineLengths[i] < 95){
                marginCorrected.push(rightMargin);
                var axis = 1;
                this.xPos.push(axis);
            } else {
                marginCorrected.push(lineLengths[i]);
                var axis = 0;
                this.xPos.push(axis);
            }


            this.nameLines = new Surface({
                size: [marginCorrected[i], 3],
                properties: {
                    backgroundColor: 'black',
                    marginTop: '10px,',
                }
            });

            this.nameLines.index = i;

            this.lineSurfaces.push(this.nameLines);

            this.lineState = new StateModifier({origin: [this.xPos[i], 0.5]});
            this.nameState = new StateModifier({origin: [0, 0.5]});
            this.lineMod = new StateModifier();
            this.nameMod = new Modifier({transform: Transform.translate(this.offsetTransitionable.get(), 0, 1)});

            this.nameMod.index = i;
            this.nameMods.push(this.nameMod);

            this.lineMod.index = i;
            this.lineMods.push(this.lineMod);

            this.temp.add(this.nameState).add(this.nameMod).add(this.nameSurface);
            this.temp.add(this.lineState).add(this.lineMod).add(this.nameLines);

            this.scrollView.subscribe(this.temp);

            this.nameSurface.on('touchstart', function(i) {
                this.listBreak(this.nameSurfaces, this.nameTrans, this.nameMods, this.xPos, this.lineMods, this.lineSurfaces, i);
                this._eventOutput.emit('menuToggle');
                this._eventOutput.emit('jaRock');

            }.bind(this, i));

        }

        this.add(new Modifier({ transform: Transform.translate(0, 44, 0)})).add(this.scrollView);
    }

    SearchView.prototype.listBreak = function(nameSurfaces, transitionable, nameMods, origin, lineMods, lines, i) {
        var l = nameSurfaces.length;
        var clicked = nameSurfaces[i].index;
        var value;

        // Surfaces moving to Right

        for (var x = 0; x < clicked; x++){

            var value = -window.innerWidth;
            var leftPos = new Transitionable(value);
            var endValue = window.innerWidth;
            var rightPos = new Transitionable(endValue);
            var lineLeft = new Transitionable(value);
            var lineRight = new Transitionable(endValue);

            if (origin[x] == 0){
                nameMods[x].setTransform(Transform.translate(leftPos.get(), 0, 0), {curve: "easeInOut", duration: 500});
                lineMods[x].setTransform(Transform.translate(lineLeft.get(), 0, 0), {curve: "easeInOut", duration: 500});

            } else {
                nameMods[x].setTransform(Transform.translate(rightPos.get(), 0, 0), {curve: "easeInOut", duration: 500});
                lineMods[x].setTransform(Transform.translate(lineRight.get(), 0, 0), {curve: "easeInOut", duration: 500});
            }
        }

        // Surfaces moving to Left

        for (var x = clicked + 1; x < l; x++){
            var value = -window.innerWidth;
            var leftPos = new Transitionable(value);
            var endValue = window.innerWidth;
            var rightPos = new Transitionable(endValue);
            var lineLeft = new Transitionable(value);
            var lineRight = new Transitionable(endValue);
            
            if (origin[x] == 0){
                nameMods[x].setTransform(Transform.translate(leftPos.get(), 0, 0), {curve: "easeInOut", duration: 500});
                lineMods[x].setTransform(Transform.translate(lineLeft.get(), 0, 0), {curve: "easeInOut", duration: 500});

            } else {
                nameMods[x].setTransform(Transform.translate(rightPos.get(), 0, 0), {curve: "easeInOut", duration: 500});
                lineMods[x].setTransform(Transform.translate(lineRight.get(), 0, 0), {curve: "easeInOut", duration: 500});
            }
        }   

        // Removes the line of the clicked object

        lines[i].setSize([0, 0]);

        
    };

    module.exports = SearchView;
});
