const api = ({ $axios, app }, inject) => {
    const api = $axios.create()
    api.onRequest((config) => {
        if (app.$auth.loggedIn) {
            // If the user is logged in we can now get the token, we get something like `Bearer yourTokenJ9F0JFODJ` but we only need the string without the word **Bearer**, So we split the string using the space as a separator and we access the second position of the array **[1]**

            const token = app.$auth.strategy.token.get().split(' ')[1]
            api.setToken(token, 'Bearer') // Here we specify the token and now it works!!
        }
        // console.log(`Making request to ${config.url}`)
    })

    api.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        const errorText = code ?
            `A request failed with status code ${code}` :
            `A network error occurred`

        console.error(errorText)
    })

    api.onResponse((res) => {
        return res
    })

    inject('api', api)
}
export default api