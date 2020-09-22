<template>
    <div class="calendar-body">
        <calendar-cell
            v-for="(day, index) in days"
            :key="index"
            :displayData="day"
            v-on:select-date="selectDate"
            :startDateToDisplay="bindStartDate ? startDateToDisplay : null"
            :endDateToDisplay="bindEndDate ? endDateToDisplay : null"/>
    </div>
</template>

<script>
import calendarCell from './calendarCell.vue'
import moment from 'moment'
 
export default {
    name: "calendarBody",
    components:{
        calendarCell
    },
    data() {

        return{
            bindStartDate: Boolean,
            bindEndDate: Boolean
            
        }
    },
    props:{
        days: Array,
        date: String,
        startDateToDisplay: String,
        endDateToDisplay: String
    },
    methods:{
        selectDate(selectedDayNumber){
            let selectedDate = moment(`${selectedDayNumber} ${this.date}`);
            // console.log(`${selectedDayNumber} ${this.date}`)
            
            this.$emit('select-date', selectedDate);
        }
    },
    watch:{
        startDateToDisplay: function(v){
            if(v != null)   this.bindStartDate = this.date.substring(0,3) == v.split(' ')[1];
        },
        endDateToDisplay: function(v){
            if(v != null)   this.bindEndDate = this.date.substring(0,3) == v.split(' ')[1];
        },
    }
}
</script>

<style scoped>
    .calendar-body{
        display: inline-block;
        text-align: center;
        background-color: #777;
        padding: .5em;
        width: 15em;
        height: 13em;
    }
</style>