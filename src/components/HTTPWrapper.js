const axios = require('axios').default;
let baseUrl = 'https://jsonplaceholder.typicode.com';

function getItemsOfList(listId) {
    let url = baseUrl + '/posts';
    axios.get(url)
    .then(console.log)
}

getItemsOfList(1)