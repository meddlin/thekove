import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { BlogPosts } from '../api/blog-posts.js';
import './editor.html';


Template.editor.helpers({
	doc() {
		var singleDoc = BlogPosts.findOne();
		if (singleDoc && Template.instance().editorTextValue.get() == "") {
			Template.instance().editorTextValue.set(singleDoc.body);
		}
		return singleDoc;
	},

	auth() {
		let user = Meteor.user();
		if (!user) {
			FlowRouter.go('/');
			return false;
		}
		return true;
	},

	editorOptions() {
		return {
			lineNumbers: true,
			fixedGutter: false,
			mode: "markdown",
			lineWrapping: true,
			cursorHeight: 0.85
		}
	},

	editorCode() {
		return Template.instance().editorTextValue.get();
	}
});

Template.editor.events({

	'keyup .CodeMirror'(event, template) {
		let text = template.find('#editor').value
		Template.instance().editorTextValue.set(text);

		Meteor.callPromise('convertMarkdown', text)
			.then( function(html) {
				/*console.log(html);*/
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
		let post = BlogPosts.findOne();
		let body = template.find('#editor').value;
		let mode = $('.doc-mode').val();

		Meteor.call('BlogPosts.update', post._id, body, mode);
	}
});

Template.editor.onCreated( function() {
	// subscription to single document goes here

	var self = this;
	self.autorun(function() {
		var postId = FlowRouter.getParam("_id");
		self.sub = self.subscribe('BlogPosts_single', postId, function() {
			console.log("check if subscription is ready");
		});
	});

	self.editorTextValue = new ReactiveVar("");
	
});

Template.editor.onRendered( function() {

});