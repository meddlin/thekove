import './about.html';

Template.about.onDestroyed(() => {
	DocHead.setTitle('');
});