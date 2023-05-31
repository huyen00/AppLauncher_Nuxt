<template>
  <div class="p-4  mt-16">
    <div class="flex justify-between">
        <div clas="flex">
            <button class="border rounded-lg px-3 py-2 hover:bg-[#012E3F] hover:bg-opacity-60 hover:text-white">          
                <fa :icon="['fas', 'filter']" class=" mr-2 mt-1" />
                Filters
            </button>
            <button class="border rounded-lg px-3 py-2  bg-[#012E3F] bg-opacity-60 text-white hover:bg-white hover:text-black">
                <fa :icon="['fas', 'plus']" class=" mr-2 mt-1" />
                Add APK</button>
                <span class="text-base ">1 row selected</span>
        </div>
        <!-- <div>       -->
            <form>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required>
                </div>
            </form>
        <!-- </div> -->
    </div>
    <div class="shadow-lg w-full px-4 py-3 my-5">
        <span class="mx-2">Tags</span>
        <span class="px-3 py-1 text-white bg-[#F8AC1A] rounded-lg mx-2">library</span>
        <span class="px-3 py-1 text-white bg-[#6B848F] bg-opacity-50 rounded-lg mx-2" >Holomia</span>
    </div>
    <div>
{{ device }}
    </div>
  </div>
</template>

<script>
import mapState from 'vuex'
export default {
name: 'ListGame',
computed: {
    ...mapState("stores", {}),
    device(){
        return this.$store.state.stores.count;
    }
}
}
</script>

