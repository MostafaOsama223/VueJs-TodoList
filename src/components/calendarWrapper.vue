<template>
    <div 
    class="calendar-wrapper"
    v-on-clickaway="setEndDate">
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
                    v-on:select-date="selectDate"
                    v-on:omit-calendar="omitCalendar"
                    :omitPreviousDays="omitPreviousDays"/>
                <calendar-body
                    :days="endMonthDaysNumbers"
                    :month_year="endDate.format('MMM YYYY')"
                    v-on:select-date="selectDate"
                    v-on:omit-calendar="omitCalendar"/>
            </tbody>
        </table>
        <hr style="width:50%; margin: .25em 7.5em .25em 7.5em">
        <calendar-date-display/>
    </div>
</template>

<script>
import calendarBody from './calendarBody.vue'
import calendarHead from './calendarHead.vue'
import calendarDateDisplay from './calendarDateDisplay.vue'
import moment from 'moment'
import mixin from "../../mixin";

export default {
    name: "calendar-wrapper",
    mixins:mixin,
    created:function(){
        this.startMonthDaysNumbers = this.getMonthDays(moment());
        this.endMonthDaysNumbers = this.getMonthDays(moment().add(1,"month"));
        try{
            this.startDateToDisplay = this.selectedStartDateCopy.format('ddd, MMM DD YYYY');
            this.endDateToDisplay = this.selectedEndDateCopy.format('ddd, MMM DD YYYY');    
        }catch(error){
            ;
        }

    },
    props:{
        omitPreviousDays: {
            default: false,
            type: Boolean
        },
        displayDateFormat: {
            type: String,
            default: 'ddd, MMM DD'
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
            if(this.selectedStartDateCopy != null){
               this.startDateToDisplay = this.selectedStartDateCopy.format('ddd, MMM DD YYYY');
               this.$store.commit('SET_SELECTED_START_DATE', moment(this.selectedStartDateCopy.format('ddd, MMM DD YYYY'))) 
            } 
            else this.startDateToDisplay = null;
            if(this.selectedEndDateCopy != null){
                this.endDateToDisplay = this.selectedEndDateCopy.format('ddd, MMM DD YYYY');
                this.$store.commit('SET_SELECTED_END_DATE', moment(this.selectedEndDateCopy.format('ddd, MMM DD YYYY')));
                // console.log(this.$store.getters.getSelectedEndDate);
            } 
            else this.endDateToDisplay = null;
            
            
            // console.log(`start ${this.selectedStartDateCopy} end ${this.selectedEndDateCopy}`);
        },
        setEndDate(){
            const endDayDate = moment(this.selectedStartDate).add(3, 'day');
            this.$store.commit('SET_SELECTED_END_DATE', endDayDate);
            this.$emit('omit-calendar');
        },
        omitCalendar(){
            ;
        },
        formatDisplayDate(dateString){
            
        }
    },
    computed:{
        selectedStartDate(){
            return this.$store.getters.getSelectedStartDate;
        },
        selectedEndDate(){
            return this.$store.getters.getSelectedEndDate;
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