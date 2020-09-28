<template>
    <div class="calendar-head">
        <b-button 
                :class="{disabled: isDisabled}" 
                id="prevMonthBtn"
                v-if="leftArrow"
                v-on:click="$emit('prev-month')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
        </b-button>

        <p class="monthName">
            {{currCalendarDate.getUTCMonth() + 1}}/{{currCalendarDate.getUTCFullYear()}}   
        </p>
        
        <b-button 
                id="nextMonthBtn" 
                v-if="rightArrow"
                v-on:click="$emit('next-month')">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
        </b-button>

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
import moment from 'moment'
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
        currCalendarDate: {
            type: Date,
            default: null
        },
        leftArrow: Boolean,
        rightArrow: Boolean,
        dayNames: Array,
        isPreviousDaysOmitted: Boolean
    },
    methods:{

    },
    watch:{

    },
    computed:{
        isDisabled(){
            const currCalendarMonth = this.currCalendarDate.getUTCMonth() + 1;
            const currCalendarYear = this.currCalendarDate.getUTCFullYear();
            const currMonth = Number(moment().format('MM'));
            const currYear = Number(moment().format('YYYY'));
            const isCalendarDateEqualCurrDate = currCalendarMonth == currMonth && currCalendarYear == currYear;

            if(isCalendarDateEqualCurrDate && this.isPreviousDaysOmitted)   return true;   
            else   return false; 
        }
    }
}
</script>

<style scoped>
    .calendar-head{
        position: relative;
        display: inline-block;
        text-align: center;
        background-color: #FFF;
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
        padding: 0;
        /* margin: 0em 0em 0em 5em; */
        float: right;
        width: 2em;
        height: 2em;
        background-color:transparent;
        border: none;
    }
    p{
        display: inline-block;
    }
    #prevMonthBtn{
        padding: 0;
        float: left;
        width: 2em;
        height: 2em;
        background-color:transparent;
        border: none;        
        outline: none;
    }

    .disabled{
        display: none;
    }
</style>