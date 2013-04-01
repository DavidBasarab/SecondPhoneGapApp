var HomeView = function(store) {

    this.findByName = function() {
        store.findByName($('.search-key').val(), function (employees) {
            $('.employee-list').html(HomeView.listTemplate(employees));
            if (self.iscroll) {
                self.iscroll.refresh();
            } else {
                self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false});
            }
        });
    };

    this.render = function () {
        this.el.html(HomeView.template);
        return this;
    };

    this.initialize = function () {
        this.el = $('<div />');
        this.el.on('keyup', '.search-key', this.findByName);
    };

    this.initialize();
}

HomeView.template = Handlebars.compile($('#home-template').html());
HomeView.listTemplate = Handlebars.compile($('#employee-list-template').html());