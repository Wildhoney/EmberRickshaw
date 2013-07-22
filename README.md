Ember Rickshaw 0.1.0
================

Using the <a href="http://code.shutterstock.com/rickshaw/" target="_blank">Rickshaw</a> graphing library with Ember &ndash; utilising Ember's observer pattern to automatically update the Rickshaw graph when any value in the model changes, and even when models are added and/or removed from the collection.

Live Demo
----------------

An example of the automatic updating of graphs using Ember's observer pattern: https://dl.dropboxusercontent.com/sh/kgs9r55hguttkjf/qZ-pBUYz-a/example/dropbox/index.html.

Tutorial
----------------

You'll be glad to know that if you already know Rickshaw, we haven't changed anything! So how does it work? Well, instead of instantiating `Rickshaw.Graph`, instead instantiate `Rickshaw.Graph.Ember`.

```javascript
var graph = new Rickshaw.Graph.Ember({
    renderer: 'area',
    element: document.querySelector('.age-distribution-graph'),
    width: 500,
    height: 250,
    stroke: true,
    collection: this.get('controller'),
    series: [{
        color: '#cae2f7',
        property: 'age'
    }]
});
```

If you're perceptive, you'll notice the only difference is that instead of specifying the array for the `property` attribute, you're instead supplying the property name on the model &ndash; we also supply the `collection` attribute.

* `collection`: collection of models to take the data from;
* `property`: property name which we'll pluck from the collection;

Once you've configured the Rickshaw class, you can go ahead and manipulate your Ember models as you usually do, and `Rickshaw.Graph.Ember` will update itself when necessary.

<h3>Insufficient Data</h3>

Sometimes there is not enough data to create the graph, therefore to display a message when there is insufficient data, create a node with the class name `no-data` inside of your graph container (`age-distribution-graph` in the example) and we'll do the rest!

<h3>Multiple Series Lines</h3>

Rickshaw supports plotting multiple layers, and because Rickshaw supports it, so do we! By now it should be self-evident how this works if you're familiar with Rickshaw:

```javascript
var graph = new Rickshaw.Graph.Ember({
    renderer: 'bar',
    element: document.querySelector('.age-distribution-graph'),
    unstack: true,
    width: 500,
    height: 250,
    stroke: true,
    collection: this.get('controller'),
    series: [{
        color: '#afd55e',
        name: 'Age',
        property: 'age'
    }, {
        color: '#ba5ed5',
        name: 'Caught Mice',
        property: 'caughtMice'
    }]
});
```

You'll be happy to know that you can have as many groups as you like!

Writing Unit Tests
----------------

We make it easy for you to write unit tests for your graphs. Simply pass in the options minus the `element` item, and we'll create an empty node to use for testing.