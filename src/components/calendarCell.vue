<template>
    <div class="calendar-cell"> 
        <button
            class="h-100 w-100 clickable-cell"
            :class="{selected: isSelected, disabled: isDisabled, highlighted: isHighlighted }"
            @click="selectDate">
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
        currCalendarDate: Date,
        isPreviousDaysOmitted: Boolean,
        highlightBetweenDays: Boolean,
        selectedDate: {
            type: Object
        },
    },
    methods:{
        selectDate(){
            const selectedDate = `${this.displayData} ${this.currCalendarDate.getMonth() + 1} ${this.currCalendarDate.getFullYear()}`;
            this.$emit('select-date', moment(selectedDate,'DD MM YYYY').toDate());
        },
        highlightCell(){
            const selectedStartDate = moment(this.selectedStartDate);
            const selectedEndDate = moment(this.selectedEndDate);

            // const selectedStartMonthNumber = selectedStartDate.format('MM');
            const selectedEndMonthNumber = selectedEndDate.format('MM');

            const selectedStartDayNumber = selectedStartDate.format('DD');
            const selectedEndDayNumber = selectedEndDate.format('DD');

            const currCalendarMonth = this.currCalendarDate.getUTCMonth();

            console.log("HIGHLIGHT");
            if(selectedEndMonthNumber - selectedEndMonthNumber >= 0){
                if(this.displayData < selectedEndDayNumber && this.displayData < selectedStartDayNumber){
                    this.isHighlighted = true;
                }
            }
            console.log(currCalendarMonth)
            console.log(selectedEndDate)
        }
    },
    data(){
        return{
            isHighlighted: false,
            isStartDateSelected: false,
        }
    },
    computed:{
        start(){
            if(this.selectedDate)
                if(this.selectedDate.start)   return this.selectedDate.start;
            return null;

        },
        end(){
            if(this.selectedDate)
                if(this.selectedDate.end){
                    const currCalendarMonth = this.currCalendarDate.getMonth() + 1;
                    const selectedEndDayNumber = this.selectedDate.end.getDate();
                    const selectedEndMonth = this.selectedDate.end.getMonth() + 1;                
                    if(this.isStartDateSelected){
                        
                        this.isStartDateSelected = false;
                        this.$emit('omit-calendar');
                    }   
                    return this.selectedDate.end;
                }   
            return null;
        },
        isDisabled(){
            if(isNaN(Number(this.displayData))) return true;
            if(this.currCalendarDate){
                const currCalendarMonth = this.currCalendarDate.getMonth() + 1;
                const currCalendarYear = this.currCalendarDate.getFullYear();
                const isCellBeforeCurrDay = Number(this.displayData) < Number(moment().format('DD')) && currCalendarMonth == moment().format('MM') && currCalendarYear == moment().format('YYYY');
                if( (this.isPreviousDaysOmitted &&  isCellBeforeCurrDay) || this.displayData == ' ')  return true;
                else    return false;
            }else   return false;
        },
        isSelected(){
            if(isNaN(Number(this.displayData))) return false;
            if(this.currCalendarDate){
                var currCalendarMonth = this.currCalendarDate.getMonth() + 1;
                var currCalendarYear = this.currCalendarDate.getFullYear();
            }else   return false;
            
            if(this.end){ 
                const selectedEndMonth = this.end.getMonth() + 1;
                const selectedEndYear = this.end.getFullYear();
                const selectedEndDayNumber = this.end.getDate();
                const selectedStartDayNumber = this.start.getDate();
                const isEndEqualCurrDate = selectedEndDayNumber == this.displayData && selectedEndMonth == currCalendarMonth && selectedEndYear == currCalendarYear;
                console.log('ddd');
                if(isEndEqualCurrDate)  return true;
            }

            if(this.start){ 
                const selectedStartMonth = this.start.getMonth() + 1;
                const selectedStartYear = this.start.getFullYear();
                const selectedStartDayNumber = this.start.getDate() ;
                
                const isStartEqualCurrDate = selectedStartDayNumber == this.displayData && selectedStartMonth == currCalendarMonth && selectedStartYear == currCalendarYear;
                const isEndNull = isStartEqualCurrDate && !this.end;

                // console.log(`${selectedStartMonth} ${selectedStartYear} ${selectedStartDayNumber} ${isStartEqualCurrDate} ${currCalendarMonth}`);

                if(isStartEqualCurrDate){
                    this.isStartDateSelected = true;    
                    return true;
                }
                else    return false;

                if( selectedStartMonth != currCalendarMonth )   return false;

                if( !this.start && !this.end )  return false;

            }

            
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
    .disabled{
        color: #999;
        cursor: not-allowed;
        pointer-events: none;
    }
    .highlighted{
        background-color: #EBA;
    }
</style>