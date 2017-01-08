import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { SiteContents } from '../ui/content/content-config.js';
import './privacy.html';

Template.privacy.helpers({
	SiteContents() {
		return Template.instance().SiteContents();
	}
});

Template.privacy.onCreated( function() {
	var instance = this;

	instance.SiteContents = function() {
		return SiteContents;
	}
});

Template.privacy.onDestroyed(() => {
	DocHead.setTitle('');
});