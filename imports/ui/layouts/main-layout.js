import { SiteContents } from '../content/content-config.js';
import './main-layout.html';

Template.mainLayout.helpers({
	SiteContents() {
		return Template.instance().SiteContents();
	}
});

Template.mainLayout.onCreated( function() {
	var instance = this;

	instance.SiteContents = function() {
		return SiteContents;
	}
});