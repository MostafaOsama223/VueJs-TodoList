<template>
    <div class="calendar-wrapper">
        <table>
            <thead>
                <calendar-head
                    :monthName="startDate.format('MMMM YYYY')"
                    :leftArrow="true"
                    :rightArrow="false"
                    :dayNames="dayNames"
                    v-on:prev-month="prevMonth"/>
                
                <calendar-head
                    :monthName="endDate.format('MMMM YYYY')"
                    :leftArrow="false"
                    :rightArrow="true"
                    :dayNames="dayNames"
                    v-on:next-month="nextMonth"/>
                
            </thead>
            <tbody>
                <calendar-body
                    :days="startMonthDaysNumbers"
                    :date="startDate.format('MMMM YYYY')"
                    v-on:select-date="selectDate"/>
                <calendar-body
                    :days="endMonthDaysNumbers"
                    :date="endDate.format('MMMM YYYY')"
                    v-on:select-date="selectDate"/>
            </tbody>
        </table>
        <calendar-date-display
            :selectedStartDate="selectedStartDate"
            :selectedEndDate="selectedEndDate"/>
    </div>
</template>

<script>
import calendarBody from './calendarBody.vue'
import calendarHead from './calendarHead.vue'
import calendarDateDisplay from './calendarDateDisplay.vue'

import moment from 'moment'

export default {
    name: "calendar-wrapper",
    mounted:function(){
        this.startMonthDaysNumbers = this.getMonthDays(moment());
        this.endMonthDaysNumbers = this.getMonthDays(moment().add(1,"month"));
    },
    components:{
        calendarBody,
        calendarHead,
        calendarDateDisplay
    },
    data() {
        return{
            startDate: moment(),
            endDate: moment().add(1,"month"),
            startMonthDaysNumbers: [],
            endMonthDaysNumbers: [],
            dayNames: ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            selectedStartDate: null,
            selectedEndDate: null
        }
    },
    methods:{
        getMonthDays(currentDate){
            let startDay = this.startDay(currentDate).day();
            let endDay = this.endDay(currentDate).date();
            let daysNumbers = [];

            while(startDay > 0){
                daysNumbers.push('');
                startDay --;
            }
            while(startDay != endDay){
                startDay++;
                daysNumbers.push(String(startDay));
            }
            return daysNumbers;
        },
        startDay(currentDate){
            return currentDate.startOf("month");
        },
        endDay(currentDate){
            return currentDate.endOf("month");
        },
        nextMonth(){
            this.startMonthDaysNumbers = this.getMonthDays(this.startDate.add(1,"month"));
            this.endMonthDaysNumbers = this.getMonthDays(this.endDate.add(1,"month"));
        },
        prevMonth(){
            this.startMonthDaysNumbers = this.getMonthDays(this.startDate.subtract(1,"month"));
            this.endMonthDaysNumbers = this.getMonthDays(this.endDate.subtract(1,"month"));
        },
        selectDate(selectedDate){
            selectedDate = moment(selectedDate, 'D-MMMM-YYYY');
            console.log(selectedDate.diff(this.selectedStartDate, 'days'))
            if(this.selectedStartDate === null && this.selectedEndDate === null) this.selectedStartDate = selectedDate.format('ddd, MMM D');
            else if(this.selectedStartDate !== null && this.selectedEndDate === null && selectedDate.diff(moment(this.selectedStartDate)) > 0) this.selectedEndDate = selectedDate.format('ddd, MMM D');
            else if(this.selectedStartDate !== null && this.selectedEndDate === null && selectedDate.diff(moment(this.selectedStartDate)) < 0) this.selectedStartDate = selectedDate.format('ddd, MMM D');
            else if(this.selectedStartDate !== null && this.selectedEndDate !== null){
                this.selectedStartDate = selectedDate.format('ddd, MMM D');
                this.selectedEndDate = null;
            }
            else    this.selectedEndDate = selectedDate.format('ddd, MMM D');
            
            console.log(`start ${this.selectedStartDate} end ${this.selectedEndDate}`);

        }
    }
}
</script>

<style scoped>
    .calendar-wrapper{
        display: inline-block;
        background-color: #333;
        padding: 1em;
        /* width: 32em; */
        /* height: 18em; */
    }

    
</style>