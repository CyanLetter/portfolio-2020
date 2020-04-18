<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About?</router-link>
		</div>
		<router-view/>
	</div>
</template>

<script>
	export default {
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

html, body {
	height: 100%;
	background: red;
}

body {
	font-family: 'PT Sans', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5 {
	font-family: 'Libre Baskerville', serif;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
