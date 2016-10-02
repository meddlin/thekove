import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
	'convertMarkdown'(markdown) {
		check(markdown, String);
		return parseMarkdown(markdown);
	}
});