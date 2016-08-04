import './new-document.html';

Template.documentNew.helpers({
	editorOptions() {
		return {
			lineNumbers: true,
			mode: "markdown"
		}
	}
});