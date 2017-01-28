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
	Meteor.publish('BlogPosts_singleTitle', function(postTitleSlug) {
		return BlogPosts.find({slug: postTitleSlug});
	});

	Meteor.publish('BlogPosts_all', function() {
		return BlogPosts.find();
	});

	Meteor.publish('BlogPosts_allPublic', function() {
		return BlogPosts.find({ mode: {$eq: "public"}}, {sort: {updatedAt: -1}});
	});

	Meteor.publish('BlogPosts_latest', function() {
		return BlogPosts.find({mode: {$eq: "public"}}, {sort: {createdAt: -1}, limit: 20});
	});

	Meteor.publish('BlogPosts_section', function(tag_name) {
		return BlogPosts.find({
			tag: tag_name, 
			mode: {$eq: "public"}
		});
	});

	Meteor.publish('BlogPosts_cpat', function() {
		return BlogPosts.find({
			tag: 'cpat',
			mode: {$eq: "public"}
		});
	});
}

Meteor.methods({
	'BlogPosts.insert'(title, tags) {
		check(title, String);

		let titleSplit = title.split(" ");
		for (let i = 0; i < titleSplit.length; i++) {
			titleSplit[i] = titleSplit[i].replace(/[^a-z0-9+]+/gi, "");
		}
		let postSlug = titleSplit.join('-').toLowerCase();



		// let postSlug = title.replace(/\W+/g, "-");

		/*let postSlug = title.replace(/\s/g, '-');
		postSlug = postSlug.replace('?', '');
		postSlug = postSlug.replace('!', '');
		postSlug = postSlug.replace(':', '');*/

		let id = BlogPosts.insert({
			title: title,
			slug: postSlug,
			tags: tags,
			createdAt: new Date()
		});

		return id;
	},

	'BlogPosts.update'(id, updatedTitle, updatedBody, updatedMode, updatedTag, updatedDesc) {
		check(id, String);
		check(updatedTitle, String);
		check(updatedBody, String);
		check(updatedMode, String);
		check(updatedTag, String);
		check(updatedDesc, String);

		let titleSplit = updatedTitle.split(" ");
		for (let i = 0; i < titleSplit.length; i++) {
			titleSplit[i] = titleSplit[i].replace(/[^a-z0-9+]+/gi, "");
		}
		let updatedSlug = titleSplit.join('-').toLowerCase();

		/*let updatedSlug = updatedTitle.replace(/\s/g, '-');
		updatedSlug = updatedSlug.replace('?', '');
		updatedSlug = updatedSlug.replace('!', '');
		updatedSlug = updatedSlug.replace(':', '');*/

		BlogPosts.update(id, 
			{ $set: 
				{
					title: updatedTitle,
					body: updatedBody,
					mode: updatedMode,
					tag: updatedTag,
					slug: updatedSlug,
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