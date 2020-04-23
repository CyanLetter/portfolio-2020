<template>
	<div id="app">
		<Header/>
		<router-view/>
	</div>
</template>

<script>
	import Header from '@/components/Header.vue';

	export default {
		components: {
			Header
		},
		data: function() {
			return {
				sharedStore: window.store
			}
		},
		mounted: function() {
			console.log("Mounted App");
		}
	}
</script>

<style lang="scss">
	// include fonts
	@import url("https://fonts.googleapis.com/css?family=Libre+Baskerville|PT+Sans" );
	@import "./assets/scss/variables.scss";

	* {
		box-sizing: border-box;
	}

	html, body {
		height: 100%;
		background: #000;
		margin: 0;
	}

	body {
		font-family: 'PT Sans', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	h1, h2, h3, h4, h5 {
		font-family: 'Libre Baskerville', serif;
		font-weight: bold;
	}

	ul {
		list-style-type: none;
		padding: 0;
		font-size: 0; // fix inline-block spacing

		li {
			font-size: 1rem;
			list-style: none;
		}
	}
</style>
