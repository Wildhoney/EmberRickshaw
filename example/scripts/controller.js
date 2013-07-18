/**
 * @module App
 * @class IndexController
 * @type Ember.ArrayController
 * @extends Ember.ArrayController
 */
App.IndexController = Ember.ArrayController.extend({

    noData: false,

    init: function() {

        var kipper      = Ember.Object.create({ name: 'Kipper', age: 17, caughtMice: 12 }),
            mango       = Ember.Object.create({ name: 'Mango', age: 8, caughtMice: 18 }),
            splodge     = Ember.Object.create({ name: 'Splodge', age: 10, caughtMice: 21 }),
            missKittens = Ember.Object.create({ name: 'Miss Kittens', age: 2, caughtMice: 14 }),
            busters     = Ember.Object.create({ name: 'Busters', age: 3, caughtMice: 11 });

        this.set('content', [kipper, mango, splodge, missKittens, busters]);

        this._super();

    },

    addCat: function() {

        var name    = prompt('Name the little darling:'),
            age     = prompt('How many years old is %@?'.fmt(name)),
            caught  = prompt('And how many mice has %@ caught?'.fmt(name));

        this.pushObject(Ember.Object.create({ name: name, age: parseInt(age), caughtMice: parseInt(caught) }));

    },

    deleteCat: function(model) {
        this.removeObject(model);
    },

    incrementCaughtMice: function(model) {
        model.incrementProperty('caughtMice');
    }

});