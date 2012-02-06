nhn.CalendarComp = jindo.$Class(
{
	$init : function (elCalendarDiv,oDate) 
	{
		if(!elCalendarDiv)
		{
			alert("check CalendarComp Class args");
			throw new Error(0,"check CalendarComp Class args");
		}
		this._stage = elCalendarDiv;
		this._toDay = oDate || new Date();
		this._viewDay = oDate || new Date();		
	},
	makeCalendar : function(oDate)
	{		
		this.deleteCalendar();
		this._viewDay = oDate;
		this._stage.innerHTML = sCalendarBasicUI;
		this.setEventFunc();

		var elYear = jindo.$$.getSingle(".calendarYear");
		var elMonth = jindo.$$.getSingle(".calendarMonth");
		var elWeek = jindo.$$.getSingle(".calendarWeek");

		var tempDate = new Date(oDate.getFullYear(),oDate.getMonth(),1);
		var startDay = tempDate.getDay();
		tempDate.setDate(tempDate.getDate()-1);
		var prevMonthEndDate = tempDate.getDate();
		tempDate = new Date(oDate.getFullYear(),oDate.getMonth()+1,1);
		tempDate.setDate(tempDate.getDate()-1);
		var endDate = tempDate.getDate();

		var i,aDates;
		aDates = [];
		tempDate = new Date(oDate.getFullYear(),oDate.getMonth()-1);
		for( i = 0; i < endDate ; i++){aDates.push(oDate.getFullYear()+"/"+oDate.getMonth()+"/"+(i+1)+"/"+((startDay+i)%7));};
		for( i = 0; i < startDay ; i++){aDates.unshift(tempDate.getFullYear()+"/"+tempDate.getMonth()+"/"+(prevMonthEndDate-i)+"/"+(startDay-i-1))};
		var nextMonthExDate = (aDates.length%7 == 0)? 0:(7-(aDates.length%7));
		tempDate = new Date(oDate.getFullYear(),oDate.getMonth()+1);
		for( i = 0; i < nextMonthExDate ; i++){aDates.push(tempDate.getFullYear()+"/"+tempDate.getMonth()+"/"+(i+1)+"/"+(7-nextMonthExDate+i));}

		var body = jindo.$$.getSingle("#calendarBody");
		var tmpWeek;
		for( i = 0; i < (aDates.length/7)-1 ; i++)
		{
			tmpWeek = elWeek.cloneNode(true);
			body.appendChild(tmpWeek);
		}

		var aDateEl = jindo.$$(".calendarDate");
		var aTmpDayData;
		for(i = 0 ; i < aDateEl.length ; i++)
		{
			aTmpDayData = aDates[i].split("/");

			var elDayDiv = new nhn.CalendarDay(aTmpDayData[0],aTmpDayData[1],aTmpDayData[2],aTmpDayData[3]);
			aDateEl[i].appendChild(elDayDiv._elDiv);
			if(i < startDay)
			{
				aDateEl[i].className = "calendarDate prevM";
				if(i%7==0) aDateEl[i].className = "calendarDate prevM sun";
			}
			else if(i >= startDay + endDate)
			{
				aDateEl[i].className = "calendarDate nextM";
				if(i%7==6) aDateEl[i].className = "calendarDate prevM sat";
			}
			else if(this._toDay.getFullYear() == oDate.getFullYear() 
				&& this._toDay.getMonth() == oDate.getMonth()
				 && this._toDay.getDate() == elDayDiv._date)
			{
				aDateEl[i].className = "calendarDate today";
			}
		}
		elYear.innerHTML = oDate.getFullYear();
		elMonth.innerHTML = Number(oDate.getMonth())+1;
	},	
	setEventFunc : function()
	{
		this.elPrevMonthBtn = jindo.$$.getSingle(".btn_prev_mon");
		this.elNextMonthBtn = jindo.$$.getSingle(".btn_next_mon");
		this.elPrevYearBtn = jindo.$$.getSingle(".btn_prev_year");
		this.elNextYearBtn = jindo.$$.getSingle(".btn_next_year");

		if (this.elPrevMonthBtn) 
		{			
			this.prevMonth = jindo.$Fn(function(oEvent)
			{				
				oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
				this._viewDay.setMonth(this._viewDay.getMonth()-1);
				this.makeCalendar(this._viewDay);
			}, this);
			this.prevMonth.attach(this.elPrevMonthBtn, "click");		
		}
		if (this.elNextMonthBtn) 
		{			
			this.nextMonth = jindo.$Fn(function(oEvent)
			{
				oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
				this._viewDay.setMonth(Number(this._viewDay.getMonth())+1);
				this.makeCalendar(this._viewDay);
			}, this);		
			this.nextMonth.attach(this.elNextMonthBtn, "click");		
		}
		if (this.elPrevYearBtn) 
		{			
			this.prevYear = jindo.$Fn(function(oEvent)
			{
				oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
				this._viewDay.setFullYear(this._viewDay.getFullYear()-1);
				this.makeCalendar(this._viewDay);
			}, this);
			this.prevYear.attach(this.elPrevYearBtn, "click");
		}
		if (this.elNextYearBtn) 
		{
			this.nextYear = jindo.$Fn(function(oEvent)
			{
				oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
				this._viewDay.setFullYear((this._viewDay.getFullYear())+1);
				this.makeCalendar(this._viewDay);
			}, this)
			this.nextYear.attach(this.elNextYearBtn, "click");
		}
	},
	deleteCalendar : function(oDate)
	{
		if (this.elPrevMonthBtn) {
			this.prevMonth.detach(this.elBtnPrevMonth, "click");
		}
		if (this.elNextMonthBtn) {
			this.nextMonth.detach(this.elBtnNextMonth, "click");			
		}
		if (this.elPrevYearBtn) {
			this.prevYear.detach(this.elBtnPrevYear, "click");
		}
		if (this.elNextYearBtn) {
			this.nextYear.detach(this.elBtnNextYear, "click");
		}
		this._stage.innerHTML = '';
	},
	_onActivate : function() 
	{  		
		this.makeCalendar(this._viewDay);		
	},  
	_onDeactivate : function() 
	{		
		this.deleteCalendar();
	}  
}).extend(jindo.UIComponent);


nhn.CalendarDay = jindo.$Class(
{
	$init : function (nYear,nMonth,nDate,nDay) 
	{
		if(!nYear|| !nMonth || !nDate)
		{
			alert("check CalendarDay Class args");
			throw new Error(0,"check CalendarDay Class args");
		}
		this._elDiv = jindo.$("<DIV>");
		this._year = nYear;
		this._month = nMonth;
		this._date = nDate;
		this._day = nDay;		
		this._elDiv.innerHTML = "<a>"+this._date+"</a>";		
		this.aDayName = ["일","월","화","수","목","금","토"];
		this.dateBtn = jindo.$Fn(function(oEvent){
				oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
				alert(this._year+"년 "+(Number(this._month)+1)+"월 "+this._date+"일 "+this.returnDay(this._day)+"요일");
			}, this);
		this.dateBtn.attach(this._elDiv, "click");
	},
	returnDay : function(nDay)
	{
		return this.aDayName[nDay];
	}
})

if(typeof console === 'undefined') {
 	var console = {
		log : function () {}
	};
 }