<template>
    <div class="TodoList">
    <TodoItem 
        ref="xxx"
      v-for="item in items"
      v-bind:key="item.itemId"
      v-bind:task="item.task"
      v-bind:itemId="item.itemId"
      v-bind:completed="item.completed"
      v-on:remove="removeItem"
    ></TodoItem>

    </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
    name: 'TodoList',
    components: {
        TodoItem
    },
    props: ['listId'],
    data() {
        return{
        items : [
            { task: 'Do smth', itemId: '0', completed:false},
            { task: 'Do smth1', itemId: '1', completed:false},
            { task: 'Do smth2', itemId: '2', completed:false},
        ]  
        }
    },
    methods: {
        removeItem: function(id){
            this.items = this.items.filter((val) =>  val.itemId !== id);
            console.log(this.items);
        }
    }
}
</script>

<style scoped>

</style>