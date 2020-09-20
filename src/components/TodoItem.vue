<template>
    <div 
        class='TodoItem card m-2 w-50'>
        <p 
            v-bind:class="{checked:this.itemCompleted}"
            class="m-2"> 
            <input 
                type="checkbox"
                v-model="this.itemCompleted"
                v-on:change="check">
            {{itemHeader}}
            <!-- Labels -->
            <b-button   
                class="m-1 labels"
                type="button"
                v-bind:style="`background-color: ${itemLabel};`"
                style="cursor:unset;">
            </b-button>
            <!-- Priority -->
            <button
                class="btn p-0"
                type="button"
                v-bind:class= "`btn-${itemPriority.btnType}`"
                style="width: 6em; font-size: 10px; cursor:unset; position:relative;">
                {{itemPriority.btnText}}
            </button>
        </p>
        <button
            v-on:click="removeItem"
            class="btn btn-danger m-0 h-100 removeItemBtn">
            X</button>
    </div>
</template>

<script>
import {deleteItem} from '../components/HTTPWrapper'

export default {
    name: 'TodoItem',
    props: {
        itemId:Number,
        itemHeader:String,
        itemDescription: String,
        itemPriority: Object,
        itemLabel: Array[String],
        itemCompleted: Boolean,
    },
    methods: {
        removeItem() {  //  Send Delete Request To Delete Item
            console.log(this.$parent);
            deleteItem(this.$parent.id, this.itemId);
            this.$emit('remove', this.itemId);
        },
        check() {   //  Send Put Request To Update Data
            this.itemCompleted = !this.itemCompleted;
            // console.log(`checked ${this.itemCompleted}`)
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
        right: -.2em;
    }

    .labels{
        border: none;
        height: 1.2em;
    }

    .TodoItem{
        position: relative;
        /* left: 2em; */
        /* width: 75%; */
    }

/* rabbit mq
tasks ?
// REST API
// session and cookie
// swagger
// framework spring
// java web
// Java - > Java Web --> Spring >> Spring Boot  */
</style>

