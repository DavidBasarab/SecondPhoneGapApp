var app = {

    route: function () {
        var hash = window.location.hash;
        var match = hash.ma(app.detailsURL);
    },

    initialize: function () {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.store = new MemoryStore(function () {
            $('body').html(new HomeView(self.store).render().el);
        });
    }

};

app.initialize();