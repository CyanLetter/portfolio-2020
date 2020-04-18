export class SimpleStore {
	constructor() {
		this.debug = true;
		this.state = {
			currentProject: 0
		}
	}

	setCurrentProject(index) {
		if (this.debug) {
			console.log("Setting current project - ", index);
		}

		this.state.currentProject = index;
	}
}