AdminConfig = { 
  adminEmails: ['drushing@admin.com'], 
  collections: 
  { 
    /*Posts: {}, 
    Comments: {} */
  }
}


if (Meteor.isClient) {
  Template.home.helpers({
    latestPosts: function() {
      return Post.find().fetch();
    }
  });

  Template.home.events({
  });

  Blog.config({
    blogIndexTemplate: 'myBlogIndexTemplate',
    blogShowTemplate: 'singleBlogPost',
    /*authorRole: 'blogAuthor',*/
    adminRole: 'admin',

    syntaxHighlighting: true,
    syntaxHighlightingTheme: 'atelier-dune.dark'
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

