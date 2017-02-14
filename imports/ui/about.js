import { Template } from 'meteor/templating';

import { SiteContents } from '../ui/content/content-config.js';
import './about.html';

Template.about.helpers({
	SiteContents() {
		return Template.instance().SiteContents();
	}
});

Template.about.onCreated( function() {
	var instance = this;

	DocHead.setTitle("TheKove -- About");

	instance.SiteContents = function() {
		return SiteContents;
	}
});