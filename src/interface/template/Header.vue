<script>
  import { useCookies } from "vue3-cookies";
  const { cookies } = useCookies();
  import { ls } from 'vue-lsp'
  import {useTitle} from 'vue-page-title';
  import {useRoute} from 'vue-router'
  export default {
    components: {},
    data() {
      return {
        website:[],
        pageMenu:[],
        isLoader: ls.get("loader"),
        route: useRoute(),
        token: cookies.get("userToken"),
        login: cookies.get("hasLogin"),
      };
    },
    created() {
    },
    watch: {
    "$route.query": {
        immediate: true,
        handler(n) {
          console.log("header",n);
          this.isLoader = ls.get("loader")
        }
      }
    },
    methods: {
      async getData() {
        try {
          const resPageAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school") + "&type=page", {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
          });
          const RestPageReturn   = await resPageAPI.json();
          this.pageMenu = RestPageReturn.data
          console.log("RestPageReturn",RestPageReturn)
        } catch (error) {
          console.log(error)
        }
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
      this.isLoader = ls.get("loader")
    },
    async mounted () {
      //console.log("Header.vue");
      try  
      {
        await this.getData();
        this.website = ls.get("host")
        this.isLoader = ls.get("loader")
      }
      catch (error) 
      {
        console.log(Error);
      }
    },
    setup() {
      const route     = useRoute();
      const routeName = route.meta.title;
      const schoolData = ls.get("host")
      useTitle(routeName + " / " + schoolData.name);
    },
  };
  </script>
  <script setup>
  import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
  import {
    Bars3Icon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'

</script>
<template>
  <div class="relative bg-gray-50">
    <Popover class="bg-white shadow border-b">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="flex items-center justify-between py-3 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <router-link 
            to="/"
            class=""
            aria-label="Home"
            >
            <span class="sr-only">{{website.name}}</span>
            <img class="h-16 w-auto sm:h-16" :src="website.logo"/>
            </router-link>
          </div>
          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">เปิดเมนู</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>

          <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
            <router-link to="/" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Home">หน้าหลัก</router-link>
            <router-link to="/course" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="About Me">หลักสูตร</router-link>
            <router-link v-for="(item) in pageMenu" :key="item.slug" :to="'/page/' + item.slug + '/' + item.id" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="About Me">{{item.name}}</router-link>
            <router-link to="/contact" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Contact Us">ติดต่อเรา</router-link>
          </PopoverGroup>

          <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <button @click="$router.push('/member/login')" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            เข้าสู่ระบบ
            </button>
            <button @click="$router.push('/member/register')" class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
              ลงทะเบียน
            </button>
          </div>

        </div>
      </div>

      <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <PopoverPanel focus class="absolute inset-x-0 top-0 z-20 origin-top-right transform p-2 transition md:hidden">
          <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="px-5 pt-5 pb-6">
              <div class="flex items-center justify-between">
                <div>
                  <img class="h-16 w-auto" src="https://fti.academy/theme/skin/vodi/assets/img/logo/color-logo.png" alt="Your Company" />
                </div>
                <div class="-mr-2">
                  <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">ปิดเมนู</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </PopoverButton>
                </div>
              </div>
              <div class="mt-6">
                <nav class="grid gap-y-8">
                  <router-link to="/" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Home">หน้าหลัก</router-link>
                  <router-link to="/course" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="About Me">หลักสูตร</router-link>
                  <router-link to="/contact" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Contact Us">ติดต่อเรา</router-link>
                </nav>
              </div>
            </div>
            <div class="space-y-6 py-6 px-5">
              <div v-if="login">
                <button @click="$router.push('/member/')" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                  <i class="" data-feather="power"></i> <span class="pl-2">สมาชิก</span>
                </button>
              </div>

              <div v-else>
                <button @click="$router.push('/member/register')" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                ลงทะเบียน
                </button>
                <p class="mt-6 text-center text-base font-medium text-gray-500">
                ลงทะเบียน FTI Academy แล้ว ?
                <a href="member/login" class="text-indigo-600 hover:text-indigo-500">เข้าสู่ระบบ</a>
                </p>
              </div>

            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>

  </div>
</template>