import { BlogPosts } from '../imports/api/blog-posts.js';

sitemaps.add('/sitemap.xml', function() {

	var out = [];
	out.push({ page: '/about' });
	var pages = BlogPosts.find({mode: "public"}).fetch();
	_.each(pages, function(p) {
		out.push({
			page: '/blog/' + p._id
		});
	});
	return out;
});