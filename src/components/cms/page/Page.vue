<!-- <script>
import { ls } from 'vue-lsp'
import {useRoute} 	from 'vue-router'

import QueryWrapper from '../../../interface/element/QueryWrapper'
export default {
    data() {
      return {
        hosting:'',
        listItems: [],
        itemBlocks: [],
        route: useRoute(),
        loading_sources: true,
        pageSlug: '',
        pageId: this.$route.params.id,
        ParentPage: '',
        url:"https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/" + this.$route.params.id,
        isLoader:ls.get("loader")
      }
    },
    components: {
      QueryWrapper
    },
    watch: {
      pageSlug(newValue) {
        console.log("New Data",newValue);
      // Update the page title when the title data property changes
      this.pageSlug = newValue;
    },
    "$route.query": {
        immediate: true,
        handler(n) {
            console.log("page",n);
            //this.getData()
        }
      }
    },
    methods: {
    },
    async mounted () {
        console.log("Page.vue");
        try  {
          //await this.getData();
        }catch (error) {
            console.log(Error);
        }
    },
    setup() {
        
    },
    
};
</script>
 -->

 <template>
  <div>
    <QueryWrapper :url="url" :loadingText="loadingText" :error="error" :data="data" :mode="'single'" :pageName="'หน้าเว็บ'" v-if="loading">

      <template v-slot:default="{ data }">
          
          <div v-for="item in data" :key="item.id">

            <div v-if="item.slug" class="overflow-hidden bg-white py-8 px-4 sm:px-3 lg:px-4 xl:py-16">

              <div class="mx-auto max-w-max lg:max-w-7xl">
                  
                <div class="relative z-10 mb-8 md:mb-2 md:px-6">
                  <div class="max-w-prose text-base lg:max-w-none">
                    <h2 class="font-semibold leading-6 text-indigo-600">{{item.slug}}</h2>
                    <p class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{{item.name}}</p>
                  </div>
                </div>
                <div class="relative">
          
                  <svg class="absolute top-0 right-0 -mt-20 -mr-20 hidden md:block md:[overflow-anchor:none]" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
                    <defs>
                      <pattern id="95e8f2de-6d30-4b7e-8159-f791729db21b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="404" height="384" fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)" />
                  </svg>
                  <svg class="absolute bottom-0 left-0 -mb-20 -ml-20 hidden md:block md:[overflow-anchor:none]" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
                    <defs>
                      <pattern id="7a00fe67-0343-4a3c-8e81-c145097a3ce0" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="404" height="384" fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)" />
                  </svg>
                  <div class="relative md:bg-white md:p-6">
                    <div class="lg:grid lg:grid-cols-1 lg:gap-6">
                      <div class="prose prose-lg prose-indigo text-gray-500 lg:max-w-none" v-html="item.description"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
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
      url: "https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/" + this.$route.params.id,
      loadingText: 'Loading data...',
      error: false,
      data: null,
      loading: true,
      loaded:false
    }
  },
}
</script>