<template>
    <div class="calendar-cell"> 
        <b-button
            class="h-100 w-100 clickable-cell"
            v-on:click="$emit('select-date', displayData)">
            <span>{{displayData}}</span>
        </b-button>
    </div>
</template>

<script>
export default {
    name: "calendar-cell",
    props:{
        displayData: String
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
</style>