import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './post.html';
import './post.css';

Template.post.helpers({
	doc() {
		let post = Template.instance().myPosts();

		DocHead.setTitle("TheKove -- " + post.title);

		return post;
	},

	hasHeader() {
		let post = Template.instance().myPosts();
		if (post.headerImageLink) {
			return true;
		}
		return false;
	},

	headerImageLink() {
		let post = Template.instance().myPosts();
		return post.headerImageLink;
	}
});

Template.post.onCreated(function() {
	var instance = this;
	var postSlug = FlowRouter.getParam("_postSlug");

	instance.autorun(function() {
		var subscription = instance.subscribe('BlogPosts_singleTitle', postSlug);
		if (subscription.ready()) { // use instance.subscriptionsReady() for multiple subscriptions
			console.log('BlogPosts_singleTitle is ready');
		}
	});

	instance.myPosts = function() {
		return BlogPosts.findOne();
	};
});