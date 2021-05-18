<template>
	<section id="project-list" ref="project-list" :class="[{ 'fade-out': this.sharedStore.state.viewingProject }]">
		<ul v-on:click="enterProject">
			<li class="project-list-item" v-for="project in projects" :key="project.title">
				<h2 :tabindex="focusable" role="button">
					{{project.title}}
				</h2>
				<h3>
					{{project.client}}
				</h3>
			</li>
		</ul>
		<inline-svg :src="scrollSvg" :class="['scroll-arrow', { 'fade-out': this.didScroll }]" v-on:click="scrollProjects" :tabindex="focusable" role="button"></inline-svg>
	</section>
</template>

<script>
	import projectData from '../assets/data/projectData.json';
	import TweenMax from 'gsap';
	import InlineSvg from 'vue-inline-svg';

	export default {
		name: 'ProjectList',
		components: {
			InlineSvg
		},
		data() {
			return {
				projects: projectData,
				sharedStore: window.store,
				scrollSvg: require('../assets/svg/ScrollDownButton.svg'),
				scrollIndex: 0,
				lastScrollPosition: 0,
				didScroll: false
			}
		},
		computed: {
			focusable() {
				return this.sharedStore.state.viewingProject === true ? -1 : 0;
			}
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
		mounted() {
			// Handle navigation oddities - reset to correct project index for scroll position and exit if project is currently being viewed
			this.calculateProjectIndex();
			this.sharedStore.setCurrentProject(this.scrollIndex);
			if (this.sharedStore.state.viewingProject) {
				this.sharedStore.exitProject();
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
				// handle scroll flag
				this.didScroll = this.lastScrollPosition > 0;

				let heightOffset = document.body.clientHeight * 0.5;
				let scrollRatio = (window.scrollY + heightOffset) / this.$refs["project-list"].scrollHeight;
				this.scrollIndex = Math.floor(scrollRatio * this.projects.length);
			},
			enterProject() {
				this.sharedStore.enterProject();
			},
			scrollProjects() {
				TweenMax.to(document.scrollingElement, 1, {
					scrollTop: document.scrollingElement.scrollTop + document.body.clientHeight
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/scss/variables.scss";

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
		padding-left: 5%;
		color: white;

		@include breakpoint($bp-med) {
			padding-left: 10vh;
		}
	}

	h2 {
		cursor: pointer;
		font-size: 3rem;
		margin: 0.5rem 0;
		letter-spacing: 0.1rem;

		@include breakpoint($bp-small) {
			margin: 1rem 0;
		}

		@include breakpoint($bp-med) {
			font-size: 5rem;
			letter-spacing: 0.2rem;
		}

		&:focus {
			outline: none;
		}
	}
	h3 {
		font-family: 'PT Sans', Helvetica, Arial, sans-serif;
		text-transform: uppercase;
		font-size: 1rem;
		letter-spacing: 0.2rem;
		margin-left: 0.25rem;
		mix-blend-mode: overlay;
		cursor: pointer;

		@include breakpoint($bp-med) {
			font-size: 1.5rem;
			margin-left: 0.6rem;
		}
	}

	.scroll-arrow {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 100px;
		padding: 30px;
		transition: 0.3s;
		border: none;
		outline: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;

		&:active {
			transition: 0.05s;
			transform: translateX(-50%) scale(0.9);
		}

		&.fade-out {
			opacity: 0;
			pointer-events: none;
			cursor: none;
		}
	}
</style>
