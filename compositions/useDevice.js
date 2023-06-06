import { reactive, useContext } from '@nuxtjs/composition-api'
const initState = {
    provinces: [],
    devices: null,
    pagination: {
        meta: { to: 1, from: 1 }
    },
    term: '',
    offset: 4,
    currentPage: 1,
    perPage: 5,
    sortBy: 'id',
    sortDirection: 'asc',
    device: {},
    errors: null,
    showModal: false

}

export const useDevice = () => {
    const state = reactive(initState)

    var {
        $api,
        $axios,
        $auth,
        $toast
    } = useContext();
    const token = $auth.strategy.token.get();

    const fetchDevices = async() => {
        Object.assign(state, initState);
        const response = await $api.$get(`devices?term=${state.term}&page=${state.currentPage}&sortBy=${state.sortBy}&sortDirection=${state.sortDirection}`);
        // console.log(response)
        state.devices = response.data;
        state.pagination = response
    }
    const changePageNumber = (pageNumber) => {
        state.currentPage = pageNumber
        fetchDevices()
    }
    const updateName = async(device) => {
        const response = await $api.$put(`devices/${device.id}/edit-name`, { name: state.device.name }).then(response => {
            const index = state.devices.findIndex(device => device.id === response.id)
            if (index !== -1) {
                state.devices.splice(index, 1, response)
            }
            onCloseModal()
            state.errors = null
            $toast.success('Update Successfully').goAway(2000);
        }).catch(err => {
            state.errors = err.response.data
            $toast.error('Error ,Something when worng').goAway(1500);
        });

    }
    const changeDefaultApp = async(id) => {
        const response = await $api.$get(`devices/${id}/disableDefaultApp`).then(response => {
            const index = state.devices.findIndex(device => device.id === response.id)
            if (index !== -1) {
                state.devices.splice(index, 1, response)
            }
            $toast.success('disableDefaultApp Successfully').goAway(2000);
        }).catch(err => {
            state.errors = err.response.data
            $toast.error('Error ,Something when worng').goAway(1500);
        });
    }
    const onShowModal = () => {
        state.showModal = true
    }
    const onCloseModal = () => {
        state.showModal = false
    }

    const sortByValue = (sort) => {
        if (sort === state.sortBy) {
            state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
        }
        state.sortBy = sort;
        fetchDevices()

    }
    const search = (term) => {
        console.log(term)
        state.term = term
        fetchDevices()
            // fetchDevices
    }

    return {
        state,
        fetchDevices,
        changePageNumber,
        updateName,
        onShowModal,
        onCloseModal,
        changeDefaultApp,
        sortByValue,
        search

    }
}