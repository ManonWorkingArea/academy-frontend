<script>
import Loader from '@/components/shared/template/Loader.vue';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    data() {
      return {
        hosting:'',
        listItems: [],
        loading_sources: true,
        
      }
    },
    components: {
      Loader
    },
    methods: {
      async getData() {
        try 
        {
          if(this.$store.state.auth) 
          {
            const courseList = JSON.parse(sessionStorage.getItem("courseList") || '[]');
            if(Object.keys(courseList).length === 0) {
              this.loading_sources = false;
              const resAPI = await fetch("https://api.fti.academy/api/get_lesson_masterdata",
              {
                  method: 'GET',
                  headers: {
                    'API-KEY': 'h1MFg89fZh',
                    'SECRET-KEY': 'f03y28LikajofkavhTN5P57lKnuUTT',
                  }
              });
              const finalRes   = await resAPI.json();
              this.listItems   = finalRes;

              sessionStorage.setItem("courseList", JSON.stringify(finalRes));

              if(finalRes.status)
              {
                //toast.success("โหลดข้อมูลสำเร็จ.....", {timeout:1000});
                this.$swal({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'success',
                    title: 'ผลการโหลดข้อมูล',
                    text: 'ดึงข้อมูลหลักสูตรสำเร็จแล้ว',
                });
                this.loading_sources = true;
                console.log(finalRes)
              }
              else
              {
                toast.error("เกิดข้อผิดพลาด.....", {timeout:1000});
                console.log(finalRes)
              }
            }
            else
            {
              this.listItems   = courseList;
            }
          }
        } catch (error) 
        {
          console.log(error)
        }
      }
    },
    async mounted () {
        

      try  
      {
          await this.getData();
      }
      catch (error) 
      {
          console.log(Error);
      }
    },
    setup() {
      console.log("Setup");
    },
};
</script>

