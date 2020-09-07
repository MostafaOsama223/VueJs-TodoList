<template>
    <div class='todoItem'>
        <p v-bind:class="{checked:this.completed}">
            <input type="checkbox" 
                v-on:change="check"
            >
            {{task}}
            <button v-on:click="removeItem">Remove</button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: {
        itemId:String,task:String,completed: Boolean
    },
    methods: {
        removeItem() {  //  Send Delete Request To Delete Item
            console.log(`list ${this.$parent.listId} item ${this.itemId}`)
            this.$emit('remove', this.itemId);
        },
        check() {   //  Send Put Request To Update Data
            this.completed = !this.completed;
            console.log(`checked ${this.completed}`)
        }
    }
}
</script>

<style scoped>
    .checked{
        text-decoration-line: line-through;
    }
</style>