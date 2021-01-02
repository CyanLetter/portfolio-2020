<template>
	<section class="about">
		<div class="squiggle-vert"></div>
		<section class="about-text">
			<h1>Hello.</h1>
			<p>
				I am <strong>Dakota Ling</strong>, a technical director at Primal Screen and web development instructor at the Creative Circus. I delight in building engaging interactive experiences for all ages. Projects displayed here represent work I have done both independently and as part of a larger team.
			</p>
			<p>
				I handled all aspects of this site, from concept to execution. Tools and frameworks used include Sketch, Vue, and GSAP. Typefaces used are Libre Baskerville, PT Sans, and League Gothic. Icons by Simple Icons. 
			</p>
			<p>
				Feel free to get in touch at <strong><a href="mailto:hello@dakotaling.com">hello@dakotaling.com</a></strong>
			</p>
		</section>
		<div class="bubble-container">
			<div class="bubble"></div>
			<div class="bubble"></div>
			<div class="bubble"></div>
		</div>
		<footer>
			<!-- social component -->
			<a href="https://twitter.com/cyanletter" target="_blank">
				<inline-svg :src="this.twitterIcon" alt="Screaming Bird Hell Site"></inline-svg>
			</a>
			<a href="https://github.com/cyanletter" target="_blank">
				<inline-svg :src="this.githubIcon" alt="The Origin of All Code"></inline-svg>
			</a>
			<a href="https://www.linkedin.com/in/dakota-ling-67754557/" target="_blank">
				<inline-svg :src="this.linkedinIcon" alt="Land of Recruiters"></inline-svg>
			</a>
		</footer>
	</section>
</template>

<script>
	import InlineSvg from 'vue-inline-svg';

	export default {
		name: 'About',
		components: {
			InlineSvg
		},
		data() {
			return {
				sharedStore: window.store,
				twitterIcon: require('../assets/svg/BirdHellsite.svg'),
				githubIcon: require('../assets/svg/OriginOfAllCode.svg'),
				linkedinIcon: require('../assets/svg/HereBeRecruiters.svg')
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../assets/scss/variables.scss";

	.about {
		position: relative;
		width: 100%;
		min-height: 100vh;
		padding: 100px 10px 0px;
		color: white;
		background-color: #545454;
		overflow: hidden;

		@include breakpoint($bp-small) {
			padding: 100px 20px 0px;
		}
	}

	h1 {
		font-size: 5rem;
		margin: 0.5rem 0;
		letter-spacing: 0.1rem;
		margin-bottom: 3rem;
	}

	p {
		max-width: 500px;
		font-size: 1.2rem;
		line-height: 2rem;
		margin: 1rem 0 0;
	}

	a {
		color: white;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;

		a {
			width: 50px;
			height: 90px;
			padding: 30px 10px;
			display: block;
		}

		svg {
			fill: white;
		}
	}

	.about-text {
		position: relative;
		padding-left: 30px;
		padding-bottom: 110px;

		@include breakpoint($bp-small) {
			padding-left: 100px;
		}
	}

	.squiggle-vert {
		position: absolute;
		left: 15px;
		top: 115px;
		transform-origin: 0% 50%;
		transform: rotate(90deg);
		width: calc(100vh - 230px);
		height: 13px;
		background-image: url("data:image/svg+xml;base64,PHN2ZyBpZD0ic3F1aWdnbGUtc3JjIiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMjAgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPHBhdGggZD0iTTAsMTAgQzYsMTAgNCwwIDEwLDAgQzE2LDAgMTUsMTAgMjAsMTAiIGlkPSJQYXRoLTMtQ29weS0xMyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+");
		background-position: center;
		transition: 0.5s;

		@include breakpoint($bp-small) {
			
		}

		@include breakpoint($bp-small) {
			left: 50px;
		}
	}

	.bubble-container {
		position: absolute;
		right: -80px;
		bottom: 0;
		display: none;

		@include breakpoint($bp-med) {
			display: block;
		}
	}

	.bubble {
		width: 160px;
		height: 160px;
		margin-bottom: 40px;
		border: 2px solid white;
		border-radius: 160px;

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
