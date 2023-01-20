<!-- <script>

// Component
import { ls } from 'vue-lsp'
import { setPageTitle } from '@/utils/title';

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
    },
    methods: {
      async getData() {
        try 
        {
          console.log("Auth : Course List : ",this.$store.state.auth);

          this.loading_sources = false;
          const resAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/courses/filters?schoolId=" + ls.get("school"), {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
          });

          try {
            const finalRes = await resAPI.json();

            this.listItems       = finalRes.data;
            this.loading_sources = true;

            this.getCategoryData()
            this.getTypeData()

            setPageTitle("หลักสูตร");

            console.log("finalRes",finalRes);

            sessionStorage.setItem("courseList", JSON.stringify(finalRes.data));
            toast.success("โหลดข้อมูลสำเร็จ.....", {timeout:1000});
            
          } catch (error) {
            console.log("Error");
          }

        } catch (error) 
        {
          console.log(error)
        }
      },
      async getCategoryData() {
        try {
          //this.loading_sources = false;
          const resAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/catagories/",
          {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
          });
          const RestReturn   = await resAPI.json();
          console.log("Category",RestReturn);
          return RestReturn
        } catch (error) {
          console.log(error)
        }
      },
      async getTypeData() {
        try {
          //this.loading_sources = false;
          const resAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/types/",
          {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
          });
          const RestReturn   = await resAPI.json();
          console.log("Types",RestReturn);
          return RestReturn
        } catch (error) {
          console.log(error)
        }
      },
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
      setPageTitle("หลักสูตร");
    },
};
</script> -->


<template>

<div class="bg-gray-50">
  <div>
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

        <!-- Secondary navigation -->
        
      </nav>
    </header>
  </div>

  <div>

    <main>
      <div class="bg-white">
        <div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Workspace sale</h1>
          <p class="mt-4 max-w-xl text-sm text-gray-700">Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and organization with these sale items before we run out.</p>
        </div>
      </div>

      <!-- Filters -->
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" class="sr-only">Filters</h2>

        <div class="border-b border-gray-200 bg-white pb-4">
          <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div class="relative inline-block text-left">
              <div>
                <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                  Sort
                  <!-- Heroicon name: mini/chevron-down -->
                  <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

            </div>

            <!-- Mobile filter dialog toggle, controls the 'mobileFiltersOpen' state. -->
            <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden">Filters</button>

            <div class="hidden sm:block">
              <div class="flow-root">
                <div class="-mx-4 flex items-center divide-x divide-gray-200">
                  <div class="relative inline-block px-4 text-left">
                    <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" aria-expanded="false">
                      <span>Category</span>

                      <span class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">1</span>
                      <!-- Heroicon name: mini/chevron-down -->
                      <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div class="relative inline-block px-4 text-left">
                    <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" aria-expanded="false">
                      <span>Color</span>
                      <!-- Heroicon name: mini/chevron-down -->
                      <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>

                  </div>

                  <div class="relative inline-block px-4 text-left">
                    <button type="button" class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" aria-expanded="false">
                      <span>Sizes</span>
                      <!-- Heroicon name: mini/chevron-down -->
                      <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Active filters -->
        <div class="bg-gray-100">
          <div class="mx-auto max-w-7xl py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 class="text-sm font-medium text-gray-500">
              Filters
              <span class="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"></div>

            <div class="mt-2 sm:mt-0 sm:ml-4">
              <div class="-m-1 flex flex-wrap items-center">
                <span class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
                  <span>Objects</span>
                  <button type="button" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500">
                    <span class="sr-only">Remove filter for Objects</span>
                    <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product grid -->
      <section aria-labelledby="products-heading" class="mx-auto max-w-2xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">

          <QueryWrapper :url="url" :loadingText="loadingText" :error="error" :data="data" :mode="'list'" :pageName="'หลักสูตร'" v-if="loading">

            <template v-slot:default="{ data }">
                
                <div v-for="item in data" :key="item.id">
                  
                  <a :href="'course/detail/'+item.slug+'/'+item.id" class="group">
                    <div class="w-full overflow-hidden rounded-lg bg-gray-200">
                      <img :src="item.cover" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75 max-h-[200px]">
                    </div>
                    <h3 class="mt-4 text-lg text-gray-700">{{item.name}}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900">$48</p>
                  </a>

                </div>
      
            </template>
          </QueryWrapper>

        </div>
      </section>
    </main>

  </div>
</div>

</template>

<script>
import QueryWrapper from '../../../utils/QueryWrapper.vue'
import { ls } from 'vue-lsp'
export default {
  components: {
    QueryWrapper,
  },
  // watch: {
  //   $route(to) {
  //     this.loading = false
  //     this.url = "https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/" + to.params.id
  //     this.$nextTick(() => {
  //       this.loading = true
  //     })
  //   }
  // },
  data() {
    return {
      pageId: this.$route.params.id,
      url: "https://asia-southeast2-elearning-6871c.cloudfunctions.net/courses/filters?schoolId=" + ls.get("school"),
      loadingText: 'Loading data...',
      error: false,
      data: null,
      loading: true,
      loaded:false
    }
  },
}
</script>