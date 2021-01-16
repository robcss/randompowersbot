const axios = require("axios")

const getPower = async (url) => {

    const response = await axios.get(url)
    const resUrl = response.request.res.responseUrl
    // const resUrl = undefined
    if (resUrl === undefined || resUrl === url) {
        throw Error(`Sorry :( "${url}" is currently not redirecting to a random power!`)
    }

    return resUrl
    // console.log(response.request._redirectable._redirectCount);
}

module.exports = getPower