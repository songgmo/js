function SpinBox(textFeild,btnUp,btnDown)
{
	if(!textFeild || !btnUp || !btnDown)
	{
		alert("check SpinBox Class args");
		throw new Error(0,"check SpinBox Class args");
	}
	var THIS = this;
	var startTimer,updateTimer,downBtn;
	var __textFeild,__btnUp,__btnDown,__interval,__max,__min,__currentNum;
	__textFeild = textFeild;
	__btnUp = btnUp;
	__btnDown = btnDown;
	__currentNum = 0;
	__interval = (arguments[3])? arguments[3]:1;
	__max = (arguments[4])? arguments[4]:null;
	__min = (arguments[5])? arguments[5]:null;
	__btnUp.disabled=false;
	__btnDown.disabled=false;

	this.setCurrentNum = function(value)
	{
		__textFeild.value = __currentNum = Number(value);
	}
	this.getCurrentNum = function()
	{
		return Number(__currentNum);
	}
	this.setNumberInterval = function(value)
	{
		__interval = Number(value);
	}
	this.setMaxNumber = function(value)
	{
		__max = Number(value);
	}
	this.setMinNumber = function(value)
	{
		__min = Number(value);
	}
	this.increaseNum = function(e)
	{
		THIS.setCurrentNum(_chkNum(__currentNum+__interval));
	}
	this.decreaseNum = function(e)
	{
		THIS.setCurrentNum(_chkNum(__currentNum-__interval));
	}
	this.changeText= function(e)
	{
		THIS.setCurrentNum(_chkNum(_stringToNum(__textFeild.value)));
	}
	function startButtonDown(e)
	{		
		downBtn = (e.currentTarget)? e.currentTarget:e.srcElement;
		startTimer = setTimeout(autoComputeStart,500);		
	}
	function endButtonDown(e)
	{
		if(startTimer)clearTimeout(startTimer);
		if(updateTimer)clearTimeout(updateTimer);
	}
	function autoComputeStart()
	{		
		if(downBtn ==__btnUp) addEvent(__btnUp,"mouseout",endButtonDown); 
		else addEvent(__btnDown,"mouseout",endButtonDown);
		updateTimer = setInterval(autoCompute,100);	
	}
	function autoCompute()
	{
		if(downBtn ==__btnUp) THIS.setCurrentNum(_chkNum(++__currentNum));
		else THIS.setCurrentNum(_chkNum(--__currentNum));
	}	
	function _chkNum(num)
	{
		if(__max)num = Math.min(__max, num);
		if(__min)num = Math.max(__min, num);
		if(num == __max){__btnUp.disabled=true;__btnDown.disabled=false;endButtonDown()}
		else if(num == __min){__btnUp.disabled=false;__btnDown.disabled=true;endButtonDown()}
		else{ __btnUp.disabled=false;__btnDown.disabled=false;}
		return num;
	}	
	function _stringToNum(str)
	{
		var _reg = /\D/g;
		return Number(str.replace(_reg, ""));
	}

	function addEvent(o, evt, handler) 
	{
		//alert(handler);
		if (window.addEventListener) { //FF
			o.addEventListener(evt, handler, false);
		}
		else if (document.body.attachEvent) { //IE
			o.attachEvent("on"+evt, handler);
		}
		else if (document.getElementById) {
			o['on'+evt] = handler;
		} 
	}
	function deleteEvent(o, evt, handler) 
	{
		if (window.addEventListener) { //FF
			o.removeEventListener(evt, handler, false);
		}
		else if (document.body.attachEvent) { //IE
			o.detachEvent("on"+evt, handler);
		}
		else if (document.getElementById) {
			o['on'+evt] = null;
		} 
	}

		
	addEvent(__textFeild,"change",this.changeText);
	addEvent(__btnUp,"click",this.increaseNum);
	addEvent(__btnUp,"mousedown",startButtonDown);
	addEvent(__btnUp,"mouseup",endButtonDown);
	addEvent(__btnDown,"click",this.decreaseNum);
	addEvent(__btnDown,"mousedown",startButtonDown);
	addEvent(__btnDown,"mouseup",endButtonDown);
}