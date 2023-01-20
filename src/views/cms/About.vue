<script>
import AboutMe from '@/components/about/AboutMe';
import Breadcrumbs from '@/components/shared/template/nav/Breadcrumbs';
import feather from 'feather-icons';
import {useTitle} from 'vue-page-title';
import {useRoute} from 'vue-router'
import { ls } from 'vue-lsp'

export default {
	name: 'About',
	components: {
		AboutMe,
		Breadcrumbs
	},
	data: () => {
		return {};
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
	
<div class="min-h-full">
	<div class="py-10">
		<Breadcrumbs />
		<main>
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div class="px-4 py-8 sm:px-0">
				<AboutMe />
				</div>
			</div>
		</main>
	</div>
</div>

</template>

<style scoped></style>
