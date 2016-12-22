import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './post.html';

Template.post.helpers({
	doc() {
		return BlogPosts.findOne();
	}
});

Template.post.events({});

Template.post.onCreated(() => {
	let post = BlogPosts.findOne();
	DocHead.setTitle('TheKove -- ' + post.title);
});

Template.post.onDestroyed(() => {
	DocHead.setTitle('');
});