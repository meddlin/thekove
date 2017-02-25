import '../ui/layouts/main-layout.js';
import '../ui/layouts/editor-layout.js';
import '../ui/layouts/portfolio-layout.js';
import '../ui/layouts/plain-layout.js';
import '../ui/layouts/blog-post-layout.js';

import '../ui/landing.js';
import '../ui/about.js';
import '../ui/privacy.js';
import '../ui/blog.js';
import '../ui/documents.js';
import '../ui/editor/editor.js';

import '../ui/tag-section/section.js';
import '../ui/tag-section/cpat.js';
import '../ui/post.js';

import '../ui/admin/admin.js';


FlowRouter.route('/', {
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

FlowRouter.route('/blog/tag/cpat', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'cpat'});
	}
});
FlowRouter.route('/blog/tag/:_slug', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'section'});
	}
});
FlowRouter.route('/blog/:_postTitle', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'post'});
	}
});

FlowRouter.route('/documents', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'documents'});
	}
});

FlowRouter.route('/documents/:_id', {
	action: function(params) {
		BlazeLayout.render('editorLayout', {content: 'editor'});
	}
});

FlowRouter.route('/admin', {
	action: function(params) {
		BlazeLayout.render('plainLayout', {content: 'admin'});
	}
});