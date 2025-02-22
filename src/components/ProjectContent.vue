<template>
	<article :class="['project-content', { 'active': this.sharedStore.state.viewingProject }]" :style="{ background: currentGradient }">
		<section class="video-container">
			<video autoplay muted loop playsinline :src="this.activeVideo" :class="[{ 'fadeOut': this.changingVideo }]" v-on:canplay="videoLoaded"></video>
			<div class="gradient-overlay" ref="gradient"></div>
		</section>
		
		<section class="content">
			<section v-for="item in currentArticle" :key="item.title">
				<h3>
					{{ item.title }}
				</h3>
				<p>
					{{ item.body }}

					<a v-if="item.link" :href="item.link.url" target="_blank">{{ item.link.title }}</a>
				</p>
			</section>
			<div class="squiggle"></div>
			<inline-svg :src="closeSvg" class="close" v-on:click="exitProject" tabindex="0" role="button"></inline-svg>
		</section>
	</article>
</template>

<script>
	import projectData from '../assets/data/projectData.json';
	import TweenMax from 'gsap';
	import InlineSvg from 'vue-inline-svg';

	export default {
		name: 'ProjectContent',
		components: {
			InlineSvg
		},
		data() {
			return {
				projects: projectData,
				sharedStore: window.store,
				activeVideo: "",
				changingVideo: false,
				closeSvg: require('../assets/svg/CloseButton.svg')
			}
		},
		watch: {
			"sharedStore.state.currentProject": function() {
				this.changeGradient();
				this.changeVideo();
			}
		},
		mounted() {
			this.changeGradient();
			this.changeVideo();
		},
		computed: {
			currentVideo() {
				return require("../assets/video/" + this.projects[this.sharedStore.state.currentProject].video);
			},
			currentGradient() {
				let newGradient = this.projects[this.sharedStore.state.currentProject].gradient;
				return "linear-gradient(" + newGradient.angle + "deg, " + newGradient.color1 + " 0%, " + newGradient.color2 + " 100%)";
			},
			currentArticle() {
				return this.projects[this.sharedStore.state.currentProject].articleContent;
			},
			currentArticleBackground() {
				return this.projects[this.sharedStore.state.currentProject].articleColor;
			}
		},
		methods: {
			changeGradient() {
				TweenMax.to(this.$refs["gradient"], 0.5, {
					background: this.currentGradient
				});
			},
			changeVideo() {
				this.changingVideo = true;

				TweenMax.delayedCall(0.4, () => {
					this.activeVideo = this.currentVideo;
					// will fade back in once new video src can play
				});
			},
			videoLoaded() {
				this.changingVideo = false;
			},
			exitProject() {
				this.sharedStore.exitProject();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../assets/scss/variables.scss";

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
				min-height: 50vh;
				padding-top: 40%;

				margin-top: 150px;

				@include breakpoint($bp-med) {
					margin-top: 100px;
				}
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

		transition: 0.4s;

		&.fadeOut {
			opacity: 0;
		}
	}

	.gradient-overlay {
		opacity: 0.5;
		transition: opacity 1s;
		pointer-events: none;
	}

	.content {
		padding: 40px 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		>section {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 960px;
			margin-bottom: 30px;
		}

		h3 {
			font-size: 2rem;
			line-height: 3rem;
			letter-spacing: 0.1rem;
			padding-right: 20px;
			margin: 0 0 20px;
		}

		p {
			font-size: 1.2rem;
			line-height: 2rem;
			margin: 5px 0 0;
		}

		a {
			display: block;
			color: white;
			margin: 10px auto;
		}

		@include breakpoint($bp-med) {
			padding: 50px;

			>section {
				flex-direction: row;
			}

			h3 {
				width: 40%;
			}

			p {
				width: 60%;
			}
		}
	}

	.squiggle {
		position: relative;
		width: 70%;
		max-width: 300px;
		height: 13px;
		margin-bottom: 50px;
		background-image: url("data:image/svg+xml;base64,PHN2ZyBpZD0ic3F1aWdnbGUtc3JjIiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMjAgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPHBhdGggZD0iTTAsMTAgQzYsMTAgNCwwIDEwLDAgQzE2LDAgMTUsMTAgMjAsMTAiIGlkPSJQYXRoLTMtQ29weS0xMyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+");
		background-position: center;
	}

	.close {
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
			transform: scale(0.9);
		}
	}
</style>
