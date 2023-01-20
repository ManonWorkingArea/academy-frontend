import { ref } from 'vue';
import { ls } from 'vue-lsp'

function createTitlePlugin() {
  const title = ref(document.title);

  function setTitle(newTitle) {
    const hostName = ls.get('host').name;
    document.title = `${newTitle} - ${hostName}`;
    title.value = `${newTitle} - ${hostName}`;
  }

  return { title, setTitle };
}

export default createTitlePlugin;
