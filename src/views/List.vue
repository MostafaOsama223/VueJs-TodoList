<template>
        

    <div class="p-2 m-3 d-flex flex-column justify-content-center">
      <p>This is list {{id}}</p>
    <todo-item
        class="ml-4"
        v-for="item in items"
        v-bind:key="item.itemId"
        v-bind:itemHeader="item.itemHeader"
        v-bind:itemId="item.itemId"
        v-bind:itemLabel="item.itemLabel"
        v-bind:itemPriority="item.itemPriority"
        v-bind:completed="item.completed"
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

    <add-item-modal/>

    </div>
</template>

<script>
import TodoItem from '../components/TodoItem'
import AddItemModal from '../components/AddItemModal'

export default {
  name: 'List',
  components: {
            TodoItem,
        AddItemModal
  },
  props: {
    id: {
      type: String,
      validator: function(value) {
        
        return Number(value) > 0
      }
    },
  },
  data: function(){
     return {
       items : [
                { itemHeader: 'Do smth0', itemId: '0', itemPriority: {btnType: 'info', btnText: 'Low'}, itemDescription:'No description for this item.', itemLabel:'#ff4b5c', completed:false},
                { itemHeader: 'Do smth1', itemId: '1', itemPriority: {btnType: 'warning', btnText: 'Medium'}, itemDescription:'No description for this item.', itemLabel:'#ff8e6e', completed:false},
                { itemHeader: 'Do smth2', itemId: '2', itemPriority: {btnType: 'danger', btnText: 'High'}, itemDescription:'No description for this item.', itemLabel:'#515070', completed:false},
            ]
     }
  },
  created: function() {
          console.log('Send http request to get list data');
      },
  methods: {
        removeItem(id) {
            this.items = this.items.filter((val) =>  val.itemId !== id);
            console.log(this.items);
        },
        addItem: function(newItem){
            this.items.push(newItem);
            console.log(newItem)
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