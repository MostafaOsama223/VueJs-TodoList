<template>
<div class="AddItemModal">
    <b-modal id="AddItemModal" title="Add a new item" @ok="modalOk">
        <div class="container">
            <div class="row justify-content-center">
                <div class='col'>
                    <input 
                        class="addItemModalElem mb-3" 
                        type="text" 
                        placeholder="Item Header"
                        v-model="newItemHeader">
                    <b-form-select 
                        class="addItemModalElem mb-3" 
                        v-model="newItemPriorirty" 
                        :options="priorityOptions">
                    </b-form-select>
                    
                    <input 
                        class="addItemModalElem mb-3"
                        type="text" 
                        placeholder="Item Description"
                        v-model="newItemDescription">
                </div>
                <div class='col'>
                    <h5 class="text-monospace font-weight-bold">Labels</h5>
                    <b-button
                        class="m-1 w-25 labels"
                        type="button"
                        v-for="label in labels"
                        v-bind:key="label"
                        v-on:click="newItemLabel = label"
                        v-bind:style="`background-color: ${label};`">    
                    </b-button>
                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
export default {
    name: "AddItemModal",
    props: {
    },
    data() {
        return {
            newItemHeader: null,
            newItemDescription: null,
            newItemPriorirty: null,
            priorityOptions: [
                { value: null, text: 'Please select a priority'},
                { value: {btnType: 'danger', btnText: 'High'}, text: 'High'},
                { value: {btnType: 'warning', btnText: 'Medium'}, text: 'Medium'},
                { value: {btnType: 'info', btnText: 'Low'}, text: 'Low'}
            ],
            newItemLabel: null,
            labels: [
                '#ff4b5c', '#056674', '#66bfbf',
                '#1d2d50', '#f0a500', '#ff8e6e',
                '#515070', '#ec0101', '#6e6d6d'
            ]
        }        
    },
    methods: {
        modalOk(){
            let newItem = {
                itemHeader: this.newItemHeader,
                itemId: '99',
                itemPriority: this.newItemPriorirty,
                itemDescription: this.newItemDescription,
                itemLabel: this.newItemLabel,
                completed: false
            };

            this.$parent.addItem(newItem)
        }
    }
}
</script>

<style scoped>
    .addItemModalElem{
        text-align: start;
        width: 15em;
    }

    .labels{
        border: none;
        height: 1.2em;
    }
 
</style>