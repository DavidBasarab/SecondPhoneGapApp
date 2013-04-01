var HomeView = function() {
    this.initialize = function () {
        this.el = $('<div />');
    };

    this.render = function () {
        this.el.html(HomeView.template);
        return this;
    };

    this.initialize();
}

HomeView.template = Handlebars.compile($('#home-template').html());