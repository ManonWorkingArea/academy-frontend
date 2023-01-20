<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const data = ref(null)

    const fetchData = async () => {
      try {
        const response = await axios.get('https://asia-southeast2-elearning-6871c.cloudfunctions.net/contents/filters?type=email&schoolId=Pc88ayi3EWCDGMp6H4pH')
        data.value = response.data
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(fetchData)

    return {
      data,
    }
  },
}

</script>

<template>
xxxx
</template>