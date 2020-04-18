<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About?</router-link>
			<div id="enter-proj-test">Toggle Entered</div>
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
			document.getElementById("enter-proj-test").addEventListener("click", () => {
				this.sharedStore.toggleProjectView();
			});
		}
	}
</script>

<style lang="scss">
// include fonts
@import url("https://fonts.googleapis.com/css?family=Libre+Baskerville|PT+Sans" );

* {
	box-sizing: border-box;
}

html, body {
	height: 100%;
	background: #000;
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

#nav {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
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
