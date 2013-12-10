define([], function() {

    'use strict';

    return function(app) {
        app.components.before('initialize', function() {
            if (!!this.content) {
                this.sandbox.util.load(this.content.url)
                    .then(function(data) {
                        var contentNavigation = JSON.parse(data);

                        // show navigation submenu
                        this.sandbox.sulu.navigation.parseContentNavigation(contentNavigation, this.options.id, function(navigation) {
                            this.sandbox.start([
                                {
                                    name: 'content@suluadmin',
                                    options: {
                                        el: this.options.el,
                                        tabsData: navigation,
                                        heading: this.sandbox.translate(this.content.title),
                                        contentOptions: {
                                            id: this.options.id
                                        }
                                    }
                                }
                            ]);
                        }.bind(this));
                    }.bind(this));
            }
        });
    };

});
