describe('Ember Rickshaw', function() {

    var graph;

    beforeEach(function() {

        graph = new Rickshaw.Graph.Ember({
            renderer: 'area',
            width: 500,
            height: 250,
            stroke: true,
            collection: [Ember.Object.create({ name: 'Kipper', age: 17 })],
            series: [{
                color: '#cae2f7',
                data: 'age'
            }]
        });

    });

    it ('Is an instance of Rickshaw.Graph.Ember', function() {
        expect(graph instanceof Rickshaw.Graph.Ember).toBeTruthy();
    });

    it ('It can access the Rickshaw.Graph instance', function() {
        expect(graph.toRickshaw() instanceof Rickshaw.Graph).toBeTruthy();
    });

    it ('It can set the data from any given model(s)', function() {
        expect(graph.models.length).toEqual(1);
        expect(graph.models[0].get('name') === 'Kipper').toBeTruthy();
    });

});