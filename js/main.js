var app = {

    route: function () {
        var self = this;
        var hash = window.location.hash;

        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }

            return;
        }

        var match = hash.match(this.detailsURL);

        if(match) {
            this.store.findById(Number(match[1]), function (employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
        }
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

    slidePage: function (page) {
        var currentPageDest;
        var self = this;

        // If there is no current page (app just started) -> No transition: Position new page in view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Clean up: removing old pages that were moved out of the view port
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page == app.homePage) {
            // Always apply a back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = 'stage-right';
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = 'stage-left';
        }

        $('body').append(page.el);

        // Wait until the new page bas been added to the DOM . . .
        setTimeout(function () {
            // Side out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });
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