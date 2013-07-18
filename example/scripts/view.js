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
            renderer: 'bar',
            unstack: true,
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

        new Rickshaw.Graph.Axis.Y({
            graph: graph,
            orientation: 'right',
            pixelsPerTick: 20,
            element: document.querySelector('.age-distribution-graph')
        });

        new Rickshaw.Graph.Axis.X({
            graph: graph,
            orientation: 'bottom',
            element: document.querySelector('.age-distribution-graph'),
            pixelsPerTick: 100,
            tickFormat: function(index) {
                return graph.ticks(index, 'name');
            }
        });

//        var legend = new Rickshaw.Graph.Legend({
//            graph: graph,
//            element: document.querySelector('.legend')
//        });
//
//        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
//            graph: graph,
//            legend: legend
//        });

//        new Rickshaw.Graph.HoverDetail({
//            graph: graph,
//            xFormatter: function(x) { return 'Cat: ' + x },
//            yFormatter: function(y) { return y }
//        });

        graph.render();

    }

});