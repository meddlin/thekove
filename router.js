Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});


/*
	/  (home) ROUTE 
*/
Router.route('/', {
	name: 'home',
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