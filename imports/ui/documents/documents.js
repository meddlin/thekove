import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import toastr from 'toastr';
import '../toastr.css';

import { BlogPosts } from '../../api/blog-posts.js';
import { BlogTags } from '../../api/blog-tags.js';
import './documents.html';
import './documents.css';

Template.documents.helpers({
	docs() {
		return Template.instance().posts();
	},

	tags() {
		return Template.instance().tags();
	},

	filteredDocs() {
		return Template.instance().filteredDocs();
	},
	filterVar() {
		return Template.instance().docFilter.get();
	},

	tagForEdit() {
		return Template.instance().tagForEdit.get();
	},

	docIdSelected() {
		return Template.instance().docIdSelected.get();
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
	'click #showPublicDocs'(ev, tmpl) {
		tmpl.docFilter.set("public");
	},
	'click #showDraftDocs'(ev, tmpl) {
		tmpl.docFilter.set("draft");
	},


	'click .docs-list-btn__draft'() {
		if (!this.mode) this.mode = "";
		Meteor.call('BlogPosts.toggleMode', this._id, this.mode);
	},

	'click .docs-list-btn__public'() {
		if (!this.mode) this.mode = "";
		Meteor.call('BlogPosts.toggleMode', this._id, this.mode);
	},

	'click .docs-list-btn__delete'(event, tmpl) {
		tmpl.docIdSelected.set(this._id);
		$('#post-delete-modal').modal();
	},
	'click .js-confirm-delete'(event, tmpl) {
		let id = tmpl.docIdSelected.get();
		if (id) {
			Meteor.call('BlogPosts.deleteById', id, function(err, res) {
				if (res) {
					$('#post-delete-modal').modal('hide');
				}
			});
		}
	},

	'click .tag-check__sectionSetting'(event) {
		let id = this._id;
		let setting = !this.sectionSetting;

		Meteor.call('BlogTags.updateSectionSetting', id, setting, (err, res) => {
			if (res) {
				toastr.success('Tag published as section');
			}
		});
	},

	'click .tag-btn__save'(event, tmpl) {
		let id = this._id;
		let tagName = this.name;
		let sectionSetting = this.sectionSetting;

		Meteor.call('BlogTags.update', id, tagName, sectionSetting, (err, res) => {
			if (res) {
				toastr.success('Tag saved');
			}
		});
	},

	'click .tag-btn__delete'() {
		let tagId = this._id;

		Meteor.call('BlogTags.delete', tagId, function(err, res) {
			if (err) {
				console.log('err ' + err);
			}
			if (res) {
				console.log('res ' + res);
			}
		});
	},

	'click .tag-btn__edit'(ev, tmpl) {
		tmpl.tagForEdit.set(this);
		$("#tag-edit-modal").modal();
	},

	'click .tag-edit__preview-slug'() {
		let name = $("#tag-name-input").val();

		/* TODO : code here for slug creation */
	},

	'click .tag-edit__save'(ev, tmpl) {
		let tag = tmpl.tagForEdit.get();
		let name = $("#tag-name-input").val();

		Meteor.call('BlogTags.update', tag._id, name, function(err, res) {
			if (err) {
				console.log('err ' + err);
			}
			if (res) {
				console.log('res ' + res);
			}
		});
	}
});

Template.documents.onCreated(function() {
	var instance = this;
	instance.tagForEdit = new ReactiveVar(null);
	instance.docIdSelected = new ReactiveVar(null);

	instance.docFilter = new ReactiveVar("draft"); // reactive basis for the helper to retrigger

	instance.autorun(() => {
		var postsSub = instance.subscribe('BlogPosts_listing')
		var tagSub = instance.subscribe('BlogTags_all');
	});

	instance.posts = function() {
		return BlogPosts.find().fetch();
	}

	instance.tags = function() {
		return BlogTags.find().fetch();
	}

	instance.filteredDocs = function() {
		return BlogPosts.find({
			mode: instance.docFilter.get()
		}).fetch();
	}
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