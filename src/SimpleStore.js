export class SimpleStore {
	constructor() {
		this.debug = false;
		this.state = {
			currentProject: 0,
			viewingProject: false
		};
	}

	setCurrentProject(index) {
		if (this.debug) {
			console.log("Setting current project - ", index);
		}

		this.state.currentProject = index;
	}

	enterProject() {
		if (this.debug) {
			console.log("Entering Project");
		}

		this.state.viewingProject = true;
	}

	exitProject() {
		if (this.debug) {
			console.log("Exiting Project");
		}

		this.state.viewingProject = false;
	}

	toggleProjectView() {
		if (this.debug) {
			console.log("Toggling Project");
		}

		this.state.viewingProject = !this.state.viewingProject;
	}
}