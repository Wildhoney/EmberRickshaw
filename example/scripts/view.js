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
            renderer: 'area',
            element: document.querySelector('.age-distribution-graph'),
            width: 500,
            height: 250,
            stroke: true,
            series: [{
                color: '#cae2f7',
                data: { collection: this.get('controller'), property: 'age' }
            }]
        });

        graph.render();

    }

});