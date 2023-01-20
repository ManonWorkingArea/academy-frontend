<script>

// Component
import Loader from '@/components/shared/template/Loader.vue';

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
      Loader,
    },
    methods: {
        async getData() {
            try 
            {
                let item            = this.$route.params.id;
                let item_ep         = this.$route.params.ep;
                let page            = this.$route.meta.parent;

                this.param_id       = item;
                this.param_ep       = item_ep;
                const courseSingle  = JSON.parse(sessionStorage.getItem("courseSingle['"+ item +"']") || '[]');
                const {setTitle}    = useTitle();
                // Check Session Storage Cache
                if(Object.keys(courseSingle).length === 0) {
                    
                    // Load Fresh Course List Data
                    this.loading_sources = false;
                    
                    const resAPI = await fetch("https://api.fti.academy/api/lesson_detail/" + item,
                    {
                        method: 'GET',
                        headers: {
                        'API-KEY': 'h1MFg89fZh',
                        'SECRET-KEY': 'f03y28LikajofkavhTN5P57lKnuUTT',
                        }
                    });
                    const finalRes       = await resAPI.json();
                    this.courseitem      = finalRes;
                    this.loading_sources = true;

                    // Set Session Storage Cache
                    sessionStorage.setItem("courseSingle['"+ item +"']", JSON.stringify(finalRes));

                    this.$swal({
                        toast: true,
                        position: 'bottom-end',
                        showConfirmButton: false,
                        timer: 3000,
                        icon: 'success',
                        title: 'ผลการโหลดข้อมูล',
                        text: 'ดึงข้อมูลหลักสูตร ' + finalRes.lesson_name + ' สำเร็จแล้ว',
                    }).then(() => 
                    {
                        setTitle(finalRes.lesson_name + "/" + page);
                    });
                    
                    // Get EP Source
                    this.playerSource   = "https://vz-28af3134-886.b-cdn.net/24b5e108-1c7f-438d-8fde-8c49fa43a9c0/playlist.m3u8"
                    this.playerPoster   = "https://vz-28af3134-886.b-cdn.net/24b5e108-1c7f-438d-8fde-8c49fa43a9c0/thumbnail.jpg"
                    this.playerLogo     = "https://fti.academy/theme/skin/vodi/assets/img/logo/color-logo.png"
                }
                else
                {
                    // Load Course List Data From Cache
                    this.courseitem  = courseSingle;
                    setTitle(this.courseitem.lesson_name + " / " + page);

                    // Get EP Source
                    this.playerSource   = "https://vz-28af3134-886.b-cdn.net/24b5e108-1c7f-438d-8fde-8c49fa43a9c0/playlist.m3u8"
                    this.playerPoster   = "https://vz-28af3134-886.b-cdn.net/24b5e108-1c7f-438d-8fde-8c49fa43a9c0/thumbnail.jpg"
                    this.playerLogo     = "https://fti.academy/theme/skin/vodi/assets/img/logo/color-logo.png"
                }

                //await this.videoStreaming();
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

<div v-if="!loading_sources" class="text-center"><Loader/></div>

<div class="bg-gray-50" v-if="loading_sources">

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

        <div class="bg-gray-200">
            <div class="mx-auto max-w-2xl sm:px-2 sm:pt-8 sm:pb-8 lg:max-w-7xl lg:px-8">
                
                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">1.Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Payment method</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 sm:p-6">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">This project would be available to anyone who has the link</h3>
                      <div class="mt-5">
                        <div class="rounded-md">
                            <fieldset>
                                <legend class="sr-only">1.Privacy setting</legend>
                                <div class="-space-y-px rounded-md bg-white">
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-tl-md rounded-tr-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Public access" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-0-label" aria-describedby="privacy-setting-0-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-0-label" class="block text-sm font-medium">Public access</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-0-description" class="block text-sm">This project would be available to anyone who has the link</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to Project Members" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-1-label" aria-describedby="privacy-setting-1-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-1-label" class="block text-sm font-medium">Private to Project Members</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-1-description" class="block text-sm">Only members of this project would be able to access</span>
                                    </span>
                                </label>
                            
                                <!-- Checked: "bg-indigo-50 border-indigo-200 z-10", Not Checked: "border-gray-200" -->
                                <label class="rounded-bl-md rounded-br-md relative border p-4 flex cursor-pointer focus:outline-none">
                                    <input type="radio" name="privacy-setting" value="Private to you" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500" aria-labelledby="privacy-setting-2-label" aria-describedby="privacy-setting-2-description">
                                    <span class="ml-3 flex flex-col">
                                    <!-- Checked: "text-indigo-900", Not Checked: "text-gray-900" -->
                                    <span id="privacy-setting-2-label" class="block text-sm font-medium">Private to you</span>
                                    <!-- Checked: "text-indigo-700", Not Checked: "text-gray-500" -->
                                    <span id="privacy-setting-2-description" class="block text-sm">You are the only one able to access this project</span>
                                    </span>
                                </label>
                                </div>
                            </fieldset>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="bg-white shadow sm:rounded-lg mt-8 mb-8">
                    <div class="px-4 py-5 text-right">
                        <button type="button" class="inline-flex text-left items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">เริ่มต้นใหม่</button>
                        <button type="button" class="inline-flex text-left items-center rounded-md border border-transparent bg-indigo-600 px-8 py-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-5">ส่งคำตอบ</button>
                        
                    </div>
                </div>
        
  
            </div>
        </div>

        
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