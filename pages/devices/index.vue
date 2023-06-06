<template>
  <div>

    <LoadingDevice v-if="fetchState.pending" />
    <template v-if="!fetchState.pending && !fetchState.error">
      <!-- <DevicesSearch v-model="message" /> -->

      <div class="flex justify-between">
        <div class="form_search w-96 mb-4">
          <form>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="search"  v-model="term" @keyup="searchDevice"
                class="block w-full py-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search" required />
            </div>
          </form>
        </div>
      </div>

      <div id="popup-modal" v-if="showModal" tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-2xl md:h-auto mx-auto top-1/4">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="p-4 flex">
              <div class="w-2/5 text-left">
                <h2 class="text-lg font-semibold">{{ device.name }}</h2>
                <p class="text-sm mt-2">SERIAL NUMBER</p>
                <span class="text-xs font-bold">{{ device.device_id }}</span>
              </div>
              <div class="w-3/5 text-left ml-3">
                <p class="text-gray-500">Update Device Name</p>
                <input type="text" v-model="device.name" :class="errors && errors.name ? 'border-red-500' : ''" ref="name"
                  class="block w-full p-2 mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " />
                <div v-if="errors && errors.name" class="text-red-500">
                  {{ errors.name[0] }}
                </div>
              </div>
            </div>
            <div class="p-4 text-right">
              <button data-modal-hide="popup-modal" type="button"
                class="text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10    "
                @click="closeModel()">
                Cancel
              </button>
              <button data-modal-hide="popup-modal" type="button"
                class="ml-2 text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                @click="update()">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeviceList :devices="devices" @on-edit-name="editName" @on-change-default="changeDefaultApp" :sortBy="sortBy"
        :sortDirection="sortDirection" @on-sort="sortByValue" />

      <DevicePagination :pagination="pagination" :currentPage="currentPage" :offset="offset"
        @on-click-page="changePage" />
    </template>
  </div>
</template>

<script>
import { defineComponent, toRef, ref, toRefs, useFetch, reactive } from '@nuxtjs/composition-api'
import { useDevice } from '@/compositions';
import DeviceList from '@/components/devices/DeviceList';
import DevicePagination from '@/components/devices/pagination';
import LoadingDevice from '@/components/devices/LoadingDevice';

export default defineComponent({
  data() {
    return {
      message: null
    }
  },
  components: {
    DeviceList,
    DevicePagination,
    LoadingDevice
  },
  setup() {
    const { state: data, fetchDevices, changePageNumber, updateName, onShowModal, onCloseModal, changeDefaultApp, sortByValue, search } = useDevice();

    const { fetchState } = useFetch(() => getDevives())

    const getDevives = async () => {

      await fetchDevices()

    }
    const changePage = (pageNumber) => {
      changePageNumber(pageNumber)
    }
    const editName = (item) => {
      onShowModal()
      Object.assign(data.device, item)
    }
    const closeModel = () => {
      onCloseModal()
    }
    const update = () => {

      updateName(data.device)
    }
    const searchDevice = () => {

      search(data.term)
    }


    return {
      showModal: toRef(data, 'showModal'),
      fetchState,
      term: toRef(data, 'term'),
      sortBy: toRef(data, 'sortBy'),
      sortDirection: toRef(data, 'sortDirection'),
      device: toRef(data, 'device'),
      errors: toRef(data, 'errors'),
      offset: toRef(data, 'offset'),
      currentPage: toRef(data, 'currentPage'),
      pagination: toRef(data, 'pagination'),
      devices: toRef(data, 'devices'),
      getDevives,
      changePage,
      editName,
      closeModel,
      update,
      searchDevice,
      search,
      sortByValue,
      onShowModal,
      onCloseModal,
      changeDefaultApp
    }
  }
})
</script>