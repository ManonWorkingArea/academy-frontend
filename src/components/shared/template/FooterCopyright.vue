<script>
export default {
	data: () => {
		return {
			copyrightDate: new Date().getFullYear(),
			projectName: 'กรมวิชาการเกษตร',
			author: 'fti.academy.',
		};
	},
};
</script>

<template>
<p class="font-semibold font-heading">&copy; {{ copyrightDate }}. {{ projectName }} . Developed by {{ author }}</p>
</template>

<style lang="scss" scoped></style>
