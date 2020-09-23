<template>
    <div class="calendar-cell"> 
        <button
            class="h-100 w-100 clickable-cell"
            v-on:click="selectDate"
            v-bind:class="{selected: isSelected}">
            <span>{{displayData}}</span>
        </button>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: "calendar-cell",
    props:{
        displayData: String,
        selectedStartDate: String,
        selectedEndDate: String,
        index: Number,
        month_year: String
    },
    methods:{
        selectDate(){
            this.$emit('select-date', moment(`${this.displayData} ${this.month_year}`));
        }
    },
    data(){
        return{
            isSelected: false
        }
    },
    created: function(){
        if(this.month_year != undefined && this.month_year != null) var currCalendarMonth = this.month_year.split(' ')[0];
        
        if(this.selectedStartDate != null && this.selectedStartDate != undefined){  
            var selectedStartMonth = this.selectedStartDate.split(' ')[1];
            var selectedStartDayNumber = Number(this.selectedStartDate.split(' ')[2]);
        
            if(this.selectedStartDate != null && selectedStartDayNumber == this.displayData && selectedStartMonth == currCalendarMonth){
                this.isSelected = true;
            }else{
                this.isSelected = false;
            }
        }

        if(this.selectedEndDate != null && this.selectedEndDate != undefined){  
            var selectedEndMonth = this.selectedEndDate.split(' ')[1];
            var selectedEndDayNumber = Number(this.selectedEndDate.split(' ')[2]);

            if(this.selectedEndDate != null && selectedEndDayNumber == this.displayData && selectedEndMonth == currCalendarMonth){
                this.isSelected = true;
            }else if(selectedStartDayNumber != this.displayData && selectedEndMonth == currCalendarMonth){
                this.isSelected = false;
            }
        }        
    },
    watch:{
        month_year: function(month_year){
            const currCalendarMonth = month_year.split(' ')[0];
            const selectedStartMonth = this.selectedStartDate.split(' ')[1];
            const selectedStartDayNumber = Number(this.selectedStartDate.split(' ')[2]);

            let selectedEndDayNumber = null;
            if(this.selectedEndDate != null){ 
                selectedEndDayNumber = Number(this.selectedEndDate.split(' ')[2]);
                var selectedEndMonth = this.selectedEndDate.split(' ')[1];
            }

            // console.log(`selectedEndDate ${this.selectedEndDate} selectedEndDayNumber ${selectedEndDayNumber} selectedEndMonth ${selectedEndMonth} currCalendarMonth ${currCalendarMonth}`);

            if(
                (this.selectedStartDate != null && selectedStartDayNumber == this.displayData && selectedStartMonth == currCalendarMonth) ||
                (this.selectedEndDate != null && selectedEndDayNumber == this.displayData && selectedEndMonth == currCalendarMonth)
                ){
                this.isSelected = true;
            }else{
                this.isSelected = false;
            }

        },
        selectedStartDate: function(selectedStartDate){
            const currCalendarMonth = this.month_year.split(' ')[0];
            const selectedMonth = selectedStartDate.split(' ')[1];
            const selectedDayNumber = Number(selectedStartDate.split(' ')[2]);

            // console.log(`selectedStartDate ${selectedStartDate} month_year ${this.month_year}`);

            if(selectedStartDate != null && selectedMonth != currCalendarMonth){
                this.isSelected = false;
                return;
            }
            if(selectedStartDate == null && this.selectedEndDate == null){
                this.isSelected = false;
                return;
            } 
            if(selectedDayNumber == this.displayData && this.selectedEndDate == null)    this.isSelected = true;   // checks if the sent date's day == this day number
            else if(this.selectedEndDate != null) this.isSelected = true;
            else this.isSelected = false;
        },
        selectedEndDate: function(selectedEndDate){
            const currCalendarMonth = this.month_year.split(' ')[0];
            
            let selectedEndDayNumber, selectedStartDayNumber = null;
            
            if(selectedEndDate != null){
                selectedEndDayNumber = Number(selectedEndDate.split(' ')[2]);
                var selectedMonth = selectedEndDate.split(' ')[1];
            }
            if(this.selectedStartDate != null) selectedStartDayNumber= Number(this.selectedStartDate.split(' ')[2])
            
            if(selectedMonth == currCalendarMonth && selectedEndDayNumber == this.displayData){  
                this.isSelected = true;
                this.$emit('omit-calendar');
            }
            else if(selectedStartDayNumber != this.displayData)    this.isSelected = false;
        }
    }
}
</script>

<style scoped>
    .calendar-cell{
        width: 2em;
        height: 2em;
        float: left;
    }

    .clickable-cell{
        background-color: transparent;
        color: #333;
        border-radius: 0;
        padding: 0;
        border: 0em;
        outline: none;
    }

    .clickable-cell:hover{
        background-color: #DDD;
        color: #333;
        border: 0em;
    }

    .selected, .clickable-cell:active{
        background-color: #ADB;
        
    }
</style>