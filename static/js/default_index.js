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
        $.post(add_user_url,
            {
                profile_email: self.vue.logged_in_user_email,
                profile_name: self.vue.current_user,
                profile_bio: self.vue.current_bio,
                profile_class_1: self.vue.current_class_1,
                profile_class_2: self.vue.current_class_2,
                profile_class_3: self.vue.current_class_3,
            },
        );
    };

    self.get_user = function() {
        $.getJSON(get_user_url,
            {
                profile_email: self.vue.logged_in_user_email
            },
            function(data) {
                self.vue.current_user = data.profile_name;
                self.vue.current_bio = data.profile_bio;
                self.vue.current_class_1 = data.profile_class_1;
                self.vue.current_class_2 = data.profile_class_2;
                self.vue.current_class_3 = data.profile_class_3;
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
    };

    self.submit_edit = function(){
        self.add_user();
        self.toggle_edit();
    };

    self.toggle_edit = function(){
        self.vue.editing = !self.vue.editing;
    };

    self.toggle_page_1 = function(){
        if(self.vue.create_group){
            self.search_users();
        } else {
            self.vue.create_group = !self.vue.create_group;
        }
    };

    self.search_users = function(){
        $.getJSON(search_users_url,
            {
                search: self.vue.search_query
            },
            function(data){
                self.vue.query_list = data.search_list;
                enumerate(self.vue.query_list);
            }
        );
    };

    self.toggle_home = function(){
        self.vue.create_group = false;
    };

    self.invite_user = function(user_idx){
        var u = self.vue.query_list[user_idx];
    }

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            current_email: [],
            current_user: "click edit to update name",
            current_bio: "click edit to update bio",
            current_class_1: "click edit to update classes",
            current_class_2: "click edit to update classes",
            current_class_3: "click edit to update classes",
            logged_in_user_email: [],
            editing: false,
            create_group: false,
            search_query: "",
            query_list: [],
        },
        methods: {
            get_email: self.get_email,
            add_user: self.add_user,
            get_user: self.get_user,
            toggle_edit: self.toggle_edit,
            submit_edit: self.submit_edit,
            toggle_page_1: self.toggle_page_1,
            toggle_home: self.toggle_home,
            invite_user: self.invite_user,
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
