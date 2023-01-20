<script>
import Authen from '@/components/reusable/authen.vue';
import Loader from '@/components/shared/template/Loader.vue';
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
    data() {
      return {
        listItems: [],
        hosting:'',
        loading_sources: true,
      }
    },
    components: {
      Authen,
      Loader
    },
    methods: {
      async getData() {
        try 
        {
          console.log("Auth : Course List : ",this.$store.state.auth);

          this.hosting = window.location.protocol + "//" + window.location.host
          console.log("Hosting",this.hosting);

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

  <Authen/>
  <section class="py-20 bg-gray-100 overflow-x-hidden">
    <div class="container mx-auto px-4">
      <h2 class="mb-16 md:mb-24 text-4xl md:text-5xl font-bold font-heading">Latest Blog</h2>
      <div class="flex mb-20">
        <div class="flex-shrink-0 w-full">
          <div class="flex flex-wrap -mx-3">
            <div class="w-full lg:w-1/2 px-3 mb-20">
              <div class="relative">
                <a class="absolute z-10 top-0 mt-80 right-0 m-5 px-8 py-2 bg-white rounded-md font-bold font-heading text-gray-400 hover:text-orange-300 uppercase tracking-widest" href="#">Summer</a>
                <a class="relative block group" href="#">
                  <div class="relative h-96">
                    <img class="w-full h-96 object-cover object-top" src="https://shuffle.dev/yofte-assets/images/placeholder-surfboard-stands.png" alt="">
                  </div>
                  <div class="relative mt-12">
                    <div class="absolute top-0 h-44 px-px bg-blue-300 group-hover:bg-orange-300"></div>
                    <div class="px-12">
                      <h3 class="mb-8 text-3xl md:text-4xl font-bold font-heading">After curabitur eu laoreet libero eget en vel odio ultricies!</h3>
                      <span class="text-lg font-bold font-heading text-blue-300 uppercase">15 MAY 2021</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="w-full lg:w-1/2 px-3 mb-20">
              <div class="relative">
                <a class="absolute z-10 top-0 mt-80 right-0 m-5 px-8 py-2 bg-white rounded-md font-bold font-heading text-gray-400 hover:text-orange-300 uppercase tracking-widest" href="#">Summer</a>
                <a class="relative block group" href="#">
                  <div class="relative h-96">
                    <img class="w-full h-96 object-cover object-top" src="https://shuffle.dev/yofte-assets/images/placeholder-girl.png" alt="">
                  </div>
                  <div class="relative mt-12">
                    <div class="absolute top-0 h-44 px-px bg-blue-300 group-hover:bg-orange-300"></div>
                    <div class="px-12">
                      <h3 class="mb-8 text-3xl md:text-4xl font-bold font-heading">Next year: one ultricies condimentum phare</h3>
                      <span class="text-lg font-bold font-heading text-blue-300 uppercase">14 MAY 2021</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="w-full px-3 flex items-center justify-between">
              <div class="relative mr-4 bg-gray-300 py-px w-full md:w-10/12">
                <div class="absolute top-0 bottom-0 left-0 bg-yellow-600 w-1/4"></div>
              </div>
              <div class="ml-auto md:w-2/12 flex items-center justify-end">
                <a class="mr-5 flex items-center justify-center w-12 h-12 bg-orange-300 hover:bg-orange-400 rounded-md" href="#">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.02344 5.99748L7.14844 10.1225L5.97043 11.3008L0.66742 5.99748L5.97043 0.694179L7.14844 1.87248L3.02344 5.99748Z" fill="white"></path>
                  </svg>
                </a>
                <a class="flex items-center justify-center w-12 h-12 bg-blue-300 hover:bg-blue-400 rounded-md" href="#">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.97656 6.00252L0.851562 1.87752L2.02957 0.699219L7.33258 6.00252L2.02957 11.3058L0.851562 10.1275L4.97656 6.00252Z" fill="white"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:flex flex-shrink-0 ml-6 opacity-40">
          <div class="w-full lg:w-1/2 px-3">
            <div class="relative">
              <a class="absolute z-10 top-0 mt-80 right-0 m-5 px-8 py-2 bg-white rounded-md font-bold font-heading text-gray-400 hover:text-orange-300 uppercase tracking-widest" href="#">Summer</a>
              <a class="relative block group" href="#">
                <div class="relative h-96">
                  <img class="w-full h-96 object-cover object-top" src="https://shuffle.dev/yofte-assets/images/placeholder-surfboard-stands.png" alt="">
                </div>
                <div class="relative mt-12">
                  <div class="absolute top-0 h-44 px-px bg-blue-300 group-hover:bg-orange-300"></div>
                  <div class="px-12">
                    <h3 class="mb-8 text-3xl md:text-4xl font-bold font-heading">After curabitur eu laoreet libero eget en vel odio ultricies!</h3>
                    <span class="text-lg font-bold font-heading text-blue-300 uppercase">15 MAY 2021</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="w-full lg:w-1/2 px-3">
            <div class="relative">
              <a class="absolute z-10 top-0 mt-80 right-0 m-5 px-8 py-2 bg-white rounded-md font-bold font-heading text-gray-400 hover:text-orange-300 uppercase tracking-widest" href="#">Summer</a>
              <a class="relative block group" href="#">
                <div class="relative h-96">
                  <img class="w-full h-96 object-cover object-top" src="https://shuffle.dev/yofte-assets/images/placeholder-girl.png" alt="">
                </div>
                <div class="relative mt-12">
                  <div class="absolute top-0 h-44 px-px bg-blue-300 group-hover:bg-orange-300"></div>
                  <div class="px-12">
                    <h3 class="mb-8 text-3xl md:text-4xl font-bold font-heading">Next year: one ultricies condimentum phare</h3>
                    <span class="text-lg font-bold font-heading text-blue-300 uppercase">14 MAY 2021</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section class="relative py-20 lg:pt-32 bg-blue-800 overflow-x-hidden">
    <img class="absolute top-0 left-0 right-0 h-96 z-10 object-cover w-full" src="https://shuffle.dev/yofte-assets/images/placeholder-banner.png" alt="">
    <img class="hidden md:block absolute top-0 left-0 z-10" src="https://shuffle.dev/yofte-assets/elements/white-line.svg" alt="">
    <img class="absolute top-50 right-0 -mr-12 z-10 transform -rotate-90" src="https://shuffle.dev/yofte-assets/elements/orange-line.svg" alt="">
    <img class="absolute bottom-50 left-0 w-72" src="https://shuffle.dev/yofte-assets/elements/violet-line.svg" alt="">
    <div class="relative z-10 container mx-auto px-4">
      <span class="text-2xl text-white">The most popular</span>
      <h2 class="mt-4 mb-16 text-4xl md:text-5xl text-white font-bold font-heading">Summer Sports</h2>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full lg:w-1/3 px-3 mb-16 lg:mb-0">
          <a class="block mb-10" href="#">
            <div class="relative">
              <span class="absolute bottom-0 left-0 ml-6 mb-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">-15%</span>
              <img class="w-full h-96 object-cover" src="https://shuffle.dev/yofte-assets/images/placeholder-playing-tennis.png" alt="">
            </div>
            <div class="mt-12">
              <div class="mb-2">
                <h3 class="mb-3 text-3xl text-white font-bold font-heading">Tennis racket Sanks 2</h3>
                <p class="text-xl font-bold font-heading text-white">
                  <span>$295.30</span>
                  <span class="text-xs text-gray-500 font-semibold font-heading line-through">$330.90</span>
                </p>
              </div>
            </div>
          </a>
          <a class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200" href="#">Buy Now</a>
        </div>
        <div class="w-full lg:w-1/3 px-3 mb-16 lg:mb-0">
          <a class="block mb-10" href="#">
            <div class="relative">
              <span class="absolute bottom-0 left-0 ml-6 mb-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">-15%</span>
              <img class="w-full h-96 object-cover" src="https://shuffle.dev/yofte-assets/images/product-bottle.png" alt="">
            </div>
            <div class="mt-12">
              <div class="mb-2">
                <h3 class="mb-3 text-3xl text-white font-bold font-heading">LIFE Bottle (2)</h3>
                <p class="text-xl font-bold font-heading text-white">
                  <span>$295.30</span>
                  <span class="text-xs text-gray-500 font-semibold font-heading line-through">$330.90</span>
                </p>
              </div>
            </div>
          </a>
          <a class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200" href="#">Buy Now</a>
        </div>
        <div class="w-full lg:w-1/3 px-3">
          <a class="block mb-10" href="#">
            <div class="relative">
              <span class="absolute bottom-0 left-0 ml-6 mb-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">-15%</span>
              <img class="w-full h-96 object-cover" src="https://shuffle.dev/yofte-assets/images/placeholder-surfing-blue.png" alt="">
            </div>
            <div class="mt-12">
              <div class="mb-2">
                <h3 class="mb-3 text-3xl text-white font-bold font-heading">VONeon Board Surfing</h3>
                <p class="text-xl font-bold font-heading text-white">
                  <span>$295.30</span>
                  <span class="text-xs text-gray-500 font-semibold font-heading line-through">$330.90</span>
                </p>
              </div>
            </div>
          </a>
          <a class="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200" href="#">Buy Now</a>
        </div>
      </div>
    </div>
  </section>

  <section class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="mb-8 text-sm font-bold font-heading text-gray-400">TRUSTED BY BRANDS ALL OVER THE WORLD</h2>
      <div class="flex flex-wrap -mx-4 justify-between">
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-6 lg:mb-0">
          <div class="py-12 px-2 rounded-md shadow-2xl">
            <img class="mx-auto h-6" src="https://shuffle.dev/yofte-assets/brands/exxon.svg" alt="">
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-6 lg:mb-0">
          <div class="py-12 px-2 rounded-md shadow-2xl">
            <img class="mx-auto h-6" src="https://shuffle.dev/yofte-assets/brands/ea-sports.svg" alt="">
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-6 lg:mb-0">
          <div class="py-12 px-2 rounded-md shadow-2xl">
            <img class="mx-auto h-6" src="https://shuffle.dev/yofte-assets/brands/eurosport.svg" alt="">
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0">
          <div class="py-12 px-2 rounded-md shadow-2xl">
            <img class="mx-auto h-6" src="https://shuffle.dev/yofte-assets/brands/nike.svg" alt="">
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0">
          <div class="py-12 px-2 rounded-md shadow-2xl">
            <img class="mx-auto h-6" src="https://shuffle.dev/yofte-assets/brands/aol.svg" alt="">
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-4">
          <div class="py-12 px-2 rounded-md shadow-2xl">
            <img class="mx-auto h-6" src="https://shuffle.dev/yofte-assets/brands/north-face.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <div v-if="!loading_sources" class="text-center"><Loader/></div>
  <!-- <section v-if="loading_sources" class="py-20 bg-gray-100 overflow-x-hidden">
  
    <div class="container mx-auto px-4"  v-for="(item,index) in listItems.root_department" :key="item.department_code">
      <h2 class="mb-16 md:mb-24 text-4xl md:text-5xl font-bold font-heading">{{ index+1 }}.{{ item.department_name }}</h2>
      <div class="flex flex-wrap -mx-3 mb-20">
        <div class="w-full lg:w-1/2 px-3 pt-6" v-for="(lesson,lindex) in item.lesson" :key="lesson.lesson_code">
          <div class="relative">
            <div class="hidden md:block absolute z-10 bottom-0 right-0 mr-12 mb-6 lg:mb-12">
              <span class="inline-block mr-4 font-bold font-heading text-blue-300 uppercase">15 May 2021</span>
              <a class="inline-block px-4 md:px-8 py-2 bg-white rounded-md font-bold font-heading text-gray-400 hover:text-orange-300 uppercase tracking-widest" href="#">Summer</a>
            </div>
            <a class="group flex flex-wrap lg:h-80 items-center bg-gray-50" :href="'/course/' + lesson.lesson_code">
              <div class="w-full lg:w-1/3 h-full">
                <img class="h-64 md:h-full w-full object-cover" src="https://shuffle.dev/yofte-assets/images/placeholder-men.png" alt="">
              </div>
              <div class="relative w-full lg:w-2/3 lg:h-80">
                <div class="hidden lg:block absolute top-0 left-0 ml-12 w-44 py-px bg-blue-300 group-hover:bg-orange-300"></div>
                <div class="lg:hidden absolute bottom-0 left-0 ml-12 w-44 py-px bg-blue-300 group-hover:bg-orange-300"></div>
                <div class="flex h-full pt-12 md:pt-16 pb-12 md:pb-20 px-6 md:px-12">
                  <div class="lg:max-w-xs">
                    <h3 class="text-2xl font-bold font-heading">{{ index+1 }}.{{ lindex+1 }}.{{ lesson.lesson_name }}</h3>
                    <span class="md:hidden mt-6 inline-block font-bold font-heading text-blue-300 uppercase">15 May 2021</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </section> -->
    
</template>