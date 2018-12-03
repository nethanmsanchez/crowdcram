// This is the js for the default/index.html view.
var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings


        // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};

    self.add_user = function() {
        console.log(self.vue.current_user);
        $.post(add_user_url,
            {
                profile_name: self.vue.current_user,
                profile_bio: self.vue.current_bio,
                profile_classes: self.vue.current_classes,
            },
        );
    };

    self.get_user = function() {
        $.getJSON(get_user_url,
            {
                profile_email: self.vue.logged_in_user_email
            },
            function(data) {
                self.vue.current_user= data.profile_name;
                self.vue.current_bio = data.profile_bio;
                self.vue.current_classes = data.profile_classes;
            }
        );
    };

























    // function that gets the email of the current user
    self.get_email = function(){
        $.getJSON(get_user_email_url,
            function(data) {
                self.vue.logged_in_user_email = data;
            }
        );
        //console.log(self.vue.logged_in_user_email);
    };

    self.submit_edit = function(){
        self.toggle_edit();
    };

    self.toggle_edit = function(){
        console.log(this.editing);
        this.editing = !this.editing;
    };


    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            current_email: [],
            current_user: "click edit to update name",
            current_bio: "click edit to update bio",
            current_classes: "click edit to update classes",
            logged_in_user_email: [],
            editing: false,
        },
        methods: {
            get_email: self.get_email(),
            //add_user: self.add_user(),
            get_user: self.get_user(),
            //toggle_edit: self.toggle_edit()
            //submit_edit: self.submit_edit(),
        }

    });

    self.get_email();
    self.get_user();

    return self;
};

var APP = null;

// No, this would evaluate it too soon.
// var APP = app();

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
