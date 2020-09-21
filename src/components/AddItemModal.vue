<template>
<div class="AddItemModal">
    <b-modal id="AddItemModal" title="Add a new item" @ok="modalOk" @hidden="resetSelectedLabels">
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
                        v-on:click="selectLabel(label)"
                        v-bind:style="`background-color: ${label};`">    
                    </b-button>
                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import {addItem} from '../components/HTTPWrapper'

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
                { value: 'High', text: 'High'},
                { value: 'Medium', text: 'Medium'},
                { value: 'Low', text: 'Low'}
            ],
            labels: [
                '#ff4b5c', '#056674', '#66bfbf',
                '#1d2d50', '#f0a500', '#ff8e6e',
                '#515070', '#ec0101', '#6e6d6d'
            ],
            selectedLabels: []
        }        
    },
    methods: {
        modalOk(){
            console.log('ok')
            let newItem = {
                itemHeader: this.newItemHeader,
                itemPriority: this.newItemPriorirty,
                itemDescription: this.newItemDescription,
                itemLabel: this.selectedLabels,
                itemCompleted: false
            };
            // this.$parent.addItem(newItem)
            addItem(this.$parent.listId, newItem)
            .then(resp => this.$emit('addItem', resp.data))
        },
        selectLabel(selectedLabel){
            if(this.selectedLabels.includes(selectedLabel)){
                let newSelectedLabels = this.selectedLabels.filter(label => label !== selectedLabel);
                this.selectedLabels = newSelectedLabels;
            } 
            else    this.selectedLabels.push(selectedLabel)
            // let newSelectedLabels = this.selectedLabels.filter(label !== this.label)
            console.log(this.selectedLabels)
        },
        resetSelectedLabels(){
            this.selectedLabels = [];
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