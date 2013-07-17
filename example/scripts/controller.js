/**
 * @module App
 * @class IndexController
 * @type Ember.ArrayController
 * @extends Ember.ArrayController
 */
App.IndexController = Ember.ArrayController.extend({

    init: function() {

        var kipper      = Ember.Object.create({ name: 'Kipper', age: 17 }),
            mango       = Ember.Object.create({ name: 'Mango', age: 8 }),
            splodge     = Ember.Object.create({ name: 'Splodge', age: 10 }),
            missKittens = Ember.Object.create({ name: 'Miss Kittens', age: 2 }),
            busters     = Ember.Object.create({ name: 'Busters', age: 3 });

        this.set('content', [kipper, mango, splodge, missKittens, busters]);

        this._super();

    }

});