var app = {

    initialize: function() {
        $('body').html(new HomeView().render().el);
    }

};

app.initialize();