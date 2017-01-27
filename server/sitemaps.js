import { BlogPosts } from '../imports/api/blog-posts.js';
import { BlogTags } from '../imports/api/blog-tags.js';

sitemaps.add('/sitemap.xml', function() {

	var out = [];
	out.push({ page: '/about' });
	out.push({ page: '/privacy' });

	var tags = BlogTags.find( {slug: {$exists: true}} ).fetch();
	_.each(tags, function(t) {
		if (t.slug) {
			out.push({
				page: '/blog/tag/' + t.slug
			});
		}
	});

	var pages = BlogPosts.find(
		{mode: "public"},
		{slug: {$exists: true}} ).fetch();
	_.each(pages, function(p) {
		if (p.slug) {
			out.push({
				page: '/blog/' + p.slug
			});
		}
	});

	return out;
});