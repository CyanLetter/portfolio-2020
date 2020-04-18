<template>
	<article class="project-content">
		<video autoplay muted loop playsinline :src="this.currentVideo"></video>
	</article>
</template>

<script>
	import projectData from '../assets/data/projectData.json';

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
		computed: {
			currentVideo() {
				return require("../assets/video/" + this.projects[this.sharedStore.state.currentProject].video);
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
		overflow: hidden;
	}

	video {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
	}
</style>
