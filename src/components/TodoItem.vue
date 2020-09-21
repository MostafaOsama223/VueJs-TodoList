<template>
    <div 
        class='TodoItem card m-2 w-50'>
        <p 
            v-bind:class="{checked:this.itemCompleted}"
            class="m-2"> 
            <input 
                type="checkbox"
                v-model="this.itemCompleted"
                v-on:change="check"/>
            {{itemHeader}}
            
            <!-- Labels -->
            <b-button   
                class="m-1 labels"
                type="button"
                v-for="label in itemLabels"
                :key="label"
                v-bind:style="`background-color: ${label};`"
                style="cursor:unset;">
            </b-button>

            <!-- Priority -->
            <button
                class="btn p-0"
                type="button"
                v-bind:class= "`priorityBtn-${itemPriority}`"
                style="width: 6em; font-size: 10px; cursor:unset; position:relative; color:#f1f3f8">
                {{itemPriority}}
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
    mounted: function (){
        console.log(this.itemLabel)
    },
    props: {
        itemId:Number,
        itemHeader:String,
        itemDescription: String,
        itemPriority: String,
        itemLabel: Array,
        itemCompleted: Boolean,
    },
    data() {
        return {
            itemLabels : this.itemLabel
        }
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

    .priorityBtn-High{
        background-color: #cd0a0a;
    }

    .priorityBtn-Medium{
        background-color: #ffc93c;
    }

    .priorityBtn-Low{
        background-color: #4e89ae;
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

