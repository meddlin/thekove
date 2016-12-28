import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const BlogPosts = new Mongo.Collection('blog_posts');

BlogPosts.schema = new SimpleSchema({
	title: {
		type: String
	},
	tag: {
		type: String
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

	Meteor.publish('BlogPosts_all', function() {
		return BlogPosts.find();
	});

	Meteor.publish('BlogPosts_allPublic', function() {
		return BlogPosts.find({mode: {$eq: "public"}}, {sort: {updatedAt: -1}});
	});

	Meteor.publish('BlogPosts_latest', function() {
		return BlogPosts.find({mode: {$eq: "public"}}, {sort: {createdAt: -1}, limit: 10});
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

	'BlogPosts.update'(id, updatedBody, updatedMode, updatedTag, updatedDesc) {
		check(id, String);
		check(updatedBody, String);
		check(updatedMode, String);
		check(updatedTag, String);
		check(updatedDesc, String);

		BlogPosts.update(id, 
			{ $set: 
				{
					body: updatedBody,
					mode: updatedMode,
					tag: updatedTag,
					description: updatedDesc
				} 
			});
	},

	'BlogPosts.toggleMode'(id, updatedMode) {
		check(id, String);
		check(updatedMode, String);

		let toggled = updatedMode === 'draft' ? 'public' : 'draft';
		BlogPosts.update(id, 
			{ $set:
				{mode: toggled}
			});
	}

});