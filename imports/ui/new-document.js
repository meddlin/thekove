import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './new-document.html';



Template.documentNew.helpers({
	/*editorOptions() {
		return {
			lineNumbers: true,
			fixedGutter: false,
			mode: "markdown",
			lineWrapping: true,
			cursorHeight: 0.85
		}
	}*/
});

Template.documentNew.events({
	'click .btn-success'() {
		let title = $('.doc-title').val();
		let tags = $('.doc-tags').val().split(',');

		Meteor.call('BlogPosts.insert', title, tags);
	},

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
	}
});

Template.documentNew.onRendered( function() {
	this.editor = CodeMirror.fromTextArea( this.find("#editor"), {
		lineNumbers: true,
		fixedGutter: false,
		mode: "markdown",
		lineWrapping: true,
		cursorHeight: 0.85
	});
});