<template>
    <div class='todoItem card m-2 w-50'>
        <p 
            v-bind:class="{checked:this.completed}"
            class="m-2"> 
            <input 
                type="checkbox" 
                v-on:change="check">
            {{itemHeader}}
            <b-button
                class="m-1 labels"
                type="button"
                v-bind:style="`background-color: ${itemLabel};`">
            </b-button>
            <button
                class="btn"
                type="button"
                v-bind:class= "`btn-${itemPriority.btnType}`">
                {{itemPriority.btnText}}
            </button>
        </p>
        <button
            v-on:click="removeItem"
            class="btn btn-danger m-0 removeItemBtn">
            Remove</button>
    </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props: {
        itemId:String,
        itemHeader:String,
        itemDescription: String,
        itemPriority: Object,
        itemLabel: Array[String],
        completed: Boolean,
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

    .removeItemBtn{
        position: absolute;
        right: .1em;
        top: .05em
    }

    .labels{
        border: none;
        height: 1.2em;
    }
</style>