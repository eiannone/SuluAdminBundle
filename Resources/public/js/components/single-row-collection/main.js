/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 *
 */

/**
 * @class single-line-collection
 *
 */

define([], function () {

    'use strict';

    var defaults = {
            emptyLabel: 'add.new.line',
            emptyTemplate: null,
            data: [
                {
                    street: 'street',
                    number: '1',
                    zip: '6900',
                    city: 'Bregenz',
                    country: {
                        id: 1,
                        name: 'autria'
                    },
                    deliveryAddress: true,
                    billingAddress: true
                }
            ],
            template: '{street} {number} - {addition}, {zip}, {country} ({deliveryAddress}, {billingAddress})',
            mappings: {
                primaryAddress: {
                    'true': 'primary address'
                }
            },
            extraAttributes: {
                country: {
                    'data-type': 'readOnly-select',
                    'data-type-id-property': 'id',
                    'data-type-output-property': 'name',
                    'data-type-data': [
                        {id: 1, name: 'Austria'},
                        {id: 2, name: 'Germany'}
                    ]
                }
            }
        },

        constants = {
            editDeleteIcon: 'fa-minus-circle',
            editUndoDeleteIcon: 'fa-plus-circle'
        },

        templates = {
            empty: function () {
                return [
                    '<div></div>'
                ].join('');
            },
            span: function () {
                return [
                    '<span data-form="true" data-mapper-property="<%= mapperProperty %>" ></span>'
                ].join('');
            },
            skeleton: function () {
                return [
                    '<div data-mapper-property="street"> render tender</div>'
                ].join('');
            }
        },

        eventNamespace = 'sulu.single-line-collection.',

        /**
         * error label event
         *
         * @event sulu.single-line-collection.initialized
         */
        INITIALIZED = function () {
            return createEventName.call(this, 'initialized');
        },

        /**
         * Removes the clicked address
         */
//        removeElement = function ($el) {
//            var mapperID = this.sandbox.dom.data(this.sandbox.dom.closest($el, constants.addressComponentSelector), 'mapper-id');
//            this.sandbox.form.removeFromCollection(this.form, mapperID);
//            this.sandbox.emit(EVENT_CHANGED.call(this));
//            this.sandbox.emit(EVENT_REMOVED_ADDRESS.call(this));
//        },

        generateSpan = function () {

        },

        createEventName = function (postFix) {
            return eventNamespace + postFix;
        };

    return {
        view: true,

        initialize: function () {

            var dataType;

            this.options = this.sandbox.util.extend(true, {}, defaults, this.options);

            // check if data-mapper-property is set
            // FIXME: change in new husky-validation
            if (!this.sandbox.dom.attr('data-mapper-property')) {
                this.sandbox.logger.log('no data-mapper-property defined!');
                return;
            }
            // check if data-type === collection, else set it to collection
            if (!(dataType = this.sandbox.dom.attr('data-type')) && dataType !== 'collection') {
                this.sandbox.dom.attr('data-type', 'collection');
            }


            this.render();

            INITIALIZED.call(this);
        },

        render: function () {

            var result,
                span,
                searchPattern = /{([a-zA-Z]+)}/,
                template = this.options.template;
            // render template

            // as long as finding words between braces {}
            while ((result = template.match(searchPattern)) !== null) {
                // generate span
                span = this.sandbox.util.template(templates.span.call(this), {
                    mapperProperty: result[1]
                });
                template = template.replace(searchPattern, span);
                console.log('TEMPLATE',template);
            }


            this.html(templates.skeleton.call(this));

        },

        /**
         * Bind custom related events
         */
        bindCustomEvents: function () {

        }
    };
});
