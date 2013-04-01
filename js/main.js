var app = {

    route: function () {
        var hash = window.location.hash;
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function (employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
            return;
        }

        $('body').html(new HomeView(this.store).render().el);
    },

    registerEvents: function () {
        var self = this;

        $(window).on('hashchange', $.proxy(this.route, this));
    },

    initialize: function () {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.store = new MemoryStore(function () {
            self.route();
        });

        this.registerEvents();
    }

};

app.initialize();