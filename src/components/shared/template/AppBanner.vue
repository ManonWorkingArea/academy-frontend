<script>
import feather from 'feather-icons';

export default {
	name: 'Home',
	data: () => {
		return {
			theme: '',
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
	<section class="relative">

		<div class="relative container mx-auto px-4">
			<img class="absolute bottom-0 inset-x-0 w-full h-80 -mb-16 lg:mb-0 md:h-full object-cover" src="https://shuffle.dev/yofte-assets/images/women.png" alt="">
			<div class="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2 flex-col items-center">
			<span class="mb-5 font-bold font-heading">01</span>
			<div class="mb-5 h-16 w-px bg-gray-100"></div>
			<button class="mb-5">
				<img src="https://shuffle.dev/yofte-assets/elements/circle.svg" alt="">
			</button>
			<button class="mb-6 w-1 h-1 bg-blue-500 rounded-full"></button>
			<button class="mb-6 w-1 h-1 bg-blue-500 rounded-full"></button>
			<div class="h-16 w-px bg-gray-100"></div>
			</div>
			<div class="relative flex flex-wrap -mx-4">
				<div class="w-full md:w-1/2 px-4 mb-12 lg:mb-0 pt-20 lg:pt-32 pb-32 lg:pb-64">
					<div class="max-w-md">
					<h2 class="mb-8 text-5xl lg:text-6xl font-semibold font-heading">Get 10% off site-wide when you spend $30 with code: new</h2>
					<p class="mb-20 text-lg text-gray-600">Discover more products and inspiration.</p>
					<a class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-6 px-8 rounded-md uppercase transition duration-200" href="#">Shop Now</a>
					</div>
				</div>
			</div>
		</div>
		
	</section>
</template>

<style scoped></style>
