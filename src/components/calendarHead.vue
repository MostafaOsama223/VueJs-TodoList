<template>
    <div class="calendar-head">
        <b-button 
                id="prevMonthBtn" 
                v-if="leftArrow"
                v-on:click="$emit('prev-month')">
        &#8592;</b-button>

        <p class="monthName">
            {{monthName}}   
        </p>
        
        <b-button 
                id="nextMonthBtn" 
                v-if="rightArrow"
                v-on:click="$emit('next-month')">
        &#8594;</b-button>

        <div class="dayNamesHeader">
            <calendar-cell
                v-for="dayName in dayNames"
                :key="dayName"
                :displayData="dayName"/>           
        </div>

    </div>
</template>

<script>
import calendarCell from './calendarCell.vue'

export default {
    name: "calendarHead",
    components:{
        calendarCell
    },
    data() {
        return{
            
        }
    },
    props:{
        monthName: String,
        leftArrow: Boolean,
        rightArrow: Boolean,
        dayNames: Array
    },
    methods:{
    }
}
</script>

<style scoped>
    .calendar-head{
        position: relative;
        display: inline-block;
        text-align: center;
        background-color: #999;
    }

    .dayNamesHeader{
        padding: .5em;
        width: 15em;
        height: 3em;
    }

    .monthName{
        margin: 0;
    }

    #nextMonthBtn{
        position: fixed;
        left: 29em;
        display: inline-block;
        padding: 0;
        width: 2em;
        height: 2em;
    }

    p{
        display: inline-block;
    }

    #prevMonthBtn{
        position: fixed;
        left: 1em;
        display: inline-block;
        padding: 0;
        width: 2em;
        height: 2em;
    }
</style>