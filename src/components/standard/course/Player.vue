<script>

// Component
// Plugin
import { useTitle } from 'vue-page-title';
import { useRoute } from 'vue-router';

import Hls from "hls.js";
import Plyr from "plyr";

let counter     = 0;
let playtime    = 0;

export default {
    data() {
      return {
        courseitem: [],
        param_id:"",
        param_ep:"",
        loading_sources: true,
        playerLogo:"",
        playerSource:"",
        playerPoster:"",
        playerOptions: {
          controls: [
            "play-large",
            "current-time",
            "play",
            "mute",
            "volume",
            "progress",
            "settings",
            "fullscreen"
          ],
          settings: ["quality", "speed", "loop"]
        }
      }
    },
    components: {
    },
    methods: {
        async getData() {
            try 
            {
                // Get EP Source
                this.playerSource   = "https://vz-28af3134-886.b-cdn.net/24b5e108-1c7f-438d-8fde-8c49fa43a9c0/playlist.m3u8"
                this.playerPoster   = "https://vz-28af3134-886.b-cdn.net/24b5e108-1c7f-438d-8fde-8c49fa43a9c0/thumbnail.jpg"
                this.playerLogo     = "https://fti.academy/theme/skin/vodi/assets/img/logo/color-logo.png"
            } 
            catch (error) 
            {
                console.log(error)
            }
      },
      videoStreaming() {
			const _self     = this
			var url         = _self.playerSource;
			const video     = this.$refs.videoStreaming;
			console.log("tage video", video);
			const defaultOptions = {};
			if (Hls.isSupported()) 
			{
			const hls = new Hls();
			hls.loadSource(url);
			hls.on(Hls.Events.MANIFEST_PARSED, function() {
				const availableQualities = hls.levels.map(l => l.height);
				defaultOptions.quality = {
				default: availableQualities[0],
				options: availableQualities,
				forced: true,
				onChange: e => updateQuality(e)
				};
				const player = new Plyr(video, defaultOptions);

				//------ ini Player Function

                player.on("ready", () => {
                });

				player.on('play', () => {
					console.log("Play");
                    //player.currentTime = 60;
				});

				player.on('pause', () => {
					_self.showTimer()
				});

				player.on('timeupdate', () => {
					_self.getTimer()
				});

				player.on('ended', () => {
					_self.stopTimer()
				});

				player.on('progress', () => {
					_self.updateTimer()
				});
				//------ ini Player Function=
			});
			hls.attachMedia(video);
			window.hls = hls;
			}
			else
			{
			const player = new Plyr(video, defaultOptions);
			player.on('timeupdate', (event) => {
				const instance = event.detail.plyr;
				console.log(instance);
			});
			}

			function updateQuality(newQuality) {
			window.hls.levels.forEach((level, levelIndex) => {
				if (level.height === newQuality) {
				console.log("Found quality match with " + newQuality);
				window.hls.currentLevel = levelIndex;
				}
			});
			}
		},
		getTimer: () => {
			counter = counter+1;
			//console.log('counter',counter)
		},
		updateTimer: () => {
            let realtime = counter/4
			console.log('Timer:',(realtime))
            playtime = playtime+realtime
			counter = 0;
		},
		stopTimer: () => {
			console.log('End EP')
		},
        showTimer: () => {
			console.log('Playtime',playtime)
		}
	},
    head () {
        return {
            title: this.courseitem.lesson_name
        }
    },
    watch: {
        '$route.params.id': {
            deep: true,
            immediate: true,
            handler() {
                console.log("watch");
            }
        }
    },
    async mounted () {
        try {
            await this.getData();
            this.videoStreaming();
        } 
        catch (error) {
            console.log(Error);
        }
    },
    setup() {
        const route     = useRoute();
        const routeName = route.meta.parent;
        useTitle(routeName);
    },
};
</script>

<template>

