import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './landing.html';

Template.landing.helpers({
	docs() {
		return BlogPosts.find();
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
	this.blogLatestSub = new ReactiveVar(null);

	this.autorun(() => {
		Template.instance().blogLatestSub.set(Meteor.subscribe('BlogPosts_latest'));
	});
});

Template.landing.onDestroyed(() => {
	var subToStop = Template.instance().blogLatestSub.get();
	subToStop.stop();
	DocHead.setTitle('');
});