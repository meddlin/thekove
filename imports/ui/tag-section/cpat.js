import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../../api/blog-posts.js';
import './cpat.html';

Template.cpat.helpers({
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

Template.cpat.onCreated(function() { 
	var instance = this;

	DocHead.setTitle('TheKove -- CPAT');

	instance.autorun(function() {
		var subscription = instance.subscribe('BlogPosts_cpat');
	});

	instance.posts = function() {
		return BlogPosts.find().fetch();
	}
});