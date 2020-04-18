<template>
	<ul id="project-list" ref="project-list" :class="[{ 'fade-out': this.sharedStore.state.viewingProject }]">
		<li class="project-list-item" v-for="project in projects" :key="project.title">
			<h2>
				{{project.title}}
			</h2>
			<h3>
				{{project.client}}
			</h3>
		</li>
	</ul>
</template>

<script>
	import projectData from '../assets/data/projectData.json';

	export default {
		name: 'ProjectList',
		props: {
			
		},
		data() {
			return {
				projects: projectData,
				sharedStore: window.store,
				scrollIndex: 0,
				lastScrollPosition: 0
			}
		},
		computed: {

		},
		watch: {
			scrollIndex() {
				this.sharedStore.setCurrentProject(this.scrollIndex);
			},
			"sharedStore.state.viewingProject"() {
				// set and restore scroll position on our list element
				if (this.sharedStore.state.viewingProject === false) {
					this.$nextTick(() => {
						document.scrollingElement.scrollTop = this.lastScrollPosition;
					});
					
				} else if (this.sharedStore.state.viewingProject === true) {
					this.$nextTick(() => {
						document.scrollingElement.scrollTop = 0;
						document.getElementById("project-list").scrollTop = this.lastScrollPosition
					});
					
				}
			}
		},
		created() {
			window.addEventListener("scroll", this.calculateProjectIndex);
			window.addEventListener("resize", this.calculateProjectIndex);
		},
		destroyed() {
			window.removeEventListener("scroll", this.calculateProjectIndex);
			window.removeEventListener("resize", this.calculateProjectIndex);
		},
		methods: {
			calculateProjectIndex() {
				if (this.sharedStore.state.viewingProject) {
					return;
				}

				this.lastScrollPosition = document.scrollingElement.scrollTop;
				let heightOffset = document.body.clientHeight * 0.5;
				let scrollRatio = (window.scrollY + heightOffset) / this.$refs["project-list"].scrollHeight;
				this.scrollIndex = Math.floor(scrollRatio * this.projects.length);
			}
		}
	}
</script>

<style scoped lang="scss">
	#project-list {
		position: relative;
		width: 100%;
		transition: 1s;

		&.fade-out {
			overflow: hidden;
			height: 100vh;
			transform: translateX(-100%);
		}
	}

	.project-list-item {
		width: 100%;
		height: 100vh;
		padding-top: 40vh;
		padding-left: 10vh;
		color: white;
	}

	h2 {
		font-size: 5rem;
		margin: 1rem 0;
		letter-spacing: 0.2rem;
	}
	h3 {
		font-family: 'PT Sans', Helvetica, Arial, sans-serif;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
		mix-blend-mode: overlay;
	}
</style>
