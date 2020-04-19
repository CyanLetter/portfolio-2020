<template>
	<header>
		<inline-svg :src="closeSvg" :class="['close', { active: this.sharedStore.state.viewingProject }]" v-on:click="exitProject" :tabindex="focusable" role="button"></inline-svg>
		<div :class="['squiggle', { shrink: this.sharedStore.state.viewingProject }]"></div>
		<nav>
			<router-link to="/">Work</router-link>
			<router-link to="/about">Play</router-link>
			<router-link to="/about">About</router-link>
		</nav>
	</header>
</template>

<script>
	import InlineSvg from 'vue-inline-svg';

	export default {
		name: 'Header',
		components: {
			InlineSvg
		},
		data() {
			return {
				sharedStore: window.store,
				closeSvg: require('../assets/svg/CloseButton.svg')
			}
		},
		mounted: function() {

		},
		computed: {
			focusable() {
				return this.sharedStore.state.viewingProject === true ? -1 : 0;
			}
		},
		methods: {
			exitProject() {
				this.sharedStore.exitProject();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../assets/scss/variables.scss";

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		z-index: 100;
	}

	nav {
		display: flex;
		flex-direction: column;
		padding-top: 36px;

		@include breakpoint($bp-med) {
			flex-direction: row;
			padding-top: 0;
		}

		a {
			text-transform: uppercase;
			font-weight: bold;
			color: white;
			padding: 5px 20px;
			text-decoration: none;
			letter-spacing: 0.15rem;
			align-self: center;

			opacity: 0.8;
			mix-blend-mode: overlay;

			@include breakpoint($bp-med) {
				padding: 40px 20px;
			}
			
			&.router-link-exact-active, &:hover {
				opacity: 1;
				mix-blend-mode: none;
			}
		}
	}

	.close {
		width: 100px;
		height: 100px;
		padding: 30px;
		opacity: 0;
		pointer-events: none;
		transition: 0.3s;

		&.active {
			opacity: 1;
			pointer-events: all;
			cursor: pointer;
			transition-delay: 0.7s;
		}
	}

	.squiggle {
		position: absolute;
		left: 50%;
		top: 44px;
		transform: translateX(-50%);
		width: 100px;
		height: 13px;
		background-image: url("data:image/svg+xml;base64,PHN2ZyBpZD0ic3F1aWdnbGUtc3JjIiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMjAgMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDM5LjEgKDMxNzIwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPHBhdGggZD0iTTAsMTAgQzYsMTAgNCwwIDEwLDAgQzE2LDAgMTUsMTAgMjAsMTAiIGlkPSJQYXRoLTMtQ29weS0xMyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiPjwvcGF0aD4KPC9zdmc+");
		background-position: center;
		transition: 0.5s;

		@include breakpoint($bp-small) {
			width: 220px;
		}

		@include breakpoint($bp-large) {
			width: 340px;
		}

		&.shrink {
			width: 0px;
		}
	}
</style>
