<template>
	<article :class="['project-content', { 'active': this.sharedStore.state.viewingProject }]">
		<section class="video-container">
			<video autoplay muted loop playsinline :src="this.currentVideo"></video>
			<div class="gradient-overlay" ref="gradient"></div>
		</section>
		
		<section class="content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
				proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
				proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</section>
	</article>
</template>

<script>
	import projectData from '../assets/data/projectData.json';
	import TweenMax from 'gsap';

	export default {
		name: 'ProjectContent',
		props: {
			
		},
		data() {
			return {
				projects: projectData,
				sharedStore: window.store
			}
		},
		watch: {
			"sharedStore.state.currentProject": function() {
				this.changeGradient();
			}
		},
		mounted() {
			this.changeGradient();
		},
		computed: {
			currentVideo() {
				return require("../assets/video/" + this.projects[this.sharedStore.state.currentProject].video);
			},
			currentGradient() {
				let newGradient = this.projects[this.sharedStore.state.currentProject].gradient;
				return "linear-gradient(" + newGradient.angle + "deg, " + newGradient.color1 + " 0%, " + newGradient.color2 + " 100%)";
			}
		},
		methods: {
			changeGradient() {
				TweenMax.to(this.$refs["gradient"], 0.5, {
					background: this.currentGradient
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.project-content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		color: white;

		&.active {
			position: absolute;
			overflow-y: auto;

			.video-container {
				min-height: 0px;
				padding-top: 56.25%;
			}

			.gradient-overlay {
				opacity: 0;
			}
		}
	}

	.video-container {
		position: relative;
		width: 100vw;
		min-height: 100vh;
		padding-top: 100%;
		transition: 1s;

		>* {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	video {
		object-fit: cover;
	}

	.gradient-overlay {
		opacity: 0.5;
		transition: opacity 1s;
	}
</style>
