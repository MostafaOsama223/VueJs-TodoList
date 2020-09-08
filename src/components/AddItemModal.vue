<template>
<div class="AddItemModal">
    <b-modal id="AddItemModal" title="Add a new item" @ok="modalOk">
        <div class="container">
            <div class="row justify-content-center">
                <input 
                    class="addItemModalElem mb-3" 
                    type="text" 
                    placeholder="Item Header"
                    v-model="newItemHeader">
                <b-form-select 
                    class="addItemModalElem mb-3" 
                    v-model="newItemPriorirty" 
                    :options="priorityOptions"></b-form-select>
                <input 
                    class="addItemModalElem mb-3"
                    type="text" 
                    placeholder="Item Description"
                    v-model="newItemDescription">
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
export default {
    name: "AddItemModal",
    props: {
        // newItemHeader: String,
        // newItemDescription: String
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
            ]
        }
    },
    methods: {
        modalOk(){
            let newItem = {
                itemHeader: this.newItemHeader,
                itemId: '99',
                completed: false
            };

            this.$parent.addItem(newItem)
            console.log(this.newItemHeader)
        }
    }
}
</script>

<style scoped>
    .addItemModalElem{
        text-align: start;
        width: 15em;
    }
</style>