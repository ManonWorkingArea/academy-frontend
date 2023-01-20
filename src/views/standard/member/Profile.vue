<script>
import { setPageTitle } from '@/utils/title';
import {useRoute} from 'vue-router'
import Builder from '../../../components/standard/home/Builder.vue';
import { ls } from 'vue-lsp'

export default {
	name: 'Home',
	components: {
		Builder
	},
	data() {
      return {
        route: useRoute(),
      }
    },
	methods: {
	},
	watch: {
    "$route.query": {
        immediate: true,
        handler() {
			const title  = this.route.meta.title
			setPageTitle(title);(title + " / " + ls.get("host").name)
        }
      }
    },
	mounted () {
		const title  = this.route.meta.title
		setPageTitle(title);(title + " / " + ls.get("host").name)
	},
	setup() {
		
    },
};
</script>

<template>
<Builder />
</template>