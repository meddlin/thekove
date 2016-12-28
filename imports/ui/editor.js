import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { BlogPosts } from '../api/blog-posts.js';
import { BlogTags } from '../api/blog-tags.js';
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
	},

	tagOptions() {
		let tags = BlogTags.find().fetch();
		let tagOptions = _.map(tags, (t) => {
			return { option: t.name };
		});
		return tagOptions;
	},

	currentTag() {
		let post = BlogPosts.findOne();
		if (post && post.tag) {
			return post.tag;
		}
	}
});

Template.editor.events({

	'keyup .CodeMirror'(event, template) {
		let text = template.find('#editor').value
		Template.instance().editorTextValue.set(text);

		Meteor.callPromise('convertMarkdown', text)
			.then( function(html) {
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
		let tag = $('#tag-select').val();
		let desc = $('#post-description').val();

		Meteor.call('BlogPosts.update', post._id, body, mode, tag, desc);
	},

	'click #tag-save-btn'() {
		let text = $('#new-tag-input').val();

		if (text !== '' || text !== null) {
			Meteor.call('BlogTags.upsert', text, (err, res) => {
				if (res.numberAffected && res.numberAffected > 0){
					$('#new-tag-input').val('');
				} else if (err) {
					console.log('err: ' + err);
				}
			});
		}

	}
});

Template.editor.onCreated( function() {
	var self = this;

	self.BlogPostsSub = new ReactiveVar(null);
	self.BlogTagsSub = new ReactiveVar(null);

	self.editorTextValue = new ReactiveVar("");

	self.autorun(function() {
		var postId = FlowRouter.getParam("_id");
		Template.instance().BlogPostsSub.set( Meteor.subscribe('BlogPosts_single', postId) );
		Template.instance().BlogTagsSub.set( Meteor.subscribe('BlogTags_all') );
	});	
});

Template.editor.onRendered( function() {

});

Template.editor.onDestroyed(() => {
	var subToStop = Template.instance().BlogPostsSub.get();
	subToStop.stop();

	subToStop = Template.instance().BlogTagsSub.get();
	subToStop.stop();
});