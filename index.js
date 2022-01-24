const wordsDiv = document.getElementById("words")
const statusLabel = document.getElementById("statusLabel")
originURL = location.origin

axios({
    method: 'get',
    headers: {},
    url: `${origin}/api/getWords`,
    data: {}
})
.then(response => {
    if (response.status == 200) {
        const keys = Object.keys(response.data)

        keys.forEach((key, index) => {
            const paraElem = document.createElement('p')
            paraElem.innerText = key
            wordsDiv.appendChild(paraElem)
        })
    } else {
        statusLabel.innerHTML = "An error occurred in loading words. Check console for more information."
        console.log("Received non-200 response status code from getWords API")
    }
})
