/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

require.config({
    paths: {
        'app-config': 'components/app-config/main',
        'cultures': 'vendor/globalize/cultures',
        'husky': 'vendor/husky/husky',
        'aura_extensions/backbone-relational': 'aura_extensions/backbone-relational',
        'aura_extensions/sulu-content-tabs': 'aura_extensions/sulu-content-tabs',
        'aura_extensions/sulu-extension': 'aura_extensions/sulu-extension',
        'type/collection-component': 'components/single-row-collection/collection-component-type',

        '__component__$app@suluadmin': 'components/app/main',
        '__component__$content@suluadmin': 'components/content/main',
        '__component__$overlay@suluadmin': 'components/overlay/main',
        '__component__$header@suluadmin': 'components/header/main',
        '__component__$list-toolbar@suluadmin': 'components/list-toolbar/main',
        '__component__$labels@suluadmin': 'components/labels/main',
        '__component__$grid-group@suluadmin': 'components/grid-group/main',
        '__component__$single-row-collectionp@suluadmin': 'components/single-row-collection/main'
    },
    include: [
        'app-config',
        'aura_extensions/backbone-relational',
        'aura_extensions/sulu-content',
        'aura_extensions/sulu-extension',
        'type/collection-component',

        '__component__$app@suluadmin',
        '__component__$app@suluadmin',
        '__component__$content@suluadmin',
        '__component__$overlay@suluadmin',
        '__component__$header@suluadmin',
        '__component__$list-toolbar@suluadmin',
        '__component__$labels@suluadmin',
        '__component__$single-row-collection@suluadmin',
        '__component__$grid-group@suluadmin'
    ],
    exclude: [
        'husky'
    ]
});

require(['husky', 'app-config'], function(Husky, AppConfig) {

    'use strict';

    var language = AppConfig.getUser().locale,
        app;

    require(['text!/admin/bundles', 'text!/js/translations/sulu.' + language + '.json'], function(text, messagesText) {
        var bundles = JSON.parse(text),
            messages = JSON.parse(messagesText);

        app = new Husky({
            debug: {
                enable: AppConfig.getDebug()
            },
            culture: {
                name: language,
                messages: messages
            }
        });


        bundles.forEach(function(bundle) {
            app.use('/bundles/' + bundle + '/js/main.js');
        }.bind(this));

        app.use('aura_extensions/backbone-relational');
        app.use('aura_extensions/sulu-content');
        app.use('aura_extensions/sulu-extension');

        app.components.addSource('suluadmin', '/bundles/suluadmin/js/components');

        app.use(function(app) {
            window.App = app.sandboxes.create('app-sandbox');
        });

        app.start();
    });
});
