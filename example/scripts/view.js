/**
 * @module App
 * @class IndexView
 * @type Ember.View
 * @extends Ember.View
 */
App.IndexView = Ember.View.extend({

    didInsertElement: function() {

        this._super();

        var graph = new Rickshaw.Graph.Ember({
            element: document.querySelector('.age-distribution-graph'),
            renderer: 'scatterplot',
            width: 500,
            height: 250,
            stroke: true,
            collection: this.get('controller'),
            series: [{
                color: '#afd55e',
                name: 'Age',
                data: 'age'
            }, {
                color: '#ba5ed5',
                name: 'Caught Mice',
                data: 'caughtMice'
            }]
        });

        var x_ticks = new Rickshaw.Graph.Axis.X({
            graph: graph.toRickshaw(),
            orientation: 'bottom',
            element: document.querySelector('.age-distribution-graph'),
            pixelsPerTick: 100,
            tickFormat: function(index) {
                return graph.ticks(index, 'name');
            }
        });

//        new Rickshaw.Graph.HoverDetail({
//            graph: graph.toRickshaw(),
//            xFormatter: function(x) { return 'Cat: ' + x },
//            yFormatter: function(y) { return y }
//        });

        graph.render();

    }

});