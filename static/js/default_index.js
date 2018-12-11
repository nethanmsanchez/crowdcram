// This is the js for the default/index.html view.
var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings


    // Extends an array
    self.extend = function (a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function (v) {
        var k = 0;
        return v.map(function (e) {
            e._idx = k++;
        });
    };

    self.add_user = function () {
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

    self.get_user = function () {
        $.getJSON(get_user_url,
            {
                profile_email: self.vue.logged_in_user_email
            },
            function (data) {
                self.vue.current_user = data.profile_name;
                self.vue.current_bio = data.profile_bio;
                self.vue.current_class_1 = data.profile_class_1;
                self.vue.current_class_2 = data.profile_class_2;
                self.vue.current_class_3 = data.profile_class_3;
            }
        );
    };


    self.get_invites = function () {
        $.getJSON(get_invites_url,
            {
                profile_email: self.vue.logged_in_user_email
            },
            function (data) {
                self.vue.invite_list = data.invite_list;
                self.vue.crowd_list = data.crowd_list;
                enumerate(self.vue.crowd_list);
            }
        );
    };

    self.get_crowd = function() {
        $.getJSON(get_crowd_url,
            {

            },
            function(data) {
            self.vue.crowd_list2 = data.crowd_list2;
            enumerate(self.vue.crowd_list2);
            //self.vue.crowd_list2.splice(crowd_idx,1)
            }
        )
    };

    self.leave_group = function(crowd_idx){
        var c = self.vue.crowd_list2[crowd_idx];
        $.getJSON(leave_group_url,
            {
                crowd_id: c.crowd_id,
                num_members: c.num_members,
                profile_email: c.profile_email,
                crowd_mem_num: c.crowd_mem_num,
            }
        );
        self.vue.crowd_list2.splice(crowd_idx,1)
        enumerate(self.vue.crowd_list2);
    };

    self.join_group = function(crowd_idx) {
        var c = self.vue.crowd_list[crowd_idx];
        $.getJSON(join_groups_url,
            {
                crowd_id: c.crowd_id,
                num_members: c.num_members,
            }
        );
        self.delete_invite(crowd_idx);
    };

    self.delete_invite = function(crowd_idx){
        c = self.vue.crowd_list[crowd_idx];
        self.vue.crowd_list.splice(crowd_idx,1);
        enumerate(self.vue.crowd_list);
        $.getJSON(delete_invite_url,
            {
                crowd_id: c.crowd_id,
                invite_id: c.invite_id,
            }
        )
    };

    self.delete_group = function(crowd_idx){
        c = self.vue.crowd_list2[crowd_idx];
        self.vue.crowd_list2.splice(crowd_idx,1);
        enumerate(self.vue.crowd_list2);
        $.getJSON(delete_group_url,
            {
                crowd_id: c.crowd_id,
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
            self.search_users();// maybe take out
        } else {
            self.vue.create_group = !self.vue.create_group;
        }
    };

    self.search_users = function(){
        $.getJSON(search_users_url,
            {
                search: self.vue.crowd_class
            },
            function(data){
                self.vue.query_list = data.search_list;
                enumerate(self.vue.query_list);
            }
        );
    };

    self.toggle_home = function(){
        self.vue.create_group = false;
        self.vue.show_users = false;
    };

    self.invite_user = function(user_idx){
        var u = self.vue.query_list[user_idx];
        $.post(invite_user_url,
            {
                profile_email: u.profile_email,
                crowd_id: self.vue.crowd_id,
            },
        );
    };

    self.submit_group = function(){
        $.post(add_group_url,
            {
                crowd_date: self.vue.crowd_date,
                crowd_time: self.vue.crowd_time,
                crowd_location: self.vue.crowd_location,
                crowd_class: self.vue.crowd_class,
            },
            function(data){
                self.vue.crowd_id = data.crowd_id;
            }
        );
        //********************************************
        self.search_users();//might need to move this ******************
        self.vue.show_users = true;
    };

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
            show_users: false,
            search_query: "",
            crowd_id: "",
            query_list: [],
            invite_list: [],
            crowd_list: [],
            crowd_list2: [],
            crowd_date: "Please enter a date for your study group",
            crowd_time: "Please enter a time for your study group",
            crowd_location: "Please enter a location for your study group",
            crowd_class: "Please enter a class for your study group",
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
            submit_group: self.submit_group,
            join_group: self.join_group,
            delete_invite: self.delete_invite,
            leave_group: self.leave_group,
            delete_group: self.delete_group,
        }
    });

    self.get_email();
    self.get_user();
    self.get_invites();
    self.get_crowd();
    //console.log(self.vue.invite_list[0]);
    //console.log(self.vue.invite_list[1].crowd_id);
    //self.get_crowd(self.vue.invite_list[0].crowd_id);

    return self;
};

var APP = null;

// No, this would evaluate it too soon.
// var APP = app();

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
