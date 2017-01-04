import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './documents.html';

Template.documents.helpers({
	docs() {
		return BlogPosts.find();
	},

	auth() {
		let user = Meteor.user();
		if (!user) {
			FlowRouter.go('/');
			return false;
		}
		return true;
	}
});

Template.documents.events({
	'click .docs-list-btn__draft'() {
		if (!this.mode) this.mode = "";
		Meteor.call('BlogPosts.toggleMode', this._id, this.mode);
	},

	'click .docs-list-btn__public'() {
		if (!this.mode) this.mode = "";
		Meteor.call('BlogPosts.toggleMode', this._id, this.mode);
	},

	'click .docs-list-btn__delete'() {
		alert('DELETE post clicked!');
	}
});

Template.documents.onCreated(function() {
	this.BlogPostsSub = new ReactiveVar(null);

	this.autorun(() => {
		Template.instance().BlogPostsSub.set( Meteor.subscribe('BlogPosts_all') );
	});
});

Template.documents.onDestroyed(function() {
	var subToStop = Template.instance().BlogPostsSub.get();
	subToStop.stop();
});

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
					console.log("submitHandler on newDocModal " + id);
					FlowRouter.go('/documents/:_id', {_id: id});
					$('#new-document-modal').modal('hide');
					$('.modal-backdrop').remove();
				})
				.catch( function(error) {
					console.log(error.reason);
				});
		}
	});
});