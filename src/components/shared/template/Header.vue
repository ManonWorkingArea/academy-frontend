<script>
  import feather from 'feather-icons';
  import NavDesktop from '@/components/shared/template/nav/NavDesktop.vue';
  import NavMobile from '@/components/shared/template/nav/NavMobile.vue';
  import { useCookies } from "vue3-cookies";
  const { cookies } = useCookies();
  import { ls } from 'vue-lsp'
  import {useTitle} from 'vue-page-title';
  import {useRoute} from 'vue-router'
  export default {
    components: {
      NavDesktop,
      NavMobile,
    },
    data() {
      const route     = useRoute();
      const routeName = route.meta.title;
      const schoolData = ls.get("host")
      useTitle(routeName + " / " + schoolData.name);
      return {
        website:[],
        isOpen: false,
        token: cookies.get("userToken"),
        login: cookies.get("hasLogin"),
      };
    },
    created() {
      this.theme = localStorage.getItem('theme') || 'light';
    },
    mounted() {
      this.website = ls.get("host")
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
    setup() {
    
  },
  };
  </script>
  <script setup>
  import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
  import {
    Bars3Icon,
    ChartBarIcon,
    LifebuoyIcon,

    XMarkIcon,
  } from '@heroicons/vue/24/outline'

  
  const features = [
    {
      name: 'หลักสูตรทั้งหมด',
      href: '/course',
      description: 'รายชื่อหลักสูตรทั้งหมดของ ส.อ.ท.',
      icon: ChartBarIcon,
    }
  ]
  const resources = [
    {
      name: 'Help Center',
      description: 'Get all of your questions answered in our forums or contact support.',
      href: '#',
      icon: LifebuoyIcon,
    }
  ]
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
              <span class="sr-only">Your Company</span>
              <img class="h-16 w-auto sm:h-16" :src="website.logo"/>
              </router-link>
            </div>
            <div class="-my-2 -mr-2 md:hidden">
              <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>

            <PopoverGroup as="nav" class="hidden space-x-10 md:flex">
              <!-- <Popover class="relative" v-slot="{ open }">
                <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                  <span>หลักสูตร</span>
                  <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
                </PopoverButton>
  
                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                  <PopoverPanel class="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                    <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                        <a v-for="item in features" :key="item.name" :href="item.href" class="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50">
                          <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                          <div class="ml-4">
                            <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
                            <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                          </div>
                        </a>
                      </div>
                      <div class="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                        <div v-for="item in callsToAction" :key="item.name" class="flow-root">
                          <a :href="item.href" class="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100">
                            <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span class="ml-3">{{ item.name }}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover> -->
              <router-link to="/" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Home">หน้าหลัก</router-link>
              <router-link to="" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="About Me">ตารางอบรม</router-link>
              <router-link to="" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Contact Us">ติดต่อเรา</router-link>
              <router-link to="" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Register">ลงทะเบียน</router-link>
              <router-link to="" class="text-base font-medium text-gray-500 hover:text-gray-900" aria-label="Login">เข้าสู่ระบบ</router-link>

            </PopoverGroup>

            <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              
              <button v-if="login" @click="$router.push('/')" class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                <i class="float-left feather-20 link-icon" data-feather="user"></i> <span class="pl-2 link-icon">สมาชิก</span>
              </button>

              <button v-else @click="$router.push('/')" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                <i class="float-left feather-20 link-icon" data-feather="user-plus"></i> <span class="pl-2 link-icon">ลงทะเบียน</span>
              </button>
              
              <button @click="logout" class="px-12 border-l font-semibold font-heading hover:text-gray-600 ml-3 pl-6" v-if="login">
                <i class="float-left feather-22 text-gray-500 mr-1 link-icon" data-feather="power"></i>
              </button>

              <button @click="$router.push('/')" class="px-12 border-l font-semibold font-heading hover:text-gray-600 ml-3 pl-6" v-else>
                <i class="float-left feather-22 text-gray-500 mr-1 link-icon" data-feather="log-in"></i>
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
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="mt-6">
                  <nav class="grid gap-y-8">
                    <a v-for="item in features" :key="item.name" :href="item.href" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                      <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <span class="ml-3 text-base font-medium text-gray-900">{{ item.name }}</span>
                    </a>
                  </nav>
                </div>
              </div>
              <div class="space-y-6 py-6 px-5">
                <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                  <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>
  
                  <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Docs</a>
                  <a v-for="item in resources" :key="item.name" :href="item.href" class="text-base font-medium text-gray-900 hover:text-gray-700">{{ item.name }}</a>
                </div>

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