import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './blog.html';

Template.blog.helpers({
	docs() {
		return BlogPosts.find();
	}/*,
	body() {
		return "##Testing **123**";
	}*/
	/*return "meteor-markdown =============== /nGithub flavor Markdown parser for Meteor based on marked.js";*/

		/*let converter = new Showdown.converter();
		let markup = converter.makeHtml('Testing **123**');
		return markup;*/
});