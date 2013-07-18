Ember Rickshaw 0.1.0
================

Using the <a href="http://code.shutterstock.com/rickshaw/" target="_blank">Rickshaw</a> graphing library with Ember &ndash; utilising Ember's observer pattern to automatically update the Rickshaw graph when any value in the model changes, and even when models are added and/or removed from the collection.


Tutorial
----------------

You'll be glad to know that if you already know Rickshaw, we haven't changed anything! So how does it work? Well, instead of instantiating `Rickshaw.Graph`, instead instantiate `Rickshaw.Graph.Ember`.

    var graph = new Rickshaw.Graph.Ember({
        renderer: 'area',
        element: document.querySelector('.age-distribution-graph'),
        width: 500,
        height: 250,
        stroke: true,
        collection: this.get('controller'),
        series: [{
            color: '#cae2f7',
            data: 'age'
        }]
    });

If you're perceptive, you'll notice the only difference is that instead of specifying the array for the `data` attribute, you're instead supplying the property name on the model.

Once you've configured the Rickshaw class, you can go ahead and manipulate your Ember models as you usually do, and `Rickshaw.Graph.Ember` will update itself when necessary.

Sometimes there is not enough data to create the graph, therefore to display a message when there is insufficient data, create a node with the class name `no-data` inside of your graph container (`age-distribution-graph` in the example) and we'll do the rest!