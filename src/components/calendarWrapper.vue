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
                    :month_year="startDate.format('MMM YYYY')"
                    :selectedStartDate="startDateToDisplay"
                    :selectedEndDate="endDateToDisplay"
                    v-on:select-date="selectDate"
                    v-on:omit-calendar="$emit('omit-calendar')"/>
                <calendar-body
                    :days="endMonthDaysNumbers"
                    :month_year="endDate.format('MMM YYYY')"
                    :selectedStartDate="startDateToDisplay"
                    :selectedEndDate="endDateToDisplay" 
                    v-on:select-date="selectDate"
                    v-on:omit-calendar="omitCalendar"/>
            </tbody>
        </table>
        <hr style="width:50%; margin: .25em 7.5em .25em 7.5em">
        <calendar-date-display
            :selectedStartDate="startDateToDisplay"
            :selectedEndDate="endDateToDisplay"/>
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
        this.startDateToDisplay = this.selectedStartDate.format('ddd, MMM DD');
        this.endDateToDisplay = this.selectedEndDate.format('ddd, MMM DD');
    },
    props:{
        selectedStartDate: moment(),
        selectedEndDate: moment().add(1,'day')
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
            startDateToDisplay: null,
            endDateToDisplay: null
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
            
            if(this.selectedStartDate === null && this.selectedEndDate === null) this.selectedStartDate = selectedDate;
            else if(this.selectedStartDate !== null && this.selectedEndDate === null && selectedDate.diff(moment(this.selectedStartDate)) > 0) this.selectedEndDate = selectedDate;
            else if(this.selectedStartDate !== null && this.selectedEndDate === null && selectedDate.diff(moment(this.selectedStartDate)) < 0) this.selectedStartDate = selectedDate;
            else if(this.selectedStartDate !== null && this.selectedEndDate !== null){
                this.selectedStartDate = selectedDate;
                this.selectedEndDate = null;
            }
            else    this.selectedEndDate = selectedDate;
            if(this.selectedStartDate != null) this.startDateToDisplay = this.selectedStartDate.format('ddd, MMM DD');
            else this.startDateToDisplay = null;
            if(this.selectedEndDate != null) this.endDateToDisplay = this.selectedEndDate.format('ddd, MMM DD');
            else this.endDateToDisplay = null;
            console.log(`start ${this.selectedStartDate} end ${this.selectedEndDate}`);

        },
        omitCalendar(){

            this.$emit('omit-calendar');
        }
    }
}
</script>

<style scoped>
    .calendar-wrapper{
        display: inline-block;
        background-color: #FFF;
        padding: 1em;
        box-shadow: 0em 0em .5em #CCC;
        min-height: 21 !important;
        min-width: 30;
        position: absolute;
        z-index: 10;
        top: 3.75em;
    }
</style>