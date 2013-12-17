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
        heading: '',
        tabsData: null,
        instanceName: 'content'
        },

        initializeTabs = function() {
            if (this.options.tabsData && this.options.tabsData.items <= 1) {
                // TODO: do not show tabs if just one item available
            }

            // initialize tabs
            this.sandbox.start([
                {
                    name: 'tabs@husky',
                    options: {
                        el: '#content-tabs',
                        data: this.options.tabsData,
                        instanceName: this.options.instanceName,
                        forceReload: false,
                        forceSelect: true
                    }
                }
            ]);
        },

        initializeToolbar = function() {

            this.sandbox.start([
                {
                    name: 'page-functions@husky',
                    options: {
                        el: '#page-functions',
                        data: {
                            icon: 'chevron-left'
                        }
                    }
                },
                {
                    name: 'edit-toolbar@suluadmin',
                    options: {
                        el: '#toolbar',
                        instanceName: this.options.instanceName,
                        forceReload: false
                    }
                }
            ]);
        };

    return {
        view: true,

        initialize: function() {

            // default
            this.options = this.sandbox.util.extend(true, {}, defaults, this.options);

            // skeleton
            this.sandbox.dom.html(this.options.el, '<div id="edit-toolbar"><div id="page-functions"></div><div id="toolbar"></div></div><div class="content-tabs-content"><h1>' + this.options.heading + '</h1><div id="content-tabs" /><div id="content-tabs-component" /></div>');

            // bind events (also initializes first component)
            this.bindCustomEvents();

            // initialize toolbar
            initializeToolbar.call(this);

            // initialize tabs
            initializeTabs.call(this);
        },

        /**
         * listens to tab events
         */
        bindCustomEvents: function() {
            var instanceName = (this.options.instanceName && this.options.instanceName !== '') ? this.options.instanceName + '.' : '';
            // load component on start
            this.sandbox.on('husky.tabs.' + instanceName + 'initialized', this.startTabComponent.bind(this));
            // load component after click
            this.sandbox.on('husky.tabs.' + instanceName + 'item.select', this.startTabComponent.bind(this));

            // back clicked
            this.sandbox.on('husky.page-functions.clicked', function() {
                this.sandbox.emit('sulu.edit-toolbar.back');
            }.bind(this));
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
                this.sandbox.logger.log("page already loaded; no reload required!");
                return;
            }

            this.sandbox.dom.html('#content-tabs-component', '<span class="is-loading" />');

            // resets store to prevent duplicated models
            this.sandbox.mvc.Store.reset();

            if (!!item && !!item.contentComponent) {
                var options = this.sandbox.util.extend(true, {}, this.options.contentOptions, {el: '#content-tabs-component'}, item.contentComponentOptions);
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