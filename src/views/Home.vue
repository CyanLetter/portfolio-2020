<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<NumberBackground/>
	</div>
</template>

<script>
	// @ is an alias to /src
	import NumberBackground from '@/components/NumberBackground.vue';

	export default {
		name: 'Home',
		components: {
			NumberBackground
		}
	}
</script>

<style lang="scss">


</style>