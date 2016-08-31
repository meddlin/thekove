import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const BlogPosts = new Mongo.Collection('blog_posts');

BlogPosts.schema = new SimpleSchema({
	title: {
		type: String
	},
	tags: {
		type: [String]
	},
	slug: {
		type: String
	},
	description: {
		type: String
	},
	body: {
		type: String
	},
	mode: {
		type: String
	},

	updatedAt: {
		type: Date
	},
	createdAt: {
		type: Date
	}
});

if (Meteor.isServer) {
	Meteor.publish('BlogPosts_single', function(id) {
		return BlogPosts.find({_id: id});
	});

	Meteor.publish('BlogPosts_latest', function() {
		return BlogPosts.find({}, {sort: {$natural: 1}, limit: 10});
	});
}

Meteor.methods({
	'BlogPosts.insert'(title, tags) {
		check(title, String);

		let id = BlogPosts.insert({
			title: title,
			tags: tags,
			createdAt: new Date()
		});

		return id;
	},

	'BlogPosts.update'(id, updatedBody) {
		check(id, String);
		check(updatedBody, String);

		BlogPosts.update(id, { $set: {body: updatedBody} });
	}
});