<template>

    <div v-if="!loading_sources" class="text-center"><Loader/></div>

        <div class="overflow-hidden bg-white">
            <div class="relative mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
            <svg class="absolute top-0 left-full -translate-x-1/2 -translate-y-3/4 transform lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
                <defs>
                <pattern id="8b1b5f72-e944-4457-af67-0c6d15a99f38" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
                </defs>
                <rect width="404" height="784" fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)" />
            </svg>
            <div class="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div class="lg:col-span-1">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better way to send money.</h2>
                </div>
                <dl class="mt-10 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:space-y-0 lg:col-span-2 lg:mt-0">
                <div>
                    <dt>
                    <div class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                        <!-- Heroicon name: outline/globe-alt -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                    <p class="mt-5 text-lg font-medium leading-6 text-gray-900">Competitive rates</p>
                    </dt>
                    <dd class="mt-2 text-base text-gray-500">Consequuntur omnis dicta cumque, inventore atque ab dolores aspernatur tempora ab doloremque.</dd>
                </div>
                <div>
                    <dt>
                    <div class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                        <!-- Heroicon name: outline/scale -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                        </svg>
                    </div>
                    <p class="mt-5 text-lg font-medium leading-6 text-gray-900">No hidden fees</p>
                    </dt>
                    <dd class="mt-2 text-base text-gray-500">Corporis quisquam nostrum nulla veniam recusandae temporibus aperiam officia incidunt at distinctio ratione.</dd>
                </div>
                <div>
                    <dt>
                    <div class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                        <!-- Heroicon name: outline/bolt -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <p class="mt-5 text-lg font-medium leading-6 text-gray-900">Instant transfers</p>
                    </dt>
                    <dd class="mt-2 text-base text-gray-500">Omnis, illo delectus? Libero, possimus nulla nemo tenetur adipisci repellat dolore eligendi velit doloribus mollitia.</dd>
                </div>
                <div>
                    <dt>
                    <div class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                        <!-- Heroicon name: outline/envelope -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <p class="mt-5 text-lg font-medium leading-6 text-gray-900">Reminder emails</p>
                    </dt>
                    <dd class="mt-2 text-base text-gray-500">Veniam necessitatibus reiciendis fugit explicabo dolorem nihil et omnis assumenda odit? Quisquam unde accusantium.</dd>
                </div>
                </dl>
            </div>
            </div>
        </div>

        <div class="relative bg-gray-900">
            <div class="absolute bottom-0 h-80 w-full xl:inset-0 xl:h-full">
                <div class="h-full w-full xl:grid xl:grid-cols-2">
                    <div class="h-full xl:relative xl:col-start-2">
                    <img class="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops">
                    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"></div>
                    </div>
                </div>
            </div>
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
                <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                    <h2 class="text-base font-semibold text-indigo-300">Valuable Metrics</h2>
                    <p class="mt-3 text-3xl font-bold tracking-tight text-white">Get actionable data that will help grow your business</p>
                    <p class="mt-5 text-lg text-gray-300">Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing quis in viverra tristique sem. Ornare feugiat viverra eleifend fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus laoreet amet lacus nibh integer quis. Eu vulputate diam sit tellus quis at.</p>
                    <div class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                    <p>
                        <span class="block text-2xl font-bold text-white">8K+</span>
                        <span class="mt-1 block text-base text-gray-300">
                        <span class="font-medium text-white">Companies</span> use laoreet amet lacus nibh integer quis. </span>
                    </p>
                    <p>
                        <span class="block text-2xl font-bold text-white">25K+</span>
                        <span class="mt-1 block text-base text-gray-300">
                        <span class="font-medium text-white">Countries around the globe</span> lacus nibh integer quis. </span>
                    </p>
                    <p>
                        <span class="block text-2xl font-bold text-white">98%</span>
                        <span class="mt-1 block text-base text-gray-300">
                        <span class="font-medium text-white">Customer satisfaction</span> laoreet amet lacus nibh integer quis. </span>
                    </p>
                    <p>
                        <span class="block text-2xl font-bold text-white">12M+</span>
                        <span class="mt-1 block text-base text-gray-300">
                        <span class="font-medium text-white">Issues resolved</span> lacus nibh integer quis. </span>
                    </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
            <div class="absolute inset-0">
            <div class="h-1/3 bg-white sm:h-2/3"></div>
            </div>
            <div class="relative mx-auto max-w-7xl">
            <div class="text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.</p>
            </div>
            <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div class="flex-shrink-0">
                    <img class="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="">
                </div>
                <div class="flex flex-1 flex-col justify-between bg-white p-6">
                    <div class="flex-1">
                    <p class="text-sm font-medium text-indigo-600">
                        <a href="#" class="hover:underline">Article</a>
                    </p>
                    <a href="#" class="mt-2 block">
                        <p class="text-xl font-semibold text-gray-900">Boost your conversion rate</p>
                        <p class="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
                    </a>
                    </div>
                    <div class="mt-6 flex items-center">
                    <div class="flex-shrink-0">
                        <a href="#">
                        <span class="sr-only">Roel Aufderehar</span>
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </a>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">
                        <a href="#" class="hover:underline">Roel Aufderehar</a>
                        </p>
                        <div class="flex space-x-1 text-sm text-gray-500">
                        <time datetime="2020-03-16">Mar 16, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>6 min read</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div class="flex-shrink-0">
                    <img class="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="">
                </div>
                <div class="flex flex-1 flex-col justify-between bg-white p-6">
                    <div class="flex-1">
                    <p class="text-sm font-medium text-indigo-600">
                        <a href="#" class="hover:underline">Video</a>
                    </p>
                    <a href="#" class="mt-2 block">
                        <p class="text-xl font-semibold text-gray-900">How to use search engine optimization to drive sales</p>
                        <p class="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.</p>
                    </a>
                    </div>
                    <div class="mt-6 flex items-center">
                    <div class="flex-shrink-0">
                        <a href="#">
                        <span class="sr-only">Brenna Goyette</span>
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </a>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">
                        <a href="#" class="hover:underline">Brenna Goyette</a>
                        </p>
                        <div class="flex space-x-1 text-sm text-gray-500">
                        <time datetime="2020-03-10">Mar 10, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>4 min read</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div class="flex-shrink-0">
                    <img class="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="">
                </div>
                <div class="flex flex-1 flex-col justify-between bg-white p-6">
                    <div class="flex-1">
                    <p class="text-sm font-medium text-indigo-600">
                        <a href="#" class="hover:underline">Case Study</a>
                    </p>
                    <a href="#" class="mt-2 block">
                        <p class="text-xl font-semibold text-gray-900">Improve your customer experience</p>
                        <p class="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.</p>
                    </a>
                    </div>
                    <div class="mt-6 flex items-center">
                    <div class="flex-shrink-0">
                        <a href="#">
                        <span class="sr-only">Daniela Metz</span>
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </a>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">
                        <a href="#" class="hover:underline">Daniela Metz</a>
                        </p>
                        <div class="flex space-x-1 text-sm text-gray-500">
                        <time datetime="2020-02-12">Feb 12, 2020</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>11 min read</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        
        <div class="relative bg-gray-900">
            <div class="absolute bottom-0 h-80 w-full xl:inset-0 xl:h-full">
            <div class="h-full w-full xl:grid xl:grid-cols-2">
                <div class="h-full xl:relative xl:col-start-2">
                <img class="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops">
                <div aria-hidden="true" class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"></div>
                </div>
            </div>
            </div>
            <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
            <div class="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
                <h2 class="text-base font-semibold text-indigo-300">Valuable Metrics</h2>
                <p class="mt-3 text-3xl font-bold tracking-tight text-white">Get actionable data that will help grow your business</p>
                <p class="mt-5 text-lg text-gray-300">Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing quis in viverra tristique sem. Ornare feugiat viverra eleifend fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus laoreet amet lacus nibh integer quis. Eu vulputate diam sit tellus quis at.</p>
                <div class="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
                <p>
                    <span class="block text-2xl font-bold text-white">8K+</span>
                    <span class="mt-1 block text-base text-gray-300">
                    <span class="font-medium text-white">Companies</span> use laoreet amet lacus nibh integer quis. </span>
                </p>
                <p>
                    <span class="block text-2xl font-bold text-white">25K+</span>
                    <span class="mt-1 block text-base text-gray-300">
                    <span class="font-medium text-white">Countries around the globe</span> lacus nibh integer quis. </span>
                </p>
                <p>
                    <span class="block text-2xl font-bold text-white">98%</span>
                    <span class="mt-1 block text-base text-gray-300">
                    <span class="font-medium text-white">Customer satisfaction</span> laoreet amet lacus nibh integer quis. </span>
                </p>
                <p>
                    <span class="block text-2xl font-bold text-white">12M+</span>
                    <span class="mt-1 block text-base text-gray-300">
                    <span class="font-medium text-white">Issues resolved</span> lacus nibh integer quis. </span>
                </p>
                </div>
            </div>
            </div>
        </div>
        
        <div class="bg-gray-50 pt-12 sm:pt-16">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-4xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Trusted by developers from over 80 planets</h2>
                <p class="mt-3 text-xl text-gray-500 sm:mt-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.</p>
            </div>
            </div>
            <div class="mt-10 bg-white pb-12 sm:pb-16">
            <div class="relative">
                <div class="absolute inset-0 h-1/2 bg-gray-50" />
                <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-4xl">
                    <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                    <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                        <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Pepperoni</dt>
                        <dd class="order-1 text-5xl font-bold tracking-tight text-indigo-600">100%</dd>
                    </div>
                    <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                        <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Delivery</dt>
                        <dd class="order-1 text-5xl font-bold tracking-tight text-indigo-600">24/7</dd>
                    </div>
                    <div class="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                        <dt class="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Calories</dt>
                        <dd class="order-1 text-5xl font-bold tracking-tight text-indigo-600">100k</dd>
                    </div>
                    </dl>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div class="bg-white">
            <div class="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:flex lg:items-center lg:py-32 lg:px-8">
            <div class="lg:w-0 lg:flex-1">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sign up for our newsletter</h2>
                <p class="mt-3 max-w-3xl text-lg text-gray-500">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.</p>
            </div>
            <div class="mt-8 lg:mt-0 lg:ml-8">
                <form class="sm:flex">
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email-address" type="email" autocomplete="email" required class="w-full rounded-md border border-gray-300 px-5 py-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:max-w-xs" placeholder="Enter your email">
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button type="submit" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-5 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Notify me</button>
                </div>
                </form>
                <p class="mt-3 text-sm text-gray-500"> We care about the protection of your data. Read our <a href="#" class="font-medium underline">Privacy Policy.</a>
                </p>
            </div>
            </div>
        </div>

</template>
<style>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>