import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../../api/blog-posts.js';
import './section.html';

Template.section.helpers({
	urlName() {
		return FlowRouter.getParam("_slug");
	},

	posts() {
		return Template.instance().sectionPosts();
	},

	formattedCreateDate(date) {
		if (date) {
			return moment(date).format("MMMM Do YYYY");
		} else {
			return "";
		}
	}
});

Template.section.onCreated(function() { 
	var instance = this;
	var tag_name = FlowRouter.getParam("_slug");

	instance.autorun(function() {
		var subscription = instance.subscribe('BlogPosts_section', tag_name);
	});

	instance.sectionPosts = function() {
		return BlogPosts.find().fetch();
	}
});

Template.section.onDestroyed(function() {
	DocHead.setTitle('');
});