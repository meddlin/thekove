import '../ui/main-layout.js';
import '../ui/sample-page.js';

FlowRouter.route('/', {
	action: function(params) {
		BlazeLayout.render('mainLayout', {content: 'samplePage'});
	}
});