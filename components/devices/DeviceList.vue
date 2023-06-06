<template>
    <div class="flex flex-col rounded-lg border bg-white ">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full ">
                <div class="overflow-hidden ">
                    <table class="min-w-full text-left text-sm font-light">
                        <thead class="border-b font-medium bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 text-xs">
                                    <input id="check_all" type="checkbox" v-model="selectAll"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                </th>
                                <th @click="onSortChange('id')" scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    ID
                                    <fa v-if="sortBy == 'id'" :icon="sortDirection === 'asc'
                                        ? ['fas', 'arrow-up']
                                        : ['fas', 'arrow-down']
                                        " />
                                </th>
                                <th @click="onSortChange('name')" scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    Name
                                    <fa v-if="sortBy == 'name'" :icon="sortDirection === 'asc'
                                        ? ['fas', 'arrow-up']
                                        : ['fas', 'arrow-down']
                                        " />
                                </th>
                                <th scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    Device Type

                                </th>
                                <th scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    Default App

                                </th>
                                <th scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    User Owner

                                </th>
                                <th scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    Status

                                </th>

                                <th   @click="onSortChange('updated_at')" scope="col" class="px-6 py-4 text-xs text-gray-400">
                                    Time Login
                                    <fa v-if="sortBy == 'updated_at'" :icon="sortDirection === 'asc'
                                        ? ['fas', 'arrow-up']
                                        : ['fas', 'arrow-down']
                                        " />
                                </th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="border-b " v-for="(item, index) in devices" :key="index">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">
                                    <input type="checkbox" v-model="selected" :value="item.id"
                                        class="checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">{{ item.id }}</td>
                                <td class="whitespace-nowrap px-6 py-4 text-sm text-black font-semibold name_device_col">
                                    {{ item.name }}
                                </td>

                                <td class="whitespace-nowrap font-medium px-6 py-4">
                                    <span
                                        class="text-sm inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{
                                            item.brand }}</span>
                                </td>

                                <td class="whitespace-nowrap px-6 py-4 flex justify-center">
                                    <div v-if="item.default_app">
                                        <div class="relative">
                                            <img :src="item.default_app.icon" class="ml-2 mx-auto relative w-12 h-12" alt />
                                            <fa :icon="['fas', 'xmark']" class="absolute "
                                                @click="$emit('on-change-default', item.id)"
                                                style="color: #a91a1a; font-size: 18px;right: -10px;top: -10px;" />
                                        </div>

                                        <p>{{ item.default_app.appName }}</p>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ item.user.name }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4 flex">
                                    <div>
                                        <span v-if="item.active">
                                            <fa :icon="['fas', 'circle']" style="color: #23cd26" class="icon_on mr-1" />On
                                        </span>
                                        <span v-else>
                                            <fa :icon="['fas', 'circle']" style="color: #8a8c8f; margin-bottom:0.1rem"
                                                class="icon_on mr-1" />Off
                                        </span>
                                    </div>
                                    <div class="flex mx-2">

                                    </div>

                                    <div class="mx-2">
                                        <fa :icon="['fas', 'battery-full']" class="ml-2" />
                                        <span class="text-xs ml-1">{{ item.battery * 100 }} %</span>
                                    </div>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    {{ item.last_login
                                        ? $moment(item.last_login.created_at).format('DD/MM/YYYY HH:mm:ss') : null }}
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button class="font-medium text-blue-600  hover:underline mx-2">
                                        <fa :icon="['fas', 'trash']" style="color: #949494" class="mr-2" />
                                    </button>
                                    <button class="font-medium text-blue-600  hover:underline mx-2"
                                        @click="onEditName(item)">
                                        <fa :icon="['fas', 'pen']" style="color: #949494" class="ml-2" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
    props: {
        devices: Array,
        sortBy: String,
        sortDirection: String
    },
    data() {
        return {
            selected: [],
        }
    },
    computed: {
        selectAll: {
            get: function () {
                return this.devices ? this.selected.length == this.devices : false;
            },
            set: function (value) {
                var selected = [];

                if (value) {
                    this.devices.forEach(function (device) {
                        selected.push(device.id);
                    });
                }

                this.selected = selected;
            },
        },
    },
    setup(props, { emit }) {
        const onEditName = (page) => {
            emit('on-edit-name', page)
        }
        const onSortChange=(sort)=>{
            emit('on-sort', sort)
        }
        return {
            onEditName,
            onSortChange
        }


    }

})
</script>

