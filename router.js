Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});


/*
	/  (home) ROUTE 
*/
Router.route('/', {
	name: 'home',
	subscriptions: function() {
		return Meteor.subscribe('posts', 5);
	},
	action: function() {
		this.render('home');
	}
});

/*
	/about ROUTE
*/
Router.route('/about', {
	name: 'about',
	action: function() {
		this.render('about');
	}
});

