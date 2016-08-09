import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './new-document.html';



Template.documentNew.helpers({
	editorOptions() {
		return {
			lineNumbers: true,
			mode: "markdown"
		}
	}
});

Template.documentNew.events({
	'click .btn-success'() {
		let title = $('.doc-title').val();
		Meteor.call('BlogPosts.insert', title);
	}
});