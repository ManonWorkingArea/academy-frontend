<script>
import Loader from '@/components/shared/template/Loader.vue';
import { ls } from 'vue-lsp'
import { ref } from 'vue';

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
            const resAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school"), {
                method: 'GET',
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
            });
            const RestReturn   = await resAPI.json();

            const resPageAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school") + "&type=page", {
                method: 'GET',
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
            });
            const RestPageReturn   = await resPageAPI.json();
            console.log("RestPageReturn",RestPageReturn)

            const resBuilderAPI = await fetch("https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?schoolId=" + ls.get("school") + "&type=block", {
                method: 'GET',
                headers: {'Content-Type': 'application/json','Authorization': 'Bearer '},
            });
            const RestBuilderReturn   = await resBuilderAPI.json();
            console.log("RestBuilderReturn",RestBuilderReturn)
            
            if(RestReturn.success) {
                this.items = [];//add this line to clear items firstly
                RestReturn.data.forEach(element => {
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
  <template v-for="(content) in itemBlocks" :key="content.id">
    <div v-if="content.mode==='code'" v-html="content.detail"></div>
  </template>

</template>