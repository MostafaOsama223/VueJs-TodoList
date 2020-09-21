import axios from 'axios'

// const serverUrl = '127.0.0.1:8081';

const urlConfig = {
    'lists' : '/l',
    'items' : '/i'
}

const instance = axios.create({
    baseURL: 'http://localhost:8081'
});

export function getAllLists() {
    console.log('1');
    return new Promise ((resolve, reject) => {
        console.log('2');
        instance.request({
            url: urlConfig['lists'],
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
        console.log('3');
    });
}


export function getList(listId){
    return new Promise((resolve, reject) => {
        instance.request({
            url: urlConfig['lists'] + `/${listId}`,
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
}

export function deleteItem(listId, itemId){
    return new Promise((resolve, reject) => {
        instance.request({
            url: urlConfig['lists'] + `/${listId}` + urlConfig['items'] + `/${itemId}`,
            method: 'delete',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    }); 
}

export function addItem(listId, item){
    return new Promise((resolve, reject) => {
        instance.request({
            url: urlConfig['lists'] + `/${listId}` + urlConfig['items'],
            method: 'post',
            data: item,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    }); 
}

export function deleteList(listId){
    return new Promise((resolve, reject) => {
        instance.request({
            url: urlConfig['lists'] + `/${listId}`,
            method: 'delete',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error))
    }); 
}