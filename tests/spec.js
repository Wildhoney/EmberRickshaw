describe('Ember Rickshaw', function() {

    var graph = new Rickshaw.Graph.Ember({
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

    it ('Is an instance of Rickshaw.Graph.Ember', function() {
        expect(graph instanceof Rickshaw.Graph).toBeTruthy();
    });

    it ('It can access the prototype to get the original object', function() {
        expect(typeof graph.onUpdate).toEqual('function');
    });

    it ('It can set the data from any given model(s)', function() {
        expect(graph.models.length).toEqual(1);
        expect(graph.models[0].get('name') === 'Kipper').toBeTruthy();
    });

});