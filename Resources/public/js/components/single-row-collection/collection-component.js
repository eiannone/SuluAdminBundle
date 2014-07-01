/*
 * This file is part of the Husky Validation.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 *
 */

define([
    'type/default',
    'form/util'
], function(Default) {

    'use strict';

    return function($el, options) {
        var defaults = {
                id: 'id',
                label: 'value',
                required: false
            },

            typeInterface = {
                setValue: function(data) {

                    if (data === undefined || data === '' || data === null) {
                        return;
                    }

                    this.$el.attr('data-aura-data', data);
                },

                needsValidation: function() {
                    var val = this.getValue()
                    return !!val;
                },

                validate: function() {
                    var value = this.getValue();
                    if (typeof value === 'object' && value.hasOwnProperty('id')) {
                        return !!value.id;
                    } else {
                        return value !== '' && typeof value !== 'undefined';
                    }
                }
            };

        return new Default($el, defaults, options, 'husky-select', typeInterface);
    };
});
