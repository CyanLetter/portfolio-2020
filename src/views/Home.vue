<template>
	<div class="home">
		<NumberBackground/>
		<ProjectList/>
	</div>
</template>

<script>
	// @ is an alias to /src
	import NumberBackground from '@/components/NumberBackground.vue';
	import ProjectList from '@/components/ProjectList.vue';

	export default {
		name: 'Home',
		components: {
			NumberBackground,
			ProjectList
		}
	}
</script>

<style lang="scss">


</style>