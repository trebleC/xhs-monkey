<script setup>
import viteLogoUrl from 'assets/vite.svg';
import vueLogoUrl from 'assets/vue.svg';
import {useNote} from '@/hooks/useNote'
import { useFetch } from '../hooks/useFetch';

const clickItem = (data) => {
  // console.log('>>>>>>', data);
}

onMounted(()=>{

})
const {autoSaveNotes,stopAutoSave} = useNote({prefix:''})

const showVite = ()=>{
  console.log('showVite',);
  autoSaveNotes()
}

const showVue = ()=>{
  stopAutoSave()
}

</script>

<template>
  <div>
 
      <img :src="viteLogoUrl" class="logo" alt="Vite logo" @click="showVite"  />
    

      <img :src="vueLogoUrl" class="logo vue" alt="Vue logo" @click="showVue" />
    

    <!-- <Fab mainBtnColor="#3599DB">
      <FabItem @clickItem="clickItem" :idx="0" title="add" icon="add" />
      <FabItem @clickItem="clickItem" :idx="1" title="https" icon="https" />
      <FabItem @clickItem="clickItem" :idx="2" title="edit" icon="edit" />
    </Fab> -->
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  cursor: pointer;
  display: block;
  z-index: 9099;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
  color: #8c8c8c;
}
</style>
