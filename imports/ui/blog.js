import './blog.html';

Template.blog.helpers({
	body() {
		return "##Testing **123**";
		/*return "meteor-markdown =============== /nGithub flavor Markdown parser for Meteor based on marked.js";*/

		/*let converter = new Showdown.converter();
		let markup = converter.makeHtml('Testing **123**');
		return markup;*/
	}
});