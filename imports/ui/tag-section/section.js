import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../../api/blog-posts.js';
import './section.html';

Template.section.helpers({
	urlName() {
		return FlowRouter.getParam("_name");
	},

	posts() {
		return Template.instance().sectionPosts();
	}
});

Template.section.onCreated(function() { 
	var instance = this;
	var tag_name = FlowRouter.getParam("_name");

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