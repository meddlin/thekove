import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './landing.html';

Template.landing.helpers({
	docs() {
		return BlogPosts.find();
	},

	trimmedBody(text) {
		return text.slice(0, 250);
	}
});

Template.landing.onDestroyed(() => {
	DocHead.setTitle('');
});