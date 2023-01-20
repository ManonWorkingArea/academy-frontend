<script>

import CourseList from '../../../components/standard/course/Certification.vue';
import feather from 'feather-icons';
import {useTitle} from 'vue-page-title';
import {useRoute} from 'vue-router'
import { ls } from 'vue-lsp'

export default {
	name: 'Course',
    computed: {
    },
	components: {
		CourseList,
	},
	data: () => {
		return {
			experienceTitle: 'Years of experience',
			githubTitle: 'Stars on GitHub',
			feedbackTitle: 'Positive feedback',
			projectsTitle: 'Projects completed'
		};
	},
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
	methods: {},
    setup() {
		useTitle(useRoute().meta.title + " / " + ls.get("host").name);
    },
};
</script>

<template>
<CourseList />
</template>

<style scoped></style>
