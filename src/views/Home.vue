<template>
	<div class="home">
		<ProjectContent/>
		<NumberBackground/>
		<ProjectList/>
	</div>
</template>

<script>
	// @ is an alias to /src
	import ProjectContent from '@/components/ProjectContent.vue';
	import NumberBackground from '@/components/NumberBackground.vue';
	import ProjectList from '@/components/ProjectList.vue';

	export default {
		name: 'Home',
		components: {
			ProjectContent,
			NumberBackground,
			ProjectList
		}
	}
</script>

<style lang="scss">


</style>