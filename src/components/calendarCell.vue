<template>
    <div class="calendar-cell"> 
        <b-button
            class="h-100 w-100 clickable-cell"
            v-on:click="$emit('select-date', displayData)"
            v-bind:class="{selected: isSelected}">
            <span>{{displayData}}</span>
        </b-button>
    </div>
</template>

<script>
export default {
    name: "calendar-cell",
    props:{
        displayData: String,
        startDateToDisplay: String,
        endDateToDisplay: String,
        index: Number
    },
    data(){
        return{
            isSelected: false
        }
    },
    watch:{
        startDateToDisplay: function(val){
            // console.log(Number(val.split(' ')[2]))
            console.log('this.displayData')
            if(val == null && this.endDateToDisplay == null){
                this.isSelected = false;
                return;
            } 
            if(Number(val.split(' ')[2]) == this.displayData && this.endDateToDisplay == null)    this.isSelected = true;
            else if(this.endDateToDisplay != null) this.isSelected = true;
            else this.isSelected = false;
        },
        endDateToDisplay: function(val){
            if(val == null) return;
            if(val.split(' ')[2] == this.displayData)    this.isSelected = true;
        }
    }
}
</script>

<style scoped>
    .calendar-cell{
        background-color: #AAA;
        width: 2em;
        height: 2em;
        /* border: .05em solid #CCC; */
        float: left;
    }

    .clickable-cell{
        background-color: #AAA;
        border-radius: 0;
        padding: 0;
        border: 0em;
    }

    .selected{
        background-color: #666;
    }
</style>