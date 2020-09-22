<template>
    <div class="calendar-body">
        <calendar-cell
            v-for="(day, index) in days"
            :key="index"
            :displayData="day"
            v-on:select-date="selectDate"/>
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
            
        }
    },
    props:{
        days: Array,
        date: String
    },
    methods:{
        selectDate(selectedDayNumber){
            let selectedDate = moment(`${selectedDayNumber} ${this.date}`);
            // let selectedDate = selectedDayNumber + ' ' + this.date;
            this.$emit('select-date', selectedDate);
        }
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