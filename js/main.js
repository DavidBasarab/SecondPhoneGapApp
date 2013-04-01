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
        // Check of browswer supports touch events . . .
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // If yes: register touch event listen to change the selected state of the item
            $('body').on('touchstart', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // if not: register mouse events instead
            $('body').on('mousedown', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        }

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