<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
    const axios = require('axios').default;

const serverUrl = 'localhost:8081';

const urlConfig = {
    'lists' : '/l',
    'items' : '/i'
}
  
export default {
  name: 'App',
  components: {
  },
  data() {
    return{
    }
  },
  created: function(){
    getAllLists()
  },
  methods: {
    getAllLists: function() {
        return new Promise ((resolve, reject) => {
            axios.get(serverUrl + urlConfig['lists'])
            .then(response => resolve(response))
            .catch(error => reject(error))
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
