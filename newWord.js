function makeWord() {
    const wordNameField = document.getElementById('wordNameField')
    const wordDefinitionField = document.getElementById('wordDefinitionField')
    const wordSynField = document.getElementById('wordSynField')
    const wordSenField = document.getElementById('wordSenField')

    if (wordNameField.value == "" || wordDefinitionField == "" || wordSynField.value == "" || wordSenField.value == "") {
        alert("One or more fields is empty. Please try again!")
        return
    }
    axios({
        method: 'post',
        headers: {},
        data: {
            'wordName': wordNameField.value,
            'wordMeaning': wordDefinitionField.value,
            'wordSyn': wordSynField.value,
            'wordSen': wordSenField.value
        },
        url: `${location.origin}/api/newWord`
    })
}