<template>
    <div class="calendar-wrapper">
        <table>
            <thead>
                <calendar-head
                    :month_year="startDate.format('MMMM YYYY')"
                    :leftArrow="true"
                    :rightArrow="false"
                    :dayNames="dayNames"
                    v-on:prev-month="prevMonth"
                    :omitPreviousDays="omitPreviousDays"/>
                
                <calendar-head
                    :month_year="endDate.format('MMMM YYYY')"
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
                    v-on:omit-calendar="omitCalendar"
                    :omitPreviousDays="omitPreviousDays"/>
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
                  <b-button
        v-on:click="omitCalendar">omit calendar</b-button>
    </div>
</template>

<script>
import calendarBody from './calendarBody.vue'
import calendarHead from './calendarHead.vue'
import calendarDateDisplay from './calendarDateDisplay.vue'
import moment from 'moment'

export default {
    name: "calendar-wrapper",
    created:function(){
        this.startMonthDaysNumbers = this.getMonthDays(moment());
        this.endMonthDaysNumbers = this.getMonthDays(moment().add(1,"month"));
        this.startDateToDisplay = this.selectedStartDate.format('ddd, MMM DD');
        this.endDateToDisplay = this.selectedEndDate.format('ddd, MMM DD');
    },
    props:{
        selectedStartDate: moment(),
        selectedEndDate: null,
        omitPreviousDays: {
            default: false,
            type: Boolean
        }
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
            disabledDays:[],
            dayNames: ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            startDateToDisplay: null,
            endDateToDisplay: null,
            selectedStartDateCopy: this.selectedStartDate,
            selectedEndDateCopy: this.selectedEndDate
        }
    },
    methods:{
        getMonthDays(currentDate){
            let startDay = this.startDay(currentDate).day();
            let endDay = this.endDay(currentDate).date();
            let daysNumbers = [];

            while(startDay > 0){
                daysNumbers.push(' ');
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
            
            if(this.selectedStartDateCopy === null && this.selectedEndDateCopy === null) this.selectedStartDateCopy = selectedDate;
            else if(this.selectedStartDateCopy !== null && this.selectedEndDateCopy === null && selectedDate.diff(moment(this.selectedStartDateCopy)) > 0) this.selectedEndDateCopy = selectedDate;
            else if(this.selectedStartDateCopy !== null && this.selectedEndDateCopy === null && selectedDate.diff(moment(this.selectedStartDateCopy)) < 0) this.selectedStartDateCopy = selectedDate;
            else if(this.selectedStartDateCopy !== null && this.selectedEndDateCopy !== null){
                this.selectedStartDateCopy = selectedDate;
                this.selectedEndDateCopy = null;
            }
            else    this.selectedEndDateCopy = selectedDate;
            if(this.selectedStartDateCopy != null) this.startDateToDisplay = this.selectedStartDateCopy.format('ddd, MMM DD');
            else this.startDateToDisplay = null;
            if(this.selectedEndDateCopy != null) this.endDateToDisplay = this.selectedEndDateCopy.format('ddd, MMM DD');
            else this.endDateToDisplay = null;
            console.log(`start ${this.selectedStartDateCopy} end ${this.selectedEndDateCopy}`);
        },
        omitCalendar(){
            this.$emit('omit-calendar', this.selectedStartDateCopy, this.selectedEndDateCopy);
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