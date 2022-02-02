console.log("hello")

axios({
    method: 'get',
    headers: {},
    url: `${origin}/api/getWords`,
    data: {}
})
    .then(response => {
        const wordsDiv = document.getElementById("words")
        const statusLabel = document.getElementById("statusLabel")
        const bodyElem = document.getElementById("bodyElem")
        const originURL = location.origin
        console.log(response)
        if (response.status == 200) {
            const keys = Object.keys(response.data)
            wordsDiv.innerHTML = ""
            if (!keys || keys == [] || response.data == {}) {
                statusLabel.innerHTML = "No words stored."
            } else {
                bodyElem.removeChild(statusLabel)
                keys.forEach((key, index) => {
                    const anchorElem = document.createElement("a")
                    anchorElem.href = `${originURL}/word/${key}`

                    const paraElem = document.createElement("p")
                    paraElem.innerHTML = key

                    anchorElem.appendChild(paraElem)
                    wordsDiv.appendChild(anchorElem)
                })
            }
        } else {
            statusLabel.innerHTML = "An error occurred in loading words. Check console for more information."
            console.log("Received non-200 response status code from getWords API")
        }
    })
    .catch(err => {
        console.log(err)
    })
