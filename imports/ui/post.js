import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './post.html';

Template.post.helpers({
	doc() {
		let post = Template.instance().myPosts();
		DocHead.setTitle('TheKove -- ' + post.title);
		return post;
	}
});

Template.post.onCreated(function() {
	var instance = this;
	var tagName = FlowRouter.getParam("_name");
	var postTitle = FlowRouter.getParam("_slug");

	instance.autorun(function() {
		var subscription = instance.subscribe('BlogPosts_singleTitle', tagName, postTitle);
		if (subscription.ready()) { // use instance.subscriptionsReady() for multiple subscriptions
			console.log('BlogPosts_singleTitle is ready');
		}
	});

	instance.myPosts = function() {
		return BlogPosts.findOne();
	};
});

Template.post.onDestroyed(function() {
	DocHead.setTitle('');
});