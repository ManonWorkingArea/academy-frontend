<script>
import Detail from '@/components/faq/Detail';
import Breadcrumbs from '@/components/shared/template/nav/Breadcrumbs';
import feather from 'feather-icons';
import {useTitle} from 'vue-page-title';
import {useRoute} from 'vue-router'

export default {
	name: 'FAQ',
	components: {
		Detail,
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
        const route     = useRoute();
        const routeName = route.meta.title;
        useTitle(routeName);
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
				<Detail />
				</div>
			</div>
		</main>
	</div>
</div>

</template>

<style scoped></style>
