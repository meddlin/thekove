import '../ui/layouts/main-layout.js';
import '../ui/layouts/portfolio-layout.js';
import '../ui/layouts/plain-layout.js';

import '../ui/landing.js';
import '../ui/about.js';
import '../ui/privacy.js';
import '../ui/blog.js';
import '../ui/documents.js';
import '../ui/editor.js';
import '../ui/post.js';
import '../ui/admin/admin.js';

FlowRouter.route('/', {
	subscriptions: function() {
		this.register('latest_documents', Meteor.subscribe('BlogPosts_latest'));
	},
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'landing'});
	}
});

FlowRouter.route('/about', {
	action: function(params) {
		BlazeLayout.render('portfolioLayout', {content: 'about'});
	}
});

FlowRouter.route('/privacy', {
	action: function(params) {
		BlazeLayout.render('portfolioLayout', {content: 'privacy'});
	}
});

FlowRouter.route('/blog', {
	subscriptions: function(params) {
		this.register('all_documents', Meteor.subscribe('BlogPosts_allPublic'));
	},
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'blog'});
	}
});
FlowRouter.route('/blog/:_id', {
	subscriptions: function(params) {
		this.register('single_document', Meteor.subscribe('BlogPosts_single', params._id));
	},
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'post'});
	}
});


FlowRouter.route('/documents', {
	subscriptions: function(params) {
		this.register('all_documents', Meteor.subscribe('BlogPosts_all'));
	},
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'documents'});
	}
});



/*FlowRouter.route('/documents/:_id', {
	subscriptions: function(params) {
		this.register('single_document', Meteor.subscribe('BlogPosts_single', params._id));
	},
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'editor'});
	}
});*/
FlowRouter.route('/documents/:_id', {
	/*subscriptions: function(params) {
		this.register('single_document', Meteor.subscribe('BlogPosts_single', params._id));
	},*/
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'editor'});
	}
});





/*FlowRouter.route('/editor', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'editor'});
	}
});*/

FlowRouter.route('/admin', {
	action: function(params) {
		BlazeLayout.render('plainLayout', {content: 'admin'});
	}
})