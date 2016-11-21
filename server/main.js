import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import '../imports/api/utility.js';

import '../imports/api/tasks.js';
import '../imports/api/blog-posts.js';



Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.users.find().count() == 0) {
  	let defaultUserId = Accounts.createUser({
  		/*email: "admin@admin.com",
  		password: "password"*/
  		email: process.env.DEFAULT_USER_EMAIL
  		password: process.env.DEFAULT_USER_PASSWORD
  	});
  	return Roles.addUsersToRoles(defaultUserId, 'admin');
  }
});