<div class="bg-gray-50" >

    <main>

        <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 pt-6 pb-4 sm:px-18 sm:pt-6 sm:pb-8 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
                <div class="lg:flex lg:items-center lg:justify-between">
                    <div class="min-w-0 flex-1">
                      <nav class="flex" aria-label="Breadcrumb">
                        <ol role="list" class="flex items-center space-x-4">
                          <li>
                            <div class="flex">
                              <a :href="'/course'" class="text-sm font-medium text-gray-500 hover:text-gray-700">หลักสูตร</a>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center">
                              <i class="feather-16 mr-1 ml-2 text-gray-500" data-feather="chevron-right"></i>
                              <a :href="'/course/detail/' + courseitem.lesson_code" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" v-html="courseitem.lesson_name"></a>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center">
                              <i class="feather-16 mr-1 ml-2 text-gray-500" data-feather="chevron-right"></i>
                              <a href="#" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{param_ep}}</a>
                            </div>
                          </li>
                        </ol>
                      </nav>
                      <h2 class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight" v-html="courseitem.lesson_name"></h2>
                      
                      <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 hidden md:flex">
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <i class="feather-16 mr-1 ml-2 text-black" data-feather="clock"></i>
                            {{courseitem.duration_course}}
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <i class="feather-16 mr-1 ml-2 text-black" data-feather="user"></i>
                            {{courseitem.teacher_name}}
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <i class="feather-16 mr-1 ml-2 text-black" data-feather="check"></i>
                            เรียนแล้ว 50%
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <i class="feather-16 mr-1 ml-2 text-black" data-feather="bookmark"></i>
                            หมดอายุ January 9, 2020
                        </div>
                      </div>
                    </div>
                    
                  </div>
                
            </div>
        </div>

        <div class="bg-gray-800">
            <div class="mx-auto max-w-2xl sm:px-2 sm:pt-8 sm:pb-8 lg:max-w-7xl lg:px-8">
                
                <figure>
                    <vue-plyr class="relative">
                        <div class="absolute text-white z-50 p-1 left-5">
                            <img :src="playerLogo" alt="" class="w-24 lg:w-36 xs:w-10 sm:w-10">
                        </div>
                        <video ref="videoStreaming" controls crossorigin playsinline><source src=""></video>
                    </vue-plyr>
                </figure>

            </div>
        </div>

        <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-16">
                <!-- Details section -->
                <section aria-labelledby="details-heading">
                    <div class="flex flex-col items-center text-center">
                        <h2 id="details-heading" class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">เนื้อหาในหลักสูตร</h2>
                        <div class="mt-3 max-w-3xl text-lg text-gray-600" >รายละเอียดเนื้อหาของหลักสูตรนี้ คุณต้องทำการเข้าเรียนตามลำดับแต่ละบทเรียน</div>
                    </div>
                    <div class="overflow-hidden bg-white shadow sm:rounded-md mt-8">
                        <ul role="list" class="divide-y divide-gray-200">
                        <li>
                            <a href="#" class="block hover:bg-gray-50">
                            <div class="px-4 py-4 sm:px-6">
                                <div class="flex items-center justify-between">
                                <p class="truncate text-md font-medium text-indigo-600">1.ชื่อหัวข้อ / บทเรียน</p>
                                <div class="ml-2 flex flex-shrink-0">
                                    <p class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">10:10:00</p>
                                </div>
                                </div>
                                <div class="mt-2 sm:flex sm:justify-between">
                                <div class="sm:flex">
                                    <p class="flex items-center text-sm text-gray-500">
                                    <i class="feather-16 mr-1" data-feather="users"></i> ชื่อวิทยากร
                                    </p>
                                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                    <i class="feather-16 mr-1" data-feather="bookmark"></i> หมวดหมู่หลักสูตร
                                    </p>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <i data-feather="play-circle"></i>
                                    <p> เข้าเรียนล่าสุด <time datetime="2020-01-07">January 7, 2020</time>
                                    </p>
                                </div>
                                </div>
                            </div>
                            </a>
                        </li>
                        
                        </ul>
                    </div>
                </section>
                <!-- Policies section -->
                <section aria-labelledby="policy-heading" class="mt-16 lg:mt-12">
                    <h2 id="policy-heading" class="sr-only">Our policies</h2>
                    <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
                        <div>
                            <img src="https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg" alt="" class="h-24 w-auto">
                            <h3 class="mt-6 text-base font-medium text-gray-900">เรียนที่ไหนก็ได้ ทุกที่ทุกเวลา</h3>
                            <p class="mt-3 text-base text-gray-500">Or so we want you to believe. In reality our chat widget is powered by a naive series of</p>
                        </div>
                        <div>
                            <img src="https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg" alt="" class="h-24 w-auto">
                            <h3 class="mt-6 text-base font-medium text-gray-900">ชำระผ่านช่องทางที่ปลอดภัย</h3>
                            <p class="mt-3 text-base text-gray-500">Look at the cart in that icon, there&#039;s never been a faster cart. What does this mean</p>
                        </div>
                        <div>
                            <img src="https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg" alt="" class="h-24 w-auto">
                            <h3 class="mt-6 text-base font-medium text-gray-900">ใบรับรองอิเลคทรอนิคส์</h3>
                            <p class="mt-3 text-base text-gray-500">We sell these hoping that you will buy them for your friends and they will never actually</p>
                        </div>
                    </div>
                </section>
            </div>

            
        <section aria-labelledby="reviews-heading" class="bg-white">
            <div class="mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:py-17 lg:px-8">
            <div class="lg:col-span-4">
                <h2 id="reviews-heading" class="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>
                <div class="mt-3 flex items-center">
                <div>
                    <div class="flex items-center">

                    <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <!-- Heroicon name: mini/star -->
                    <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <!-- Heroicon name: mini/star -->
                    <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <!-- Heroicon name: mini/star -->
                    <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    <!-- Heroicon name: mini/star -->
                    <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <p class="sr-only">4 out of 5 stars</p>
                </div>
                <p class="ml-2 text-sm text-gray-900">Based on 1624 reviews</p>
                </div>
                <div class="mt-6">
                <h3 class="sr-only">Review data</h3>
                <dl class="space-y-3">
                    <div class="flex items-center text-sm">
                    <dt class="flex flex-1 items-center">
                        <p class="w-3 font-medium text-gray-900">5 <span class="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                        <!-- Heroicon name: mini/star -->
                        <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative ml-3 flex-1">
                            <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                            <div style="width: calc(1019 / 1624 * 100%)" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                        </div>
                        </div>
                    </dt>
                    <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">63%</dd>
                    </div>
                    <div class="flex items-center text-sm">
                    <dt class="flex flex-1 items-center">
                        <p class="w-3 font-medium text-gray-900">4 <span class="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                        <!-- Heroicon name: mini/star -->
                        <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative ml-3 flex-1">
                            <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                            <div style="width: calc(162 / 1624 * 100%)" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                        </div>
                        </div>
                    </dt>
                    <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">10%</dd>
                    </div>
                    <div class="flex items-center text-sm">
                    <dt class="flex flex-1 items-center">
                        <p class="w-3 font-medium text-gray-900">3 <span class="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                        <!-- Heroicon name: mini/star -->
                        <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative ml-3 flex-1">
                            <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                            <div style="width: calc(97 / 1624 * 100%)" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                        </div>
                        </div>
                    </dt>
                    <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">6%</dd>
                    </div>
                    <div class="flex items-center text-sm">
                    <dt class="flex flex-1 items-center">
                        <p class="w-3 font-medium text-gray-900">2 <span class="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                        <!-- Heroicon name: mini/star -->
                        <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative ml-3 flex-1">
                            <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                            <div style="width: calc(199 / 1624 * 100%)" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                        </div>
                        </div>
                    </dt>
                    <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">12%</dd>
                    </div>
                    <div class="flex items-center text-sm">
                    <dt class="flex flex-1 items-center">
                        <p class="w-3 font-medium text-gray-900">1 <span class="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                        <!-- Heroicon name: mini/star -->
                        <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <div class="relative ml-3 flex-1">
                            <div class="h-3 rounded-full border border-gray-200 bg-gray-100"></div>
                            <div style="width: calc(147 / 1624 * 100%)" class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"></div>
                        </div>
                        </div>
                    </dt>
                    <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">9%</dd>
                    </div>
                </dl>
                </div>
                <div class="mt-10">
                <h3 class="text-lg font-medium text-gray-900">Share your thoughts</h3>
                <p class="mt-1 text-sm text-gray-600">If you’ve used this product, share your thoughts with other customers</p>
                <a href="#" class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">Write a review</a>
                </div>
            </div>
            <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <h3 class="sr-only">Recent reviews</h3>
                <div class="flow-root">
                <div class="-my-12 divide-y divide-gray-200">
                    <div class="py-12">
                    <div class="flex items-center">
                        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="Emily Selman." class="h-12 w-12 rounded-full">
                        <div class="ml-4">
                        <h4 class="text-sm font-bold text-gray-900">Emily Selman</h4>
                        <div class="mt-1 flex items-center">
                            <!--
                                Heroicon name: mini/star
        
                                Active: "text-yellow-400", Default: "text-gray-300"
                            -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                            </svg>
                            <!-- Heroicon name: mini/star -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                            </svg>
                            <!-- Heroicon name: mini/star -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                            </svg>
                            <!-- Heroicon name: mini/star -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                            </svg>
                            <!-- Heroicon name: mini/star -->
                            <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <p class="sr-only">5 out of 5 stars</p>
                        </div>
                    </div>
                    <div class="mt-4 space-y-6 text-base italic text-gray-600">
                        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
                    </div>
                    </div>
                    <!-- More reviews... -->
                </div>
                </div>
            </div>
            </div>
        </section>
    </main>
</div>
  
</template>


<style>
.title {
font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
display: block;
font-weight: 400;
font-size: 100px;
color: #2E495E;
letter-spacing: 1px;
font-size: 6em;
}
.green {
color: #00C48D;
}

.subtitle {
font-weight: 300;
font-size: 3em;
color: #2E495E;
word-spacing: 5px;
padding-bottom: 15px;
}

.links {
padding-top: 15px;
}

:root {
--plyr-color-main: #ff0000; /* use --color-btn-primary for NBC Theme */
}

.plyr--video {
border-radius: 10px;
}
</style>