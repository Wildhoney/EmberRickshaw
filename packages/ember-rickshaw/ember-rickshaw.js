/**
 * @class Rickshaw.Graph.Ember
 * @param options {Object}
 * @constructor
 */
Rickshaw.Graph.Ember = function(options) {

    // Find the models that have been supplied. For the moment we only support one line, but will
    // support two or more in the near future.
    Ember.assert('You must supply the `collection` array in the `data` attribute.', !!options.series[0].data.collection);

    // Assert that we have the `property` object.
    Ember.assert('You must specify the `property` in which to use for the graph data.', !!options.series[0].data.property);

    var data        = options.series[0].data,
        models      = data.collection,
        property    = data.property;

    models.forEach(function(model) {
        // Add an observer for the property name. If the value changes, the graph will be automatically re-rendered.
        Ember.addObserver(model, property, this, 'render');
    }, this);

    // Observe the length of the collection so the graph can re-render if models are added and/or removed.
    Ember.addObserver(models, 'length', this, 'render');

    // Take what we need.
    this.models     = models;
    this.property   = property;

    // Store the options, and create a blank data array to initially render before the models are inspected.
    this.options            = options;
    options.series[0].data  = [{ x: 0, y: 0 }];

    if (Ember.isNone(options.element)) {
        // If we haven't specified the `element` option then we'll create a ghost DIV for testing purposes.
        this.options.element = document.createElement('div');

        // Let everybody know we're using Rickshaw in testing mode.
        Ember.Logger.info("We're using Rickshaw in testing mode and therefore nothing will be visible.");
    }

    // Keep a reference to the original Rickshaw graph object, since we're only
    // augmenting Rickshaw and not trying to replace it.
    this.graph = new Rickshaw.Graph(this.options);

};

Rickshaw.Graph.Ember.prototype.toRickshaw = function() {

    // Since we're masquerading as Rickshaw, we'll return the actual graph instance we're using from the constructor.
    return this.graph;

};

/**
 * @method setData
 * Take the data from the models based on the property to create the data.
 * @return {Array}
 */
Rickshaw.Graph.Ember.prototype.setData = function() {

    var data = [];

    this.models.forEach(function(model, index) {
        // Iterate over each of the models and find the data based on the property we've specified.
        data.push({ x: index, y: parseFloat(model.get(this.property)) });
    }, this);

    // Set up the data, and then render the Rickshaw graph.
    this.options.series[0].data = data;
    this.graph.render();
    return data;

};

/**
 * @method render
 * Rendering the Rickshaw graph based on the model data.
 * @return {void}
 */
Rickshaw.Graph.Ember.prototype.render = function() {

    this.setData();
    this.graph.render();

};