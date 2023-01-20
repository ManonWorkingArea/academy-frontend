<script>
import feather from 'feather-icons';

export default {
	name: 'Breadcrumbs',
	data: () => {
		return {
			theme: '',
            breadcrumbs : [{ id: 1, name: 'Men', href: '#' }]
		};
	},
	created() {
		this.theme = localStorage.getItem('theme') || 'light';
	},
	mounted() {
		feather.replace();
		this.theme = localStorage.getItem('theme') || 'light';
	},
	updated() {
		feather.replace();
	},
	methods: {},
};
</script>

<template>

    <div class="border-b border-gray-200">
        <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">{{ this.$route.meta.title }}</h1>
        <nav aria-label="Breadcrumb" class="mx-auto max-w-7xl">
          <ol role="list" class="flex items-center space-x-4 py-4">
            <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.id">
              <div class="flex items-center">
                <a :href="breadcrumb.href" class="mr-4 text-sm font-medium text-gray-900">{{ breadcrumb.name }}</a>
                <svg viewBox="0 0 6 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-auto text-gray-300">
                  <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                </svg>
              </div>
            </li>
            <li class="text-sm">
              <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">New Arrivals</a>
            </li>
          </ol>
        </nav>

        
      </div>

</template>