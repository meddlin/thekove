import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const BlogTags = new Mongo.Collection('blog_tags');

BlogTags.schema = new SimpleSchema({
	name: {
		type: String
	},

	updatedAt: {
		type: Date
	},
	createdAt: {
		type: Date
	}
});