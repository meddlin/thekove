import '../ui/main-layout.js';
import '../ui/landing.js';
import '../ui/blog.js';
import '../ui/admin.js';

FlowRouter.route('/', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'landing'});
	}
});

FlowRouter.route('/blog', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'blog'});
	}
});

FlowRouter.route('/admin', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'admin'});
	}
})