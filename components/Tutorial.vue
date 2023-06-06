<!-- Please remove this file from your project -->
<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
   
  </div>
</template>

<script>
import { defineComponent, useFetch } from '@nuxtjs/composition-api'
import { useAuthRepository } from '@/compositions';
export default defineComponent({
  name: 'NuxtTutorial',
  
  setup(){
     const { state,login , logout,getProvince} = useAuthRepository();

     const { fetchState } = useFetch(() => fetchData())

     const fetchData = async () => {
   
      await getProvince()
    
    }
      return {
        state,
        login,
        logout,
        fetchState,
        fetchData,
      }
  }
})
</script>
