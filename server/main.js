import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config.js';
import '../imports/api/utility.js';

import '../imports/api/blog-posts.js';
import '../imports/api/blog-tags.js';


Meteor.startup(() => {
  prerenderio.set('prerenderToken', process.env.PRERENDER_TOKEN);

  if (Meteor.users.find().count() == 0) {

    let defaultEmail = "", defaultPass = "";
    if (process.env.DEFAULT_USER_EMAIL && process.env.DEFAULT_USER_PASSWORD) {
      defaultEmail = process.env.DEFAULT_USER_EMAIL;
      defaultPass = process.env.DEFAULT_USER_PASSWORD;
    } else if (Meteor.settings.defaultUserEmail && Meteor.settings.defaultUserPassword) {
      defaultEmail = Meteor.settings.defaultUserEmail;
      defaultPass = Meteor.settings.defaultUserPassword;
    } else {
      defaultEmail = "admin@admin.com";
      defaultPass = "password";
    }
    
    let defaultUserId = Accounts.createUser({
      email: defaultEmail,
      password: defaultPass
    });

    return Roles.addUsersToRoles(defaultUserId, 'admin');
  }
});
