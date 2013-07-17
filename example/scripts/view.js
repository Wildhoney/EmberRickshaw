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

        graph.render();

        new Rickshaw.Graph.HoverDetail({
            graph: graph.toRickshaw(),
            xFormatter: function(x) { return 'Cat: ' + x },
            yFormatter: function(y) { return y }
        });

    }

});