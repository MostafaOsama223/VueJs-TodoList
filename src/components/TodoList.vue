<template>
    <div class="p-2 m-3 d-flex flex-column justify-content-center">
    <TodoItem 
        class="ml-4"
        v-for="item in items"
        :key="item.itemId"
        :itemHeader="item.itemHeader"
        :itemId="item.itemId"
        :itemLabel="item.itemLabel"
        :itemPriority="item.itemPriority"
        :completed="item.completed"
        v-on:remove="removeItem"
    />
    <b-button 
        v-b-modal.AddItemModal
        class="w-25 ml-4 mt-1">
    +Item</b-button>
    <AddItemModal/>

    </div>
</template>

<script>
import TodoItem from './TodoItem'
import AddItemModal from './AddItemModal'

export default {
    name: 'TodoList',
    mounted: function(){
        console.log(this.items)
    },
    components: {
        TodoItem,
        AddItemModal
    },
    props: ['listId'],
    data() {
        return{
            items : []  
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
        },
        log: function(){
            console.log('x')
        }
    }
}
</script>

<style scoped>

</style>