import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { BlogPosts } from '../../api/blog-posts.js';
import { BlogTags } from '../../api/blog-tags.js';
import './editor.html';
import './editor.css';

import toastr from 'toastr';
import '../toastr.css';

Template.editor.helpers({
	doc() {
		var sub = Template.instance().BlogPostsSub.get();
		if (sub.ready()) {
			var singleDoc = BlogPosts.findOne();

			var cm = Template.instance().codeMirrorHold.get();
			if (singleDoc && Template.instance().editorText.get() == "") {
				Template.instance().editorText.set(singleDoc.body);

				cm.setValue(singleDoc.body);
			}
			return singleDoc;
		}
	},

	auth() {
		let user = Meteor.user();
		if (!user) {
			FlowRouter.go('/');
			return false;
		}
		return true;
	},

	tagOptions() {
		let tags = BlogTags.find().fetch();
		let tagOptions = _.map(tags, (t) => {
			return { option: t.slug };
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
		let cm = Template.instance().codeMirrorHold.get();
		let text = cm.getValue();

		Meteor.callPromise('convertMarkdown', text).then( function(html) {
				$('#preview').html(html);
			});
	},

	'click .save-button'(event, template){
		let cm = Template.instance().codeMirrorHold.get();

		let post = BlogPosts.findOne();
		let title = $('.doc-title').val();
		let headerImageLink = $('.doc-header-image').val();
		let body = cm.getValue();
		let mode = $('.doc-mode').val();
		let tags = $('#tag-select').val();
		let desc = $('#post-description').val();

		Meteor.call('BlogPosts.update', post._id, title, headerImageLink, body, mode, tags, desc);
	},

	'click #tag-save-btn'() {
		let text = $('#new-tag-input').val();

		if (text !== '' || text !== null) {
			Meteor.call('BlogTags.insert', text, (err, res) => {
				if (res.numberAffected && res.numberAffected > 0){
					$('#new-tag-input').val('');
				} else if (err) {
					console.log('err: ' + err);
				}
			});
		}
	},

	'click .add-tag-button'(event, template) {
		var newTag = $('#testing-tag-input').val();
		var postId = FlowRouter.getParam('_id');
		Meteor.call('BlogPosts.addTag', postId, newTag, function(err, res){
			if (err) console.log("add tag --> err: " + err);
			if (res) console.log("add tag --> res: " + res);
		});
	}
});

Template.editor.onCreated( function() {
	var self = this;

	self.BlogPostsSub = new ReactiveVar(null);
	self.BlogTagsSub = new ReactiveVar(null);

	self.codeMirrorHold = new ReactiveVar(null);
	self.editorText = new ReactiveVar("");

	self.autorun(function() {
		var postId = FlowRouter.getParam("_id");
		Template.instance().BlogPostsSub.set( 
			Meteor.subscribe('BlogPosts_single', postId, function() {
				
			}, function() {
				console.log('onready?');

			})
		);
		Template.instance().BlogTagsSub.set( Meteor.subscribe('BlogTags_all') );
	});	
});

Template.editor.onRendered( function() {
	var self = this;
	var editor = CodeMirror.fromTextArea(this.find("#myTextarea"), {
		lineNumbers: true,
		fixedGutter: false,
		mode: "markdown",
		lineWrapping: true,
		cursorHeight: 0.85
	});

	Template.instance().codeMirrorHold.set(editor);

	let delay = 15 * 60 * 1000;
	setInterval(() => {
			$('.save-button').click();
			toastr.info('Autosaving...');
		}, delay);
});

Template.editor.onDestroyed(() => {
	var subToStop = Template.instance().BlogPostsSub.get();
	subToStop.stop();

	subToStop = Template.instance().BlogTagsSub.get();
	subToStop.stop();
});