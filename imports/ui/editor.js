import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './editor.html';



Template.editor.helpers({
	doc() {
		return BlogPosts.findOne();
	}
});

Template.editor.events({
	/*'click .btn-success'() {
		let title = $('.doc-title').val();
		let tags = $('.doc-tags').val().split(',');

		Meteor.call('BlogPosts.insert', title, tags);
	},*/

	'keyup .CodeMirror'(event, template) {
		let text = template.editor.getValue();

		Meteor.callPromise('convertMarkdown', text)
			.then( function(html) {
				console.log(html);
				$('#preview').html(html);
			});

		/*if (text !== "") {
			Meteor.callPromise('convertMarkdown', text)
				.then( function(html) {
					$('#preview').html( html );
					return Meteor.callPromise('updateDocument');
				})
				.catch( function(error) {
					console.log(error.reason);
				});
		}*/
	},

	'click .save-button'(event, template){
		let body = template.editor.getValue();

		Meteor.call('BlogPosts.update', 'BeqrYwgLarS4CadEC', body);
	}
});

Template.editor.onCreated( function() {
	// subscription to single document goes here
});

Template.editor.onRendered( function() {
	this.editor = CodeMirror.fromTextArea( this.find("#editor"), {
		lineNumbers: true,
		fixedGutter: false,
		mode: "markdown",
		lineWrapping: true,
		cursorHeight: 0.85
	});
});