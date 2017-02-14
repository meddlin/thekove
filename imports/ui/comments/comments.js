import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogComments } from '../../api/blog-comments.js';
import './comments.css';
import './comments.html';

Template.comments.helpers({
	comments() {
		console.log('comments helper()');
	}
});

Template.comments.onCreated(function() {
	var instance = this;
	var cd = Template.currentData();

	instance.autorun(function() {
		var subscription = instance.subscribe('BlogComments_all');
		if (subscription.ready()) { // use instance.subscriptionsReady() for multiple subscriptions
			
		}
	});

	instance.comments = function() {
		return 1;
	};
});