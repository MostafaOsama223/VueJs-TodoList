<template>
    <div class="TodoList">
    <TodoItem 
        ref="xxx"
        v-for="item in items"
        v-bind:key="item.itemId"
        v-bind:itemHeader="item.itemHeader"
        v-bind:itemId="item.itemId"
        v-bind:completed="item.completed"
        v-on:remove="removeItem"
    ></TodoItem>
    <b-button v-b-modal.AddItemModal>Add Item</b-button>
    <AddItemModal/>

    </div>
</template>

<script>
import TodoItem from './TodoItem'
import AddItemModal from './AddItemModal'

export default {
    name: 'TodoList',
    components: {
        TodoItem,
        AddItemModal
    },
    props: ['listId'],
    data() {
        return{
            items : [
                { itemHeader: 'Do smth', itemId: '0', completed:false},
                { itemHeader: 'Do smth1', itemId: '1', completed:false},
                { itemHeader: 'Do smth2', itemId: '2', completed:false},
            ]  
        }
    },
    methods: {
        removeItem: function(id){
            this.items = this.items.filter((val) =>  val.itemId !== id);
            console.log(this.items);
        },
        addItem: function(newItem){
            this.items.push(newItem);
        }
    }
}
</script>

<style scoped>

</style>