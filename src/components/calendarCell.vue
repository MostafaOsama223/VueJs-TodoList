<template>
    <div class="calendar-cell"> 
        <button
            class="h-100 w-100 clickable-cell"
            v-on:click="selectDate"
            v-bind:class="{selected: isSelected, disabled: isDisabled }">
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
        index: Number,
        month_year: String,
        omitPreviousDays: Boolean
    },
    methods:{
        selectDate(){
            this.$emit('select-date', moment(`${this.displayData} ${this.month_year}`));
        },
        disableCell(){
            if(this.month_year != undefined && this.month_year != null){
                const currCalendarMonth = this.month_year.split(' ')[0];
                const currCalendarYear = this.month_year.split(' ')[1];
                if(
                    ( this.omitPreviousDays && Number(this.displayData) < Number(moment().format('DD')) &&
                    currCalendarMonth == moment().format('MMM') && currCalendarYear == moment().format('YYYY') ) 
                    || this.displayData == ' ' || Number(this.displayData) == NaN)  
                    this.isDisabled = true;
            else    this.isDisabled = false;
            }else   return;
        },
        selectStartCell(){
            if(this.month_year != undefined && this.month_year != null){
                
                var currCalendarMonth = this.month_year.split(' ')[0];
                var currCalendarYear = this.month_year.split(' ')[1];
            }else   this.isSelected = false;

            if(this.selectedStartDate != undefined && this.selectedStartDate != null){ 
                var selectedStartMonth = this.selectedStartDate.split(' ')[1];
                var selectedStartYear = this.selectedStartDate.split(' ')[3];
                var selectedStartDayNumber = Number(this.selectedStartDate.split(' ')[2]);
                // console.log(this.selectedStartDate);
                if(
                    (selectedStartDayNumber == this.displayData   &&
                    selectedStartMonth == currCalendarMonth       &&
                    selectedStartYear == currCalendarYear)        ||
                    (selectedStartDayNumber == this.displayData   &&
                    this.selectedEndDate == null)
                    
                ){
                    this.isSelected = true;
                    // const endDayDate = moment(this.selectedStartDate).add(3, 'day');
                    // this.$store.commit('SET_SELECTED_END_DATE', endDayDate);
                    // console.log(endDayDate);
                }
                else
                    this.isSelected = false;

                if( selectedStartMonth != currCalendarMonth )
                    this.isSelected = false;

            }else   this.isSelected = false;
            if( this.selectedStartDate == null && this.selectedEndDate == null )
                this.isSelected = false;
        },
        selectEndCell(){
            if(this.month_year != undefined && this.month_year != null){
                var currCalendarMonth = this.month_year.split(' ')[0];
                var currCalendarYear = this.month_year.split(' ')[1];
            }else   this.isSelected = false;

            if(this.selectedEndDate != undefined && this.selectedEndDate != null){ 
                var selectedEndMonth = this.selectedEndDate.split(' ')[1];
                var selectedEndYear = this.selectedEndDate.split(' ')[3];
                var selectedEndDayNumber = Number(this.selectedEndDate.split(' ')[2]);
                var selectedStartDayNumber = Number(this.selectedStartDate.split(' ')[2]);

                if(
                    (selectedEndDayNumber == this.displayData   &&
                    selectedEndMonth == currCalendarMonth       &&
                    selectedEndYear == currCalendarYear)        
                ){   
                    this.isSelected = true;
                }
                else if( selectedEndMonth != currCalendarMonth && selectedStartDayNumber != this.displayData)
                    this.isSelected = false;


            }else   this.isSelected = false;
            
        }
    },
    data(){
        return{
            isSelected: false,
            isDisabled: false
        }
    },
    created: function(){
        this.disableCell();
        this.selectStartCell();
        this.selectEndCell();
    },
    watch:{
        month_year: function(month_year){
            this.disableCell();
            this.selectStartCell();
        },
        selectedStartDate: function(selectedStartDate){
            this.disableCell();
            this.selectStartCell();
        },
        selectedEndDate: function(){
            try {
                if(this.selectedEndDate != null && this.selectedEndDate != undefined){
                    var currCalendarMonth = this.month_year.split(' ')[0];
                    var currCalendarYear = this.month_year.split(' ')[1];
                    var selectedEndDayNumber = Number(this.selectedEndDate.split(' ')[2]);
                    var selectedEndMonth = this.selectedEndDate.split(' ')[1];
                }
                this.disableCell();
                if(selectedEndMonth == currCalendarMonth && selectedEndDayNumber == this.displayData){  
                    this.isSelected = true;
                    this.$emit('omit-calendar');
                }    
            } catch (error) {
                ;
            }
            
        }
    }, computed:{
        selectedStartDate(){
            return this.$store.getters.getSelectedStartDate.format('ddd, MMM DD YYYY');
        },
        selectedEndDate(){
            return this.$store.getters.getSelectedEndDate.format('ddd, MMM DD YYYY');
        },
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
    .disabled{
        color: #999;
        cursor: not-allowed;
        pointer-events: none;
    }
</style>