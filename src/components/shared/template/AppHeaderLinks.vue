<script>
export default {
	props: ['showModal', 'isOpen'],
};
</script>

<template>

	<ul class="hidden xl:flex font-semibold font-heading"  v-if="!isOpen">
		<li class="mr-12">
			<router-link to="/" class="text-gray-600 hover:text-blue-600" aria-label="Home">หน้าหลัก</router-link>
		</li>
		<li class="mr-12">
			<router-link to="/course" class="hover:text-gray-600" aria-label="Course">หลักสูตร ส.อ.ท.</router-link>
		</li>
		<li class="mr-12">
			<router-link to="/about" class="hover:text-gray-600" aria-label="About Me">เกี่ยวกับเรา</router-link>
		</li>
		<li>
			<router-link to="/contact" class="hover:text-gray-600" aria-label="Contact">ติดต่อเรา</router-link>
		</li>
	</ul>

	<ul class="text-3xl font-bold font-heading"  v-if="isOpen">

		<li class="mb-8"><a href="#">Category</a></li>
		<li class="mb-8"><a href="#">Collection</a></li>
		<li class="mb-8"><a href="#">Story</a></li>
		<li><a href="#">Brand</a></li>

		<li class="mb-8">
			<router-link to="/" aria-label="Home">หน้าหลัก</router-link>
		</li>
		<li class="mb-8">
			<router-link to="/course" aria-label="Course">หลักสูตร ส.อ.ท.</router-link>
		</li>
		<li class="mb-8">
			<router-link to="/about" aria-label="About Me">เกี่ยวกับเรา</router-link>
		</li>
		<li>
			<router-link to="/contact" aria-label="Contact">ติดต่อเรา</router-link>
		</li>

	</ul>

</template>

<style lang="scss" scoped></style>
