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
	/blog ROUTE
*/
Router.route('/blog', {
	name: 'blog',
	action: function() {
		this.render('blog');
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