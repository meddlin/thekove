import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './blog.html';

Template.blog.helpers({
	docs() {
		return BlogPosts.find();
	},
	formattedCreateDate(date) {
		if (date) {
			return moment(date).format("MMMM Do YYYY");
		} else {
			return "";
		}
	}
	/*,
	body() {
		return "##Testing **123**";
	}*/
	/*return "meteor-markdown =============== /nGithub flavor Markdown parser for Meteor based on marked.js";*/

		/*let converter = new Showdown.converter();
		let markup = converter.makeHtml('Testing **123**');
		return markup;*/
});

Template.blog.onCreated(function() {
	this.BlogPostsSub = new ReactiveVar(null);

	this.autorun(() => {
		Template.instance().BlogPostsSub.set( Meteor.subscribe('BlogPosts_allPublic') );
	});
});

Template.blog.onDestroyed(() => {
	var subToStop = Template.instance().BlogPostsSub.get();
	subToStop.stop();
	DocHead.setTitle('');
});