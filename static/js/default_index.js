// This is the js for the default/index.html view.
var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // function that gets the email of the current user
    self.get_email = function(){
        $.getJSON(get_user_email_url,
            function(data) {
                self.vue.logged_in_user_email = data;
            }
        );
    };






    return self;
};

var APP = null;

// No, this would evaluate it too soon.
// var APP = app();

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
