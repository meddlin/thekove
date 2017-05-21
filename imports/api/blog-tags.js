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
	sectionSetting: {
		type: Boolean
	},

	updatedAt: {
		type: Date
	},
	createdAt: {
		type: Date
	}
});

if (Meteor.isServer) {
	Meteor.publish('BlogTags_all', () => {
		return BlogTags.find();
	});

	Meteor.publish('BlogTags_sectionsList', () => {
		return BlogTags.find({sectionSetting: true});
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
					sectionSetting: false,
					createdAt: new Date()
			}
		});

		return res;
	},

	'BlogTags.update'(id, updatedName, updatedSectionSetting) {
		check(id, String);
		check(updatedName, String);
		check(updatedSectionSetting, Boolean);
		
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
					slug: updatedSlug,
					sectionSetting: updatedSectionSetting
				}
			});

		return res;
	},

	'BlogTags.updateSectionSetting'(id, updatedSectionSetting) {
		check(id, String);
		check(updatedSectionSetting, Boolean);

		let res = BlogTags.update(id, {
			$set: {
				sectionSetting: updatedSectionSetting
			}
		})
	},

	'BlogTags.delete'(id) {
		check(id, String);

		return BlogTags.remove({_id: id});
	},

	'BlogTags.FetchList'() {
		return BlogTags.find().fetch();
	}
});