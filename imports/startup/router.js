import '../ui/layouts/main-layout.js';
import '../ui/layouts/portfolio-layout.js';
import '../ui/layouts/plain-layout.js';
import '../ui/layouts/blog-post-layout.js';

import '../ui/landing.js';
import '../ui/about.js';
import '../ui/privacy.js';
import '../ui/blog.js';
import '../ui/documents.js';
import '../ui/editor.js';

import '../ui/tag-section/section.js';
import '../ui/tag-section/cpat.js';
import '../ui/post.js';

import '../ui/admin/admin.js';

FlowRouter.route('/', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'landing'});
		DocHead.setTitle('TheKove -- Home');
	}
});

FlowRouter.route('/about', {
	action: function(params) {
		BlazeLayout.render('portfolioLayout', {content: 'about'});
		DocHead.setTitle('TheKove -- About');
	}
});

FlowRouter.route('/privacy', {
	action: function(params) {
		BlazeLayout.render('portfolioLayout', {content: 'privacy'});
		DocHead.setTitle('TheKove -- Privacy');
	}
});

FlowRouter.route('/blog', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'blog'});
		DocHead.setTitle('TheKove -- Blog');
	}
});
FlowRouter.route('/blog/tag/cpat', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'cpat'});
		DocHead.setTitle('TheKove -- CPAT');
	}
});
FlowRouter.route('/blog/tag/:_slug', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'section'});
		DocHead.setTitle('TheKove -- ' + params._slug);
	}
});
FlowRouter.route('/blog/:_postTitle', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'post'});
		DocHead.setTitle('TheKove -- ' + params._postTitle);
	}
});

FlowRouter.route('/documents', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'documents'});
	}
});


FlowRouter.route('/documents/:_id', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'editor'});
	}
});

FlowRouter.route('/admin', {
	action: function(params) {
		BlazeLayout.render('plainLayout', {content: 'admin'});
	}
})