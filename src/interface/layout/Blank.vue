<script>

import { ls } from 'vue-lsp'
import axios from 'axios'
import { reactive, toRefs, onMounted } from 'vue'

export default {
	name: 'Default',
	components: {
	},
	data() {return {}},
	watch: {},
	computed: {},
	methods: {
	},
	updated() {},
	async mounted () {
      try {
        console.log("Default.vue");
      } catch (error) {
        console.log(Error);
      }
    },
	setup() {

    function setFavicon(path) {
      document.querySelector('link[rel="shortcut icon"]').setAttribute('href', path)
    }

    onMounted(() => {
      setFavicon('https://vue-project.sgp1.digitaloceanspaces.com/color-logopng.png')
    })

    const state = reactive({
      loading: true,
    })

    const beforeMount = async () => {
      const hostname = window.location.hostname
      const port = window.location.port
      let fullHostname = hostname
      if (port) {
        fullHostname += `:${port}`
      }

      console.log("fullHostname",fullHostname);
      if (ls.get('host')) {
        state.loading = false
      } else {
        try {
          const response = await axios.get(`https://global-config.sgp1.digitaloceanspaces.com/${fullHostname}.json`)
          ls.set('host', response.data)
          ls.set('school', response.data.sid)
          state.loading = false
        } catch (error) {
          console.error(error)
        }
      }
    }

    beforeMount()
    return {
      ...toRefs(state),
    }
  },
}
</script>

<template v-if="!loading">
<router-view/>
</template>