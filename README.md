# thekove
A personal blog site built with Meteor.js and Blaze UI. 

## Getting Started
### Environment Variables
Run with ```meteor``` to start and create default user.
Run with ```meteor --settings settings-dev.json``` to start and create user defined in settings file.

You can also supply the environment variables:
- DEFAULT_USER_EMAIL
- DEFAULT_USER_PASSWORD

This default user is only created when no other users exist in the database. By default, this is the only 'admin' user for the project.

### SiteContents
You can find most "author-defined", static content I've written for [meddlin.net](http://meddlin.net) at ```\ui\content\content-config.js```. This is a naive implementation of a JSON object used to place this conent around the site instead of having the content dumped directly into the HTML. Start replacing/deleting content here if you're using this project as a boiler-plate.

## Other Comments
### Isn't it overkill?
Perhaps it is...but that's what personal projects are for, right?

### Why Blaze?
React, Angular, or ```<insert-fav-framework.js>``` are all great choices, but this project is supposed to be something I could pick up quickly and easily hack out a "solution" for whatever I need. Blaze offers this level of simplicity. There's little concern for performance, "scaling", etc. because ...it's a blog.
