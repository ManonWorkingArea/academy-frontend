<script>

import Play from '../../../components/standard/course/Player.vue';
import feather from 'feather-icons';
import {useTitle} from 'vue-page-title';
import {useRoute} from 'vue-router'
import { ls } from 'vue-lsp'

export default {
	name: 'Course',
    computed: {
    },
	components: {
		Play,
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
<Play />
</template>

<style scoped></style>
