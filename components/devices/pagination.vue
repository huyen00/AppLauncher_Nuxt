<template>
  <nav v-if="pagination" class="m-4">
    <ul class="inline-flex -space-x-px">
      <li  >
        <button   :disabled="currentPage === 1? true:false " class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-whit" href="#" @click.prevent="changePage(currentPage - 1)">Previous</button>
      </li>
      <li v-for="page in pagesNumber" :key="page" >
        <button :class="{ 'bg-blue-500 text-white': page == pagination.meta.current_page }" class="px-3 py-2 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="javascript:void(0)" @click.prevent="changePage(page)" >{{ page }}</button>
      </li>
      <li  >
        <button class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled  href="#" @click.prevent="changePage(currentPage + 1)">Next</button>
      </li>
      <span class="text-xs" style="margin-top: 8px">
        &nbsp;
        <i>
          Displaying
          {{
            pagination.data !== undefined ? pagination.data.length : 0
          }}
          of {{ pagination.meta.total }}
          entries.
        </i>
      </span>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Pagination',
  props: {
    pagination: Object,
    currentPage: Number,
    offset: Number
  },
  computed: {
    pagesNumber() {
      if (!this.pagination.meta.to) {
        return [];
      }
      let from = this.pagination.meta.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.meta.last_page) {
        to = this.pagination.meta.last_page;
      }
      let pagesArray = [];
      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    },
  },
  setup(props, {emit}){
    const changePage =(page)=>{
      emit('on-click-page', page)
    }
    return {
      changePage
    }


  }
})
</script>