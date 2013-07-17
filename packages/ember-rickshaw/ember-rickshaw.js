/**
 * @class Rickshaw.Graph.Ember
 * @param options {Object}
 * @constructor
 */
Rickshaw.Graph.Ember = function(options) {

    // Find the models that have been supplied. For the moment we only support one line, but will
    // support two or more in the near future.
    Ember.assert('You must supply the `collection` array in the `data` attribute.', !!options.collection);

    // Assert that we have the `property` object.
    Ember.assert('You must specify the property in the `data` attribute to use for the graph data.', !!options.series[0].data);

    var property    = options.series[0].data,
        models      = options.collection;

    // Take what we need.
    this.models     = models;
    this.properties = [];

    // Store the options, and create a blank data array to initially render before the models are inspected.
    this.options    = options;

    for (var seriesIndex in options.series) {

        if (options.series.hasOwnProperty(seriesIndex)) {

            // Keep a track of the properties we're after for each series line.
            this.properties.push(options.series[seriesIndex].data);

            // Initialise the series data with an empty data structure.
            options.series[seriesIndex].data = [{ x: 0, y: 0 }];

        }

    }

    // Configure the observers for updating the Rickshaw graph when a value changes.
    models.forEach(function(model) {

        // We need an observer on each of the properties we're watching, so we need to iterate over them.
        for (var property in this.properties) {
            if (this.properties.hasOwnProperty(property)) {
                // Add an observer for the property name. If the value changes, the graph will be automatically re-rendered.
                Ember.addObserver(model, this.properties[property], this, 'render');
            }
        }

    }, this);

    // Observe the length of the collection so the graph can re-render if models are added and/or removed.
    Ember.addObserver(models, 'length', this, 'render');

    if (Ember.isNone(options.element)) {
        // If we haven't specified the `element` option then we'll create a ghost DIV for testing purposes.
        this.options.element = document.createElement('div');

        // Let everybody know we're using Rickshaw in testing mode.
        Ember.Logger.info("We're using Rickshaw in testing mode and therefore nothing will be visible.");
    }

    // Keep a reference to the original Rickshaw graph object, since we're only
    // augmenting Rickshaw and not trying to replace it.
    delete this.options.collection;
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

    var allData = [];

    this.properties.forEach(function(property, propertyIndex) {

        var data = [];

        this.models.forEach(function(model, modelIndex) {

            // Iterate over each of the models and find the data based on the property we've specified.
            data.push({ x: modelIndex, y: parseFloat(model.get(property)) });

        }, this);

        // Set up the data, and then render the Rickshaw graph.
        this.options.series[propertyIndex].data = data;

        // Keep a track of all of the data.
        allData.push(data);

    }, this);

    console.log(this.options.series);

//    this.graph.render();
    return allData;

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

Rickshaw.Graph.Ember.prototype.ticks = function(index, propertyName) {
    var properties = this.models.mapProperty(propertyName);
    return properties[index];
};