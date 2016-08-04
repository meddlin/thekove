import '../ui/main-layout.js';
import '../ui/landing.js';
import '../ui/about.js';
import '../ui/blog.js';
import '../ui/new-document.js';
import '../ui/admin.js';

FlowRouter.route('/', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'landing'});
	}
});

FlowRouter.route('/about', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'about'});
	}
});

FlowRouter.route('/blog', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'blog'});
	}
});

FlowRouter.route('/document/new', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'documentNew'});
	}
});

FlowRouter.route('/admin', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'admin'});
	}
})