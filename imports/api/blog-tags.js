import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { BlogPosts } from './blog-posts.js';

export const BlogTags = new Mongo.Collection('blog_tags');

BlogTags.schema = new SimpleSchema({
	name: {
		type: String
	},
	slug: {
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
	Meteor.publish('BlogTags_all', function() {
		return BlogTags.find();
	});
}

Meteor.methods({
	'BlogTags.insert'(tag_text) {
		check(tag_text, String);

		let textSplit = tag_text.split(" ");
		for (let i = 0; i < textSplit.length; i++) {
			textSplit[i] = textSplit[i].replace(/[^a-z0-9+]+/gi, "");
		}
		let tagSlug = textSplit.join('-').toLowerCase();

		let res = BlogTags.upsert({
				name: tag_text
			},
			{ $set: {
					name: tag_text,
					slug: tagSlug,
					createdAt: new Date()
			}
		});

		return res;
	},

	'BlogTags.update'(id, updatedName) {
		check(id, String);
		check(updatedName, String);
		
		let titleSplit = updatedName.split(" ");
		for (let i = 0; i < titleSplit.length; i++) {
			titleSplit[i] = titleSplit[i].replace(/[^a-z0-9+]+/gi, "");
		}
		let updatedSlug = titleSplit.join('-').toLowerCase();

		let currTag = BlogTags.findOne({_id: id});
		let posts = BlogPosts.find({ tag: currTag.slug }).fetch();

		if (posts.length > 0) {
			_.each(posts, (p) => {
				Meteor.call('BlogPosts.updateTag', p._id, updatedSlug);
			});
		}

		let res = BlogTags.update(id, 
			{ $set: 
				{
					name: updatedName,
					slug: updatedSlug
				}
			});

		return res;
	},

	'BlogTags.delete'(id) {
		check(id, String);

		return BlogTags.remove({_id: id});
	},

	'BlogTags.FetchList'() {
		return BlogTags.find().fetch();
	}
});