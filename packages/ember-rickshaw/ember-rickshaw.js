/**
 * @module Rickshaw.Graph.Ember
 * @class Rickshaw.Graph.Ember
 * @param options {Object}
 * @constructor
 */
Rickshaw.Graph.Ember = function(options) {

    // Find the models that have been supplied. For the moment we only support one line, but will
    // support two or more in the near future.
    Ember.assert('You must supply the `collection` array in the `data` attribute.', !!options.collection);

    // Assert that we have the `property` object.
    Ember.assert('You must specify the `property` attribute to use for the graph data.', !!options.series[0].property);

    var collection      = options.collection,
        properties      = this.memoriseProperties(options);

    // Remove the `collection` property from the object because it's just polluting the standard Rickshaw object.
    delete options.collection;

    // Transform the property data into actual data from the collection.
    this.transformData.apply(options.series, [collection, properties]);

    if (Ember.isNone(options.element)) {

        // If we haven't specified the `element` option then we'll create a ghost DIV for testing purposes.
        options.element = document.createElement('div');

        // Let everybody know we're using Rickshaw in testing mode.
        Ember.Logger.info("We're using Rickshaw in testing mode and therefore nothing will be visible.");

    }

    // Instantiate the `Rickshaw.Graph` class that we use for the base object.
    var graph = new Rickshaw.Graph(options);

    /**
     * @class RickshawEmberKlass
     * @param collection {Array}
     * @param properties {Array}
     * @constructor
     */
    function RickshawEmberKlass(collection, properties) {

        this.collection = collection;
        this.properties = properties;

        // Configure the observers so that when a property changes, the `render` method is invoked.
        this.setupObservers();

    }

    /**
     * @class RickshawGraphKlass
     * @param options {Object}
     * @constructor
     */
    function RickshawGraphKlass(options) {
        this.options = options;
    }

    // Configure the prototypal inheritance as the following:
    // RickshawEmberKlass -> RickshawGraphKlass -> Rickshaw.Graph -> Object
    RickshawGraphKlass.prototype = graph;
    RickshawEmberKlass.prototype = new RickshawGraphKlass(options);

    /**
     * @property rickshaw
     * @type {Rickshaw.Graph}
     * Base `Rickshaw.Graph` class.
     */
    RickshawGraphKlass.prototype.rickshaw       = graph;

    /**
     * @method transformData
     * Take the data from the models based on the property to create the data.
     * @return {Array}
     */
    RickshawEmberKlass.prototype.transformData  = Rickshaw.Graph.Ember.prototype.transformData;

    /**
     * @method render
     * Rendering the Rickshaw graph based on the model data.
     * @return {void}
     */
    RickshawEmberKlass.prototype.render         = function render() {

        // Transform the data again because something has changed.
        this.transformData.apply(this.options.series, [this.collection, this.properties]);

        // Grab the element, the SVG element, and the `no-data` attribute, if it exists.
        var element = $(this.element),
            svg     = element.find('svg'),
            message = element.find('.no-data');

        if (this.count() === 0) {
            // Hide the graph if there is no data.
            svg.hide();

            if (message) {
                message.show();
            }

            return;
        }

        // Render the graph!
        svg.show();

        if (message) {
            message.hide();
        }

        // Finally we can call the `render` method on the original Rickshaw class.
        this.rickshaw.render();

    };

    /**
     * @method count
     * Count how many items of data there are in total.
     * @return {Number}
     */
    RickshawEmberKlass.prototype.count          = function count() {

        var length = 0;

        for (var seriesIndex in this.options.series) {
            if (this.options.series.hasOwnProperty(seriesIndex) && isFinite(seriesIndex)) {
                length = length + this.options.series[seriesIndex].data.length;
            }
        }

        return length;

    };

    /**
     * @method ticks
     * @param index {Integer}
     * @param propertyName {String}
     * Used for creating the X axis with custom labels from the model(s).
     * @return {String,Integer}
     */
    RickshawEmberKlass.prototype.ticks          = function ticks(index, propertyName) {

        var properties = this.collection.mapProperty(propertyName);
        return properties[index];

    };

    /**
     * @method setupObservers
     * Add an observer to each of the properties that we're watching.
     * @return {void}
     */
    RickshawEmberKlass.prototype.setupObservers = function() {

        // We need an observer on each of the properties we're watching, so we need to iterate over them.
        for (var propertyIndex in this.properties) {

            if (this.properties.hasOwnProperty(propertyIndex)) {
                // Add an observer for the property name. If the value changes, the graph will be automatically re-rendered.
                Ember.addObserver(this.collection, '@each.%@'.fmt(this.properties[propertyIndex]), this, 'render');
            }

        }

        // Observe the length of the collection so the graph can re-render if models are added and/or removed.
        Ember.addObserver(this.collection, 'length', this, 'render');

    };

    // Instantiate the `RickshawEmberKlass` class with our collection and properties.
    return new RickshawEmberKlass(collection, properties);

};

/**
 * @module Rickshaw.Graph.Ember
 * @property prototype
 * @type {Object}
 */
Rickshaw.Graph.Ember.prototype = {

    /**
     * @method memoriseProperties
     * @param options {Object}
     * Take all of the properties that were asked to be observed, and drop them into an array for later use.
     * @return {Array}
     */
    memoriseProperties: function(options) {

        var properties = [];

        for (var seriesIndex in options.series) {
            if (options.series.hasOwnProperty(seriesIndex)) {
                // Keep a track of the properties we're after for each series line.
                properties.push(options.series[seriesIndex].property);
            }
        }

        return properties;

    },

    /**
     * @method transformData
     * Take the data from the models based on the property to create the data.
     * @return {Array}
     */
    transformData: function(collection, properties) {

        var allData = [];

        properties.forEach(function(property, propertyIndex) {

            var data = [];

            collection.forEach(function(model, modelIndex) {

                // Detect if the value we're dealing with is a number, otherwise we'll reset it to zero.
                var value = parseFloat(model.get(property));
                value = (isNaN(value) ? 0 : value);

                // Iterate over each of the models and find the data based on the property we've specified.
                data.push({ x: modelIndex, y: value });

            }, this);

            // Set up the data, and then render the Rickshaw graph.
            this[propertyIndex].data = data;

            // Keep a track of all of the data.
            allData.push(data);

        }, this);

        return allData;

    }

};