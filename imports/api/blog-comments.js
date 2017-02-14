import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const BlogComments = new Mongo.Collection('blog_comments');

BlogPosts.schema = new SimpleSchema({
	postId: {
		type: String
	},
	body: {
		type: String
	},

	lastEditedAt: {
		type: Date
	},
	createdAt: {
		type: Date
	}
});

if (Meteor.isServer) {
	Meteor.publish('BlogComments.all', function() {
		return BlogComments.find();
	});

	Meteor.publish('BlogComments.forBlogPost', function(postId) {
		return BlogComments.find({postId: postId});
	});
}