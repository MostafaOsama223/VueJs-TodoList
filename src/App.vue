<template>
  <div class="app">
    <TodoList
      v-for="list in lists"
      v-bind:key="list.listId"
      v-bind:listId="list.listId"
    />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  },
  data() {
    return{
      lists: [
        {listId:0},
        {listId:1}
      ]
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
