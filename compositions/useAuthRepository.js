import { reactive, useContext } from '@nuxtjs/composition-api'


const initState = {
    provinces: [],
    loginPayload: {
        email: null,
        password: null
    },
    msg: null,
    errors: null

}

export const useAuthRepository = () => {

    const state = reactive(initState)
    var { $api, $auth, $axios, $toast } = useContext();

    const login = async() => {
        let response = $auth.loginWith('local', { data: state.loginPayload }).then(response => {
            $axios.setToken(response.data.user.token, 'Token')
            $toast.success('Successfully authenticated').goAway(500);
        }).catch(err => {
            if (err.response.status == 422) {
                state.errors = err.response.data
                state.msg = null
            } else {
                state.msg = err.response.data.msg
                state.errors = null
            }
            $toast.error('Error while authenticating').goAway(500);
        });
    }
    const logout = async() => {
        const token = $auth.strategy.token.get();
        let response = $auth.logout({ token: token }).then(response => {
            $axios.setToken(false)
            $toast.success('Successfully logout').goAway(500);
        }).catch(err => {
            console.log(err)
            $toast.error('Error while authenticating').goAway(500);
        });
    }

    const getProvince = async() => {
        const response = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json', {})
        const jsonData = await response.json();
        state.provinces = jsonData
    }

    return {
        state,
        login,
        logout,
        getProvince
    }
}