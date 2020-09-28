<template>
<div
    @update="update()">
    <input 
        class="h-100"
        type="button" 
        @click="showCalendar=true"
        :value="value.start"
        @input="update()"
        style="min-width:20em">

<!-- :value="[displayedDate.start]+' - '+[displayedDate.end]" -->
    <div 
        class="calendar-wrapper"
        v-on-clickaway="omitCalendar"
        v-if="showCalendar"
        @omit-calendar="omitCalendar">
        <table>
            <thead>
                <calendar-head
                    :currCalendarDate="calendarStartDate.toDate()"
                    :left-arrow="true"
                    :right-arrow="false"
                    :day-names="dayNames"
                    :is-previous-days-omitted="isPreviousDaysOmitted"
                    @prev-month="prevMonth"/>
                
                <calendar-head
                    :currCalendarDate="calendarEndDate.toDate()"
                    :left-arrow="false"
                    :right-arrow="true"
                    :day-names="dayNames"
                    :is-previous-days-omitted="isPreviousDaysOmitted"
                    @next-month="nextMonth"/>
                
            </thead>
            <tbody>
                <calendar-body
                    :days="startMonthDaysNumbers"
                    :curr-calendar-date="calendarStartDate.toDate()"
                    :is-previous-days-omitted="isPreviousDaysOmitted"
                    :selected-date="selectedDate"
                    @select-date="selectDate"
                    @omit-calendar="omitCalendar"/>

                <calendar-body
                    :days="endMonthDaysNumbers"
                    :curr-calendar-date="calendarEndDate.toDate()"
                    :selected-date="selectedDate"                    
                    @select-date="selectDate"
                    @omit-calendar="omitCalendar"/>
            </tbody>
        </table>
        <hr style="width:50%; margin: .25em 7.5em .25em 7.5em">
        <calendar-date-display
            :start-date-to-display="displayedDate.start"
            :end-date-to-display="displayedDate.end"/>
    </div>    
</div>

</template>

<script>
import calendarBody from './calendarBody.vue'
import calendarHead from './calendarHead.vue'
import calendarDateDisplay from './calendarDateDisplay.vue'
import moment from 'moment'
import { directive as onClickaway } from "vue-clickaway"

export default {
    name: "calendar-wrapper",
    created:function(){
        this.startMonthDaysNumbers = this.getMonthDays(moment());
        this.endMonthDaysNumbers = this.getMonthDays(moment().add(1,"month"));
    },
    props:{
        isPreviousDaysOmitted: {
            default: false,
            type: Boolean,
            require: false
        },
        displayDateFormat: {
            type: String,
            default: 'ddd, MMM DD',
            require: false
        },
        highlightBetweenDays: {
            type: Boolean,
            default: false,
            require: false,
        },
        value: null

    },
    components:{
        calendarBody,
        calendarHead,
        calendarDateDisplay
    },
    data() {
        return{
            calendarStartDate: moment(),
            calendarEndDate: moment().add(1,"month"),
            startMonthDaysNumbers: [],
            endMonthDaysNumbers: [],
            dayNames: ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            displayedDate: {
                start: 'Start Date',
                end: 'End Date'
            },
            showCalendar: false,
            selectedDate:{
                start: null,
                end: null
            }
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
            this.startMonthDaysNumbers = this.getMonthDays(this.calendarStartDate.add(1,"month"));
            this.endMonthDaysNumbers = this.getMonthDays(this.calendarEndDate.add(1,"month"));
        },
        prevMonth(){
            this.startMonthDaysNumbers = this.getMonthDays(this.calendarStartDate.subtract(1,"month"));
            this.endMonthDaysNumbers = this.getMonthDays(this.calendarEndDate.subtract(1,"month"));
        },
        selectDate(date){
            
            const areDatesNull = !this.selectedDate.start ^ !this.selectedDate.end;

            if(!areDatesNull){
                this.selectedDate.start = date;
                this.selectedDate.end = null;
            }else{
                const isSelectedAfterStartDate = moment(date).diff(moment(this.selectedDate.start)) > 0;
                isSelectedAfterStartDate ? this.selectedDate.end = date : this.selectedDate.start = date;
                
            }

            if(this.selectedDate.start){
                this.displayedDate.start = moment(this.selectedDate.start).format('ddd, MMM DD YYYY');
            } else this.displayed.start = null;

            if(this.selectedDate.end){
                this.displayedDate.end = moment(this.selectedDate.end).format('ddd, MMM DD YYYY');
            } else this.displayedDate.end = null;
            this.$emit('update');
        },
        omitCalendar(){
            if(this.selectedDate.start && this.selectedDate.end){
                this.showCalendar = false;
            }else{
                console.log('Make Sure To Select Both Dates!')
            }
        },
        update(){
            console.log(this.selectedDate);
            this.$emit('update', this.selectedDate)
        }

    },
    directives:{
        onClickaway
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
        min-width: 32em !important;
        /* width: 30 */
        position: absolute;
        z-index: 10;
        top: 2em;
    }
</style>