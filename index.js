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
                    paraElem.innerHTML = `${key} - ${response.data[key].meaning}`

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

function deleteWord() {
    const wordToDel = prompt("Enter the word you wish to delete:")
    if (!wordToDel || wordToDel == "") {
        alert("Please enter a word.")
        return
    }

    axios({
        method: 'post',
        url: `${origin}/api/deleteWord`,
        headers: {},
        data: {
            "wordToDelete": wordToDel
        }
    })
    .then(response => {
        if (response.status == 200) {
            if (response.data == `Successfully deleted word ${wordToDel}!`) {
                alert("Deleted the word successfully!")
                location.reload()
            } else {
                alert("There was an error in deleting the word. " + response.data)
            }
        } else {
            alert("There was an error in connecting to the server. Please try again.")
        }
    })
    .catch(err => {
        alert(`There was an error in deleting the word: ${err}`)
    })
}