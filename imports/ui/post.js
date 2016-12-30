import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './post.html';

Template.post.helpers({
	doc() {
		var sub = Template.instance().BlogPostsSub.get();
		if (sub.ready()) {
			let post = BlogPosts.findOne();
			DocHead.setTitle('TheKove -- ' + post.title);
			return post;
		}
	}
});

Template.post.events({});

Template.post.onCreated(function() {
	this.BlogPostsSub = new ReactiveVar(null);
	var postId = FlowRouter.getParam("_id");

	this.autorun(() => {
		Template.instance().BlogPostsSub.set( Meteor.subscribe('BlogPosts_single', postId) );
	});
});

Template.post.onDestroyed(function() {
	var subToStop = Template.instance().BlogPostsSub.get();
	subToStop.stop();
	DocHead.setTitle('');
});