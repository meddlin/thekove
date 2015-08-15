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
		return Meteor.subscribe('blog_posts');
	},
	action: function() {
		/*this.render('home');*/
		Router.go('/blog');
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