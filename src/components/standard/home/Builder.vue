<!-- <script>
import Loader from '@/components/shared/template/Loader.vue';
import { ref,computed } from 'vue';
import { ls } from 'vue-lsp'
import { useFetchData } from '../../../compositions/fetchData';

export default {
    data() {
      return {
        hosting:'',
        listItems: [],
        itemBlocks: [],
        loading_sources: true,
      }
    },
    components: {
      Loader
    },
    methods: {
      async getData() {
        try { 
            const resBuilderAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school") + "&type=block&position=home", {
                method: 'GET',
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
            });
            const RestBuilderReturn   = await resBuilderAPI.json();
            console.log("RestBuilderReturn",RestBuilderReturn)
            
            if(RestBuilderReturn.success) {
                this.items = [];//add this line to clear items firstly
                RestBuilderReturn.data.forEach(element => {
                    if(element.type==="block")
                    ref(this.itemBlocks.push(element));
                });
                this.loading_sources = true;
                this.itemBlocks.sort(function(a,b){return a.order < b.order ? -1 : 1});
            }
            console.log(this.itemBlocks);
        } catch (error) {
            console.log(error)
        }
      }
    },
    async mounted () {
      try  {
        await this.getData();
      } catch (error) {
        console.log(Error);
      }
    },
    setup() {
    const { fetchData, loading, data, cache, cacheExpiration, cacheRefreshInterval } = useFetchData();

    // set the cache refresh interval to 5 minutes
    cacheRefreshInterval.value = 300000;

    const loadData = async () => {
      if (cacheExpiration.value && cacheExpiration.value > Date.now()) {
        data.value = cache.value;
      } else {
        data.value = await fetchData("https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school") + "&type=block&position=home");
      }
      // do something with the data
    }

    loadData();

    const isLoading = computed(() => loading.value);

    if (isLoading.value) {
      console.log('Data is still loading...');
    } else {
      console.log('Data has finished loading.');
    }

    return {
      data,
      loading: isLoading
    }
  }


};
</script> -->

<template>

  <div v-if="!loading_sources" class="text-center"><Loader/></div>
  <template v-for="(content) in itemBlocks" :key="content.id">
    <div v-if="content.mode==='code'" v-html="content.detail"></div>
  </template>

  <QueryWrapper :url="url" :loadingText="loadingText" :error="error" :data="data" :mode="'list'" :pageName="'หน้าหลัก'" v-if="loading">

    <template v-slot:default="{ data }">

        <div v-for="item in data" :key="item.id">
          <div v-if="item.mode==='code'" v-html="item.detail"></div>
        </div>

    </template>
  </QueryWrapper>

</template>


<script>
import QueryWrapper from '../../../utils/QueryWrapper.vue'
import { ls } from 'vue-lsp'
export default {
  components: {
    QueryWrapper,
  },
  data() {
    return {
      url: "https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school") + "&type=block&position=home",
      loadingText: 'Loading data...',
      error: false,
      data: null,
      loading: true,
      loaded:false
    }
  },
}
</script>