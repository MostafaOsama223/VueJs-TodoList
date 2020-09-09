<template>
    <div class="TodoList">
    <TodoItem 
        v-for="item in items"
        v-bind:key="item.itemId"
        v-bind:itemHeader="item.itemHeader"
        v-bind:itemId="item.itemId"
        v-bind:itemLabel="item.itemLabel"
        v-bind:itemPriority="item.itemPriority"
        v-bind:completed="item.completed"
        v-on:remove="removeItem"
    />
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
                { itemHeader: 'Do smth0', itemId: '0', itemPriority: {btnType: 'info', btnText: 'Low'}, itemDescription:'No description for this item.', itemLabel:'#ff4b5c', completed:false},
                { itemHeader: 'Do smth1', itemId: '1', itemPriority: {btnType: 'warning', btnText: 'Medium'}, itemDescription:'No description for this item.', itemLabel:'#ff8e6e', completed:false},
                { itemHeader: 'Do smth2', itemId: '2', itemPriority: {btnType: 'danger', btnText: 'High'}, itemDescription:'No description for this item.', itemLabel:'#515070', completed:false},
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
            console.log(newItem)
        }
    }
}
</script>

<style scoped>

</style>