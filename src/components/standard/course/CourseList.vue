<script>

// Component
import Authen from '@/components/reusable/authen.vue';
import Loader from '@/components/shared/template/Loader.vue';
import { ls } from 'vue-lsp'

// Plugin
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    data() {
      return {
        listItems: [],
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

          if(this.$store.state.auth)
          {
            this.loading_sources = false;

            const resAPI3 = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/courses/filter?filter=schoolId&value=" + ls.get("school"), {
              method: 'GET',
              headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
            });

            const RestReturn3   = await resAPI3.json();
            this.listItems      = RestReturn3.data;

            toast.success("โหลดข้อมูลสำเร็จ.....", {timeout:1000});
            this.loading_sources = true;

            console.log("Course",this.listItems);
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
    
    <section class="py-10 bg-gray-100">
      <div class="container mx-auto px-4">

        <div class="flex flex-wrap -mx-4 mb-10 items-center justify-between">
          <div class="w-full lg:w-auto px-3 mb-10 xl:mb-0">
            <h2 class="text-2xl font-bold font-heading">
              <span>หลักสูตรของ ส.อ.ท.</span>
            </h2>
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-24">
          
          <div class="w-full lg:w-4/5 px-3">

            <div v-if="!loading_sources" class="text-center"><Loader/></div>

            <div class="flex flex-wrap -mx-3"  v-if="loading_sources">

              <div class="w-full sm:w-1/2 md:w-1/3 px-3 mb-8" v-for="(item,index) in listItems" :key="item.lesson_code">
                <div class="p-2 bg-white">
                  <a class="block mb-2" :href="'/course/' + item.lesson_code">
                    <img class="mb-5 mx-auto h-56 w-full object-contain" :src="'https://'+item.school_s3_url+'/'+item.school_s3_bucket+'/'+item.lesson_cover" alt="">
                    <h3 class="mb-2 text-md font-bold font-heading truncate">{{ index+1 }}.{{ item.lesson_name }}</h3>
                    <p class="text-lg font-bold font-heading text-blue-500">
                      <span>เวลาเรียน {{ item.duration }}</span>
                      <span class="text-gray-500 float-right"><i data-feather="key"></i> {{ item.class_name }}</span>
                    </p>
                  </a>
                  <a class="ml-auto mr-2 flex items-center justify-center w-full h-12 border bg-indigo-900 text-white" :href="'/course/' + item.lesson_code">
                    ดูรายละเอียด
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div class="hidden lg:block w-1/5 pr-8 pl-8">

            <div class="mb-6 py-10 border-b border-gray-900">
              <h3 class="mb-8 text-2xl font-bold font-heading">หมวดหมู่</h3>
              <ul>

                <li class="mb-4" v-for="(item) in listItems.department" :key="item.department_code">
                  <a class="text-lg" :href="'/category/' + item.department_code" >{{ item.department_name }}</a>
                </li>

              </ul>
            </div>

            <div class="mb-6 py-10 border-b border-gray-900">
              <h3 class="mb-8 text-2xl font-bold font-heading">Price</h3>
              <div>
                <input class="w-full mb-4 outline-none appearance-none bg-gray-200 h-1 rounded cursor-pointer" type="range" min="1" max="100" value="50">
                <div class="flex justify-between">
                  <span class="inline-block text-lg font-bold font-heading text-blue-300">$0</span>
                  <span class="inline-block text-lg font-bold font-heading text-blue-300">$289</span>
                </div>
              </div>
            </div>

            <div class="mb-6 py-10 border-b border-gray-900">
              <h3 class="mb-6 text-2xl font-bold font-heading">Location</h3>
              <label class="flex mb-3 items-center text-lg">
                <input type="checkbox">
                <span class="ml-2">Standard</span>
              </label>
              <label class="flex items-center text-lg">
                <input type="checkbox">
                <span class="ml-2">Next day (yes!)</span>
              </label>
            </div>

          </div>
        </div>
      </div>
    </section>

    
    <!-- <div v-if="loading_sources" class="block sm:flex sm:gap-10 mt-10 sm:mt-20">
        <div class="w-full sm:w-3/4 text-left">
          
            <p v-for="(item,index) in listItems.root_department" :key="item.department_code">
              <a :href="'/category/' + item.department_code" class="font-bold"> {{ index+1 }}.{{ item.department_name }} </a>
                <ul v-for="(lesson,lindex) in item.lesson" :key="lesson.lesson_code"  class="ml-2 mb-3">
                  <li> 
                    <a :href="'/course/' + lesson.lesson_code"> {{ index+1 }}.{{ lindex+1 }}.{{ lesson.lesson_name }} </a>
                  </li>
                </ul>
            </p>

        </div>
    </div> -->
    
</template>