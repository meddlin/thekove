import { Meteor } from 'meteor/meteor';

import '../imports/api/utility.js';

import '../imports/api/tasks.js';
import '../imports/api/blog-posts.js';



Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.users.find().count() == 0) {
  	let defaultUserId = Accounts.createUser({
  		email: "admin@admin.com",
  		password: "password"
  	});
  	return Roles.addUsersToRoles(defaultUserId, 'admin');
  }
});
