<template>
        

    <div class="p-2 m-3 d-flex flex-column justify-content-center">
      <p>This is list {{$route.params.listId}}</p>
    <todo-item
        class="ml-4"
        v-for="item in items"
        v-bind:key="item.itemId"
        v-bind:itemHeader="item.itemHeader"
        v-bind:itemId="item.itemId"
        v-bind:itemLabel="item.itemLabel"
        v-bind:itemPriority="item.itemPriority"
        v-bind:itemCompleted="item.itemCompleted"
        v-on:remove="removeItem"
    />
    <div class="row">
      
      <b-button 
        v-b-modal.AddItemModal
        class="col-sm-1 w-25 ml-4 mt-1">
      +Item</b-button>
      <router-link
        to='/'
        class="col-sm-1 w-25 ml-4 mt-1">
          <b-button
            variant="info">
          Home</b-button>
      </router-link>      
    </div>

    <add-item-modal
      v-on:addItem="addItem($event)"/>

    </div>
</template>

<script>
import TodoItem from '../components/TodoItem'
import AddItemModal from '../components/AddItemModal'
import {getList} from '../components/HTTPWrapper'

export default {
  name: 'List',
  components: {
            TodoItem,
        AddItemModal
  },
  props: {
    listId: {
      type: String,
      validator: function(value) { 
        return Number(value) > 0
      }
    },
  },
  mounted: function(){
    getList(this.listId)
    .then(resp => this.items = resp.data.items)
    
  },
  data: function(){
     return {
       items : []
     }
  },
  created: function() {
          console.log('Send http request to get list data');
      },
  methods: {
        removeItem(listId) {
            this.items = this.items.filter((val) =>  val.itemId !== listId);
            console.log(this.items);
        },
        addItem: function($event){
            this.items = $event.items;
        },
        backToHome: function(){
            console.log('x')
        }
    }
}
</script>

<style scoped>
#List {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>