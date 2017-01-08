import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './site-contents.html';

Template.siteContents.helpers({
	auth() {
		let user = Meteor.user();
		if (!user) {
			FlowRouter.go('/');
			return false;
		}
		return true;
	},

	contents() {
		return Template.instance().contents();
	}
});

Template.siteContents.events({
	'click .js-create-btn'(event, instance) {
		let page = $('#create-page-text').val();
		let title = $('#create-title-text').val();
		let blob = $('#create-blob-text').val();

		Meteor.call('SiteContents.insert', page, title, blob, (err, res) => {
			if (err) {
				console.log('ERROR: could not create SiteContent document');
			}
			if (res) {
				$('#create-page-text').val('');
				$('#create-title-text').val('');
				$('#create-blob-text').val('');
			}
		});
	},

	'click .js-save-btn'(event, instance) {
		let page = $('#create-page-text').val();
		let title = $('#create-title-text').val();
		let blob = $('#create-blob-text').val();

		Meteor.call('SiteContents.update', page, title, blob);
	},

	'click .js-delete-btn'(event, instance) {
		let page = $('#create-page-text').val();
		let title = $('#create-title-text').val();

		Meteor.call('SiteContents.update', page, title);
	}
});

Template.siteContents.onCreated( function() {
	var instance = this;

	instance.autorun(function() {
		var subscription = instance.subscribe('SiteContents.all');
		if (subscription.ready()) { // use instance.subscriptionsReady() for multiple subscriptions
			console.log('SiteContents.all is ready');
		}
	});

	instance.contents = function() {
		return SiteContents.find().fetch();
	};
});

Template.siteContents.onDestroyed( function() {
	DocHead.setTitle('');
});