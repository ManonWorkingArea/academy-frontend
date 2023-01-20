<script>
import {useRoute} from 'vue-router'
import CMS from '../../../components/cms/page/Page.vue';

export default {
  name: 'Home',
  components: {CMS},
  data() {
    return {
      route: useRoute(),
    }
  },
  methods: {},
};
</script>
<template>
<CMS />
</template>