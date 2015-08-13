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
	/projects ROUTE
*/
Router.route('/projects', {
	name: 'projects',
	action: function() {
		this.render('projects');
	}
});

/*
	/blog ROUTE
*/
/*Router.route('/blog', {
	name: 'blog',
	action: function() {
		this.render('blog');
	}
});*/
/*Router.route('/blog/:slug', {
	action: function() {
		this.render('singleBlogPost');
	}
});*/

/*
	/about ROUTE
*/
Router.route('/about', {
	name: 'about',
	action: function() {
		this.render('about');
	}
});