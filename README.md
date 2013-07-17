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
        series: [{
            color: '#cae2f7',
            models: this.get('controller'),
            property: 'age'
        }]
    });

If you're perceptive, you'll notice the only difference is that you don't specify the `data` attribute, but instead the `models` and `property` attributes.