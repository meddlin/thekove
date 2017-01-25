import { SiteContents } from '../content/content-config.js';
import './blog-post-layout.html';

Template.blogPostLayout.helpers({
	SiteContents() {
		return Template.instance().SiteContents();
	}
});

Template.blogPostLayout.onCreated( function() {
	var instance = this;

	instance.SiteContents = function() {
		return SiteContents;
	}
});