/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 *
 *
 * options:
 *  - heading - string
 *
 *
 */

define([], function() {

    'use strict';

    var defaults = {
            instanceName: 'content',
            contentOptions: {},
            tabsData: null
        },

        templates = {
            skeleton: function() {
                return [
                    '<div id="content-tabs"></div>'
                ].join('');
            }
        },

        /**
         * trigger after initialization has finished
         *
         * @event sulu.content.[INSTANCE_NAME].initialized
         */
        INITIALIZED = function() {
            return createEventName.call(this, 'initialized');
        },

        /**
         * Creates the event names
         * @param postfix {string}
         * @returns {string}
         */
        createEventName = function(postfix) {
            return 'sulu.content.' + ((!!this.options.instanceName) ? this.options.instanceName + '.' : '') + postfix;
        };

    return {
        view: true,

        initialize: function() {

            // default
            this.options = this.sandbox.util.extend(true, {}, defaults, this.options);

            // skeleton
            this.html(templates.skeleton.call(this));

            // bind events (also initializes first component)
            this.bindCustomEvents();

            this.sandbox.emit(INITIALIZED.call(this));
        },

        /**
         * listens to tab events
         */
        bindCustomEvents: function() {
            // load component on start
            this.sandbox.on('husky.tabs.header.initialized', this.startTabComponent.bind(this));

            // load component after click
            this.sandbox.on('husky.tabs.header.item.select', this.startTabComponent.bind(this));
        },

        /**
         * gets called when tabs either got initialized or when tab was clicked
         * @param item
         */
        startTabComponent: function(item) {

            if (!item) {
                item = this.options.tabsData.items[0];
            }

            if (!item.forceReload && item.action === this.action) {
                this.sandbox.logger.log('page already loaded; no reload required!');
                return;
            }

            // resets store to prevent duplicated models
            this.sandbox.mvc.Store.reset();

            this.sandbox.stop('#content-tabs-component');

            this.sandbox.dom.append(this.$el, '<div id="content-tabs-component"></div>');

            if (!!item && !!item.contentComponent) {
                var options = this.sandbox.util.extend(true, {}, this.options.contentOptions, {el: '#content-tabs-component', reset: true }, item.contentComponentOptions);
                // start component defined by
                this.sandbox.start([
                    {name: item.contentComponent, options: options}
                ]);
            }

            if (!!item) {
                this.action = item.action;
            }
        }
    };
});
