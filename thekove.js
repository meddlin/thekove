AdminConfig = { 
  adminEmails: ['drushing@admin.com'], 
  collections: 
  { 
    /*Posts: {}, 
    Comments: {} */
  }
}


if (Meteor.isClient) {

  Blog.config({
    blogIndexTemplate: 'myBlogIndexTemplate',
    blogShowTemplate: 'singleBlogPost',

    syntaxHighlighting: true,
    syntaxHighlightingTheme: 'atelier-dune.dark'
  });

  Template.home.helpers({
  });

  Template.home.events({
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

