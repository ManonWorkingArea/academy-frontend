<!-- <script>

export default {
    data() {
      return {
        courseData: [],
        playerItem: [],
        examItem: [],
        courseDetail:'',
        loading_sources: true,
        dataItem: this.$route.params.id,
      }
    },
    components: {
    },

    head () {
        return {
            title: this.courseData.lesson_name
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
        // const route     = useRoute();
        // const routeName = route.meta.parent;
        // useTitle(this.courseData.name);
    },
};
</script> -->

<template>

<div  class="bg-white">

  <header class="relative">
    <nav aria-label="Top">
      <!-- Top navigation -->
      <div class="bg-gray-900">
        <div class="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <!-- Currency selector -->
          <form class="hidden lg:block lg:flex-1">
            <div class="flex">
              <label for="desktop-currency" class="sr-only">Currency</label>
              <div class="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                <select id="desktop-currency" name="currency" class="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100">
                  <option>CAD</option>
                  <option>USD</option>
                  <option>AUD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <!-- Heroicon name: mini/chevron-down -->
                  <svg class="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </form>
          <p class="flex-1 text-center text-sm font-medium text-white lg:flex-none">Get free delivery on orders over $100</p>
          <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <a href="#" class="text-sm font-medium text-white hover:text-gray-100">Create an account</a>
            <span class="h-6 w-px bg-gray-600" aria-hidden="true"></span>
            <a href="#" class="text-sm font-medium text-white hover:text-gray-100">Sign in</a>
          </div>
        </div>
      </div>
    </nav>
  </header>


  <QueryWrapper :url="url" :loadingText="loadingText" :error="error" :data="data" :mode="'single'" :pageName="'หลักสูตร'" v-if="loading">

    <template v-slot:default="{ data }">
        
        <div v-for="item in data" :key="item.id">

          <main v-if="item.slug" class="pt-5 sm:pt-8">
            <nav aria-label="Breadcrumb">
              <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li>
                  <div class="flex items-center">
                    <a href="#" class="mr-2 text-sm font-medium text-gray-900">Men</a>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-4 text-gray-300">
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
        
                <li>
                  <div class="flex items-center">
                    <a href="#" class="mr-2 text-sm font-medium text-gray-900">Clothing</a>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-4 text-gray-300">
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
        
                <li class="text-sm">
                  <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">Basic Tee 6-Pack</a>
                </li>
              </ol>
            </nav>
        
            <!-- Image gallery -->
            <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
              <div class="m-5 overflow-hidden rounded-lg lg:block">
                <img :src="item.cover" alt="Two each of gray, white, and black shirts laying flat." class="h-full w-full object-contain object-center">
              </div>
            </div>
        
            <!-- Product info -->
            <div class="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
              <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{item.name}}</h1>
              </div>
        
              <!-- Options -->
              <div class="mt-4 lg:row-span-3 lg:mt-0">
                <h2 class="sr-only">Product information</h2>
                <p class="text-3xl tracking-tight text-gray-900">$192</p>
        
                <!-- Reviews -->
                <div class="mt-6">
                  <h3 class="sr-only">Reviews</h3>
                  <div class="flex items-center">
                    <div class="flex items-center">
                      <!--
                        Heroicon name: mini/star
        
                        Active: "text-gray-900", Default: "text-gray-200"
                      -->
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
        
                      <!-- Heroicon name: mini/star -->
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
        
                      <!-- Heroicon name: mini/star -->
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
        
                      <!-- Heroicon name: mini/star -->
                      <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
        
                      <!-- Heroicon name: mini/star -->
                      <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="sr-only">4 out of 5 stars</p>
                    <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                  </div>
                </div>
        
                <form class="mt-10">
                  <!-- Colors -->
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Color</h3>
        
                    <fieldset class="mt-4">
                      <legend class="sr-only">Choose a color</legend>
                      <div class="flex items-center space-x-3">
                        <!--
                          Active and Checked: "ring ring-offset-1"
                          Not Active and Checked: "ring-2"
                        -->
                        <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                          <input type="radio" name="color-choice" value="White" class="sr-only" aria-labelledby="color-choice-0-label">
                          <span id="color-choice-0-label" class="sr-only"> White </span>
                          <span aria-hidden="true" class="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full"></span>
                        </label>
        
                        <!--
                          Active and Checked: "ring ring-offset-1"
                          Not Active and Checked: "ring-2"
                        -->
                        <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                          <input type="radio" name="color-choice" value="Gray" class="sr-only" aria-labelledby="color-choice-1-label">
                          <span id="color-choice-1-label" class="sr-only"> Gray </span>
                          <span aria-hidden="true" class="h-8 w-8 bg-gray-200 border border-black border-opacity-10 rounded-full"></span>
                        </label>
        
                        <!--
                          Active and Checked: "ring ring-offset-1"
                          Not Active and Checked: "ring-2"
                        -->
                        <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-900">
                          <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-2-label">
                          <span id="color-choice-2-label" class="sr-only"> Black </span>
                          <span aria-hidden="true" class="h-8 w-8 bg-gray-900 border border-black border-opacity-10 rounded-full"></span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
      
                  <button 
                  @click="$router.push('/course/enroll/'+ this.pageId)" 
                  type="button" 
                  class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Enroll</button>
                  <button 
                  @click="$router.push('/course/play/'+ this.pageId + '/ep1')" 
                  type="button" 
                  class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Play</button>
                  <button 
                  @click="$router.push('/course/exam/'+ this.pageId)" 
                  type="button" 
                  class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Exam</button>
                
              </form>
              </div>
        
              <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">

                <div>
                  <h3 class="sr-only">Description</h3>
        
                  <div class="space-y-6" v-html="item.principles"></div>
                </div>
        
              </div>
      
            </div>
      
            <section aria-labelledby="related-products-heading" class="bg-white">
              <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      
                <h2 id="related-products-heading text-center" class="text-xl font-bold tracking-tight text-gray-900">เนื้อหาของหลักสูตร</h2>
        
                <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8">
      
                  <div class="overflow-hidden bg-white shadow sm:rounded-md">
                      <ul role="list" class="divide-y divide-gray-200">

                        <QueryWrapper :url="'https://asia-southeast2-elearning-6871c.cloudfunctions.net/players/filters?courseId=' + item.ref" :loadingText="loadingText" :error="error" :data="data" :mode="'list'" :pageName="item.name" v-if="loading">

                          <template v-slot:default="{ data }">
                              
                              <li v-for="item in data" :key="item.id">
                                <a href="#" class="block hover:bg-gray-50">
                                  <div class="flex items-center px-4 py-4 sm:px-6">
                                    <div class="flex min-w-0 flex-1 items-center">
                                      <div class="flex-shrink-0">
                                        <img class="h-12 w-12" :src="item.cover" alt="">
                                      </div>
                                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                          <p class="truncate text-sm font-bold text-indigo-600">{{item.name}}</p>
                                          <p class="mt-2 flex items-center text-sm text-gray-500">
                                            <!-- Heroicon name: mini/envelope -->
                                            <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                            </svg>
                                            <span class="truncate">{{item.slug}}</span>
                                          </p>
                                        </div>
                                        <div class="hidden md:block">
                                          <div>
                                            <p class="text-sm text-gray-900">
                                              {{item.duration}} นาที
                                            </p>
                                            <p class="mt-2 flex items-center text-sm text-gray-500">
                                              <!-- Heroicon name: mini/check-circle -->
                                              <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                              </svg>
                                              Completed phone screening
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <!-- Heroicon name: mini/chevron-right -->
                                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                              </li>
                    
                          </template>
                        </QueryWrapper>

                      </ul>
                    </div>
                </div>
              </div>
            </section>
      
          
            <section aria-labelledby="related-products-heading" class="bg-white">
              <div class="mx-auto max-w-2xl py-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 id="related-products-heading" class="text-xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
        
                <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  <div class="group relative">
                    <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                      <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                      <div>
                        <h3 class="text-sm text-gray-700">
                          <a href="#">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            Basic Tee
                          </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">Black</p>
                      </div>
                      <p class="text-sm font-medium text-gray-900">$35</p>
                    </div>
                  </div>
        
                  <!-- More products... -->
                </div>
              </div>
            </section>
      
            <div class="bg-white">
              <h2 class="sr-only">Our perks</h2>
              <div class="mx-auto max-w-7xl divide-y divide-gray-200 lg:flex lg:justify-center lg:divide-y-0 lg:divide-x lg:py-8">
                <div class="py-8 lg:w-1/3 lg:flex-none lg:py-0">
                  <div class="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
                    <!-- Heroicon name: outline/calendar -->
                    <svg class="h-8 w-8 flex-shrink-0 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <div class="ml-4 flex flex-auto flex-col-reverse">
                      <h3 class="font-medium text-gray-900">10-year all-inclusive warranty</h3>
                      <p class="text-sm text-gray-500">We’ll replace it with a new one</p>
                    </div>
                  </div>
                </div>
            
                <div class="py-8 lg:w-1/3 lg:flex-none lg:py-0">
                  <div class="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
                    <!-- Heroicon name: outline/arrow-path -->
                    <svg class="h-8 w-8 flex-shrink-0 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3" />
                    </svg>
                    <div class="ml-4 flex flex-auto flex-col-reverse">
                      <h3 class="font-medium text-gray-900">Free shipping on returns</h3>
                      <p class="text-sm text-gray-500">Send it back for free</p>
                    </div>
                  </div>
                </div>
            
                <div class="py-8 lg:w-1/3 lg:flex-none lg:py-0">
                  <div class="mx-auto flex max-w-xs items-center px-4 lg:max-w-none lg:px-8">
                    <!-- Heroicon name: outline/truck -->
                    <svg class="h-8 w-8 flex-shrink-0 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <div class="ml-4 flex flex-auto flex-col-reverse">
                      <h3 class="font-medium text-gray-900">Free, contactless delivery</h3>
                      <p class="text-sm text-gray-500">The shipping is on us</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          </div>

      </template>
    </QueryWrapper>
      
</div>

        

</template>

<script>
import QueryWrapper from '../../../utils/QueryWrapper.vue'
export default {
  components: {
    QueryWrapper,
  },
  watch: {
    $route(to) {
      this.loading = false
      this.url = "https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/" + to.params.id
      this.$nextTick(() => {
        this.loading = true
      })
    }
  },
  data() {
    return {
      pageId: this.$route.params.id,
      url: "https://asia-southeast2-elearning-6871c.cloudfunctions.net/courses/" + this.$route.params.id,
      loadingText: 'Loading data...',
      error: false,
      data: null,
      loading: true,
      loaded:false
    }
  },
}
</script>