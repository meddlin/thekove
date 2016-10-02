import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { BlogPosts } from '../api/blog-posts.js';
import './landing.html';

Template.landing.helpers({
	docs() {
		return BlogPosts.find();
	}
});