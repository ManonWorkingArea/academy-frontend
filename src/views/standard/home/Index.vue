<script>
import { setPageTitle } from '@/utils/title';
import {useRoute} from 'vue-router'
import Builder from '../../../components/standard/home/Builder.vue';
import Banner from '../../../components/standard/home/Banner.vue';

export default {
	name: 'Home',
	components: {
		Builder,
		Banner
	},
	data() {
		setPageTitle("หน้าหลัก");
		return {
			route: useRoute(),
		}
    },
	methods: {
	}
};
</script>

<template>
<Banner />
<Builder />
</template>