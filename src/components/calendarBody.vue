<template>
    <div class="calendar-body">
        <calendar-cell
            v-for="(day, index) in days"
            :key="index"
            :displayData="day"
            v-on:select-date="selectDate"
            :month_year="month_year"
            v-on:omit-calendar="$emit('omit-calendar')"
            :omitPreviousDays="omitPreviousDays"/>
    </div>
</template>

<script>
import calendarCell from './calendarCell.vue'
// import moment from 'moment'
 
export default {
    name: "calendarBody",
    components:{
        calendarCell
    },
    data() {
        return{
            bindStartDate: Boolean,
            bindEndDate: Boolean,
        }
    },
    computed:{
        selectedStartDate(){
            return this.$store.getters.getSelectedStartDate;
        },
        selectedEndDate(){
            return this.$store.getters.getSelectedEndDate;
          }
    },
    props:{
        days: Array,    //  Array of days numbers [1,2,3,4,..]
        month_year: String,   //  Date of current calendar "Oct"
        omitPreviousDays: Boolean
    },
    methods:{
        selectDate(selectedDate){
            this.$emit('select-date', selectedDate);
        }
    },
    watch:{
    }
}
</script>

<style scoped>
    .calendar-body{
        display: inline-block;
        text-align: center;
        background-color:#FFF;
        padding: 0em 0em 0em 0em;
        width: 15em;
        height: 12em;
    }
</style>