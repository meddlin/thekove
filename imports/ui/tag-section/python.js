import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../../api/blog-posts.js';
import './python.html';


Template.python.helpers({
	posts() {
		return Template.instance().posts();
	},

	formattedCreateDate(date) {
		if (date) {
			return moment(date).format("MMMM Do YYYY");
		} else {
			return "";
		}
	}
});

Template.python.onCreated(function() { 
	var instance = this;

	DocHead.setTitle('TheKove -- python');

	instance.autorun(function() {
		var subscription = instance.subscribe('BlogPosts_python');
	});

	instance.posts = function() {
		return BlogPosts.find().fetch();
	}
});