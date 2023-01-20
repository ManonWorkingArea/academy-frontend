<script>
import feather from 'feather-icons';
import NavDesktop from './NavDesktop.vue';
import NavMobile from './NavMobile.vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
	components: {
		NavDesktop,
		NavMobile,
	},
	data() {
		return {
			isOpen: false,
			token: cookies.get("userToken"),
			login: cookies.get("hasLogin"),
		};
	},
	created() {
		this.theme = localStorage.getItem('theme') || 'light';
	},
	mounted() {
		feather.replace();
		this.theme = localStorage.getItem('theme') || 'light';
	},
	methods: {
		updateTheme(theme) {
			this.theme = theme;
		},
		logout() {
			cookies.remove("userToken");
			cookies.remove("hasLogin");
			console.log("Logout");

			this.$swal({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                title: 'แจ้งเตือน',
                text: 'ออกจากระบบเรียบร้อยแล้ว',
            }).then(() => 
            {
              location.reload();
            });
		}
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>


	

	<section class="relative">

		<nav class="flex justify-between border-b" v-if="login">

			<div class="px-6 py-4 flex w-full items-center">
				<NavDesktop/>

				<router-link 
					to="/"
					class="flex-shrink-0 xl:mx-auto text-3xl font-bold font-heading"
					aria-label="register"
					>
					<img class="h-20" src="https://fti.academy/theme/skin/vodi/assets/img/logo/color-logo.png" alt="FTI Academy Logo">
				</router-link>

				<div class="hidden xl:inline-block mr-14">
					<input class="py-5 px-8 w-full placeholder-gray-400 text-xs uppercase font-semibold font-heading bg-gray-50 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text" placeholder="ค้นหา">
				</div>

				<div class="hidden xl:flex items-center">

					<router-link 
						to="/member"
						class="hidden xl:flex items-center px-6 border-l font-semibold font-heading hover:text-gray-600"
						aria-label="register"
						>
						<i data-feather="user" class="mr-2"></i>
						<span>สมาชิก</span>
					</router-link>

				</div>
			</div>

			<button @click="logout" class="hidden xl:flex items-center px-12 border-l font-semibold font-heading hover:text-gray-600">
				<i class="float-left feather-22 text-gray-500 mr-1" data-feather="power"></i>
			</button>

			<a class="xl:hidden flex mr-6 items-center text-gray-900" href="#">
			<i data-feather="shopping-cart"></i>
			<span class="inline-block w-6 h-6 text-center bg-gray-100 rounded-full font-semibold font-heading">0</span>
			</a>

			<button
				@click="isOpen = !isOpen"
				type="button"
				class="focus:outline-none self-center mr-6 xl:hidden"
				aria-label="Hamburger Menu"
				>
				<i data-feather="menu"></i>
            </button>

		</nav>

		<nav class="flex justify-between border-b" v-else>

			<div class="px-6 py-4 flex w-full items-center">

				<NavDesktop/>

				<router-link 
					to="/"
					class="flex-shrink-0 xl:mx-auto text-3xl font-bold font-heading"
					aria-label="register"
					>
					<img class="h-20" src="https://fti.academy/theme/skin/vodi/assets/img/logo/color-logo.png" alt="FTI Academy Logo">
				</router-link>

				<div class="hidden xl:inline-block mr-14">
					<input class="py-5 px-8 w-full placeholder-gray-400 text-xs uppercase font-semibold font-heading bg-gray-50 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md" type="text" placeholder="ค้นหา">
				</div>

				<div class="hidden xl:flex items-center">

					<router-link 
						to="/member/register"
						class="hidden xl:flex items-center px-6 border-l font-semibold font-heading hover:text-gray-600"
						aria-label="register"
						>
						<i data-feather="user" class="mr-2"></i>
						<span>ลงทะเบียน</span>
					</router-link>

					<router-link 
						to="/member/login"
						class="hidden xl:flex items-center px-6 border-l font-semibold font-heading hover:text-gray-600"
						aria-label="register"
						>
						<i data-feather="key" class="mr-2"></i>
						<span>เข้าสู่ระบบ</span>
					</router-link>
					
				</div>

			</div>

			<button @click="$router.push('/member/login')" class="hidden xl:flex items-center px-12 border-l font-semibold font-heading hover:text-gray-600"><i class="float-left feather-22 text-gray-500 mr-1" data-feather="power"></i></button>

			<a class="xl:hidden flex mr-6 items-center text-gray-900" href="#">
			<i data-feather="shopping-cart"></i>
			<span class="inline-block w-6 h-6 text-center bg-gray-100 rounded-full font-semibold font-heading">0</span>
			</a>
			<button
				@click="isOpen = !isOpen"
				type="button"
				class="focus:outline-none self-center mr-6 xl:hidden"
				aria-label="Hamburger Menu"
				>
				<i data-feather="menu"></i>
            </button>
		</nav>

		<div class="navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50" :class="isOpen ? 'block' : 'hidden'">
			<div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
			<nav class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
				<div class="flex mb-8 justify-between">
					<a class="inline-flex items-center font-semibold font-heading" href="#">
						<i data-feather="user" class="mr-2"></i>
						<span>เข้าสู่ระบบ</span>
					</a>
					<div class="flex items-center">

					<a class="flex items-center mr-10" href="#">
						<i data-feather="shopping-cart" class="mr-2"></i>
						<span class="inline-block w-6 h-6 text-center bg-gray-100 rounded-full font-semibold font-heading">0</span>
					</a>

					<button class="navbar-close"  @click="isOpen = !isOpen">
						<i data-feather="x"></i>
					</button>

					</div>
				</div>
				<input class="block mb-10 py-5 px-8 bg-gray-100 rounded-md border-transparent focus:ring-blue-300 focus:border-blue-300 focus:outline-none" type="search" placeholder="Search">
				<NavMobile/>
			</nav>
		</div>
	</section>
	
</template>

<style scoped>
#nav a.router-link-exact-active {
	@apply text-indigo-700;
	@apply dark:text-indigo-400;
	@apply font-medium;
}
</style>
