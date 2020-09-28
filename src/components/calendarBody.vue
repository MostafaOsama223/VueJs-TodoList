<template>
    <div class="calendar-body">
        <calendar-cell
            v-for="(day, index) in days"
            :key="index"
            :display-data="day"
            :is-previous-days-omitted="isPreviousDaysOmitted"
            :selected-date="selectedDate"
            :curr-calendar-date="currCalendarDate"
            @select-date="selectDate"
            @omit-calendar="$emit('omit-calendar')"/>
    </div>
</template>

<script>
import calendarCell from './calendarCell.vue'
 
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

    },
    props:{
        days: Array,    //  Array of days numbers [1,2,3,4,..]
        currCalendarDate: Date,   //  Date of current calendar "Oct"
        isPreviousDaysOmitted: Boolean,
        highlightBetweenDays: Boolean,
        selectedDate: {
            type: Object
        }
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