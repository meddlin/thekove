import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './documents.html';

Template.documents_newDocModal.events({
	'submit form'(e) {
		e.preventDefault();
	}
});

Template.documents_newDocModal.onRendered( function() {
	$('#new-document').validate({
		rules: {
			documentTitle: {
				required: true
			}
		},
		messages: {
			documentTitle: {
				required: "Hey! Add a title."
			}
		},
		submitHandler() {
			let title = $("[name='documentTitle']").val();

			Meteor.callPromise('BlogPosts.insert', title)
				.then( function(id) {
					FlowRouter.go('/document/new');
				})
				.catch( function(error) {
					console.log(error.reason);
				});
		}
	});
});