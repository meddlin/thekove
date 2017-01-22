import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

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
	'BlogTags.upsert'(tag_text) {
		check(tag_text, String);

		let tagSlug = tag_text.replace(/\s/g, '-').replace('?', '').replace('!', '');

		/*
			TODO : check for any BlogPosts which also need to be updated!
		*/

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

	'BlogTags.delete'(id) {
		check(id, String);

		return BlogTags.remove({_id: id});
	},

	'BlogTags.FetchList'() {
		return BlogTags.find().fetch();
	}
});