import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const BlogComments = new Mongo.Collection('blog_comments');

BlogComments.schema = new SimpleSchema({
	postId: {
		type: String,
		regEx: SimpleSchema.RegEx.Id
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