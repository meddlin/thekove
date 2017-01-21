import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import { BlogTags } from '../api/blog-tags.js';
import './landing.html';

Template.landing.helpers({
	docs() {
		return BlogPosts.find();
	},

	tags(){
		return BlogTags.find();
	},

	formattedCreateDate(date) {
		if (date) {
			return moment(date).format("MMMM Do YYYY");
		} else {
			return "";
		}
	},

	trimmedBody(text) {
		return text.slice(0, 250);
	}
});

Template.landing.onCreated(function() {
	var instance = this;

	instance.autorun(() => {
		var subscription = instance.subscribe('BlogPosts_latest');
		var tagSubscription = instance.subscribe('BlogTags_all');
	});
});

Template.landing.onDestroyed(() => {
	DocHead.setTitle('');
});