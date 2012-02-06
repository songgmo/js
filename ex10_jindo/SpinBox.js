SpinBox = jindo.$Class(
{
	$init : function (elTextFeild,elBtnUp,elBtnDown) 
	{
		if(!elTextFeild || !elBtnUp || !elBtnDown)
		{
			alert("check SpinBox Class args");
			throw new Error(0,"check SpinBox Class args");
		}
		this.textFeild = elTextFeild;
		this.btnUp = elBtnUp;
		this.btnDown = elBtnDown;
		this.currentNum = 0;
		this.interval = (arguments[3])? arguments[3]:1;
		this.max = (arguments[4])? arguments[4]:null;
		this.min = (arguments[5])? arguments[5]:null;
		this.btnUp.disabled=false;
		this.btnDown.disabled=false;
		this.startTimer = 0;
		this.updateTimer = 0;
		this.downBtn = null;

		this.increaseNum = jindo.$Fn(function(oEvent)
		{
			//oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
			this.setCurrentNum(this.chkNum(this.currentNum+this.interval));
		}, this);
		this.decreaseNum = jindo.$Fn(function(oEvent)
		{
			//oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
			this.setCurrentNum(this.chkNum(this.currentNum-this.interval));
		}, this);
		this.changeText = jindo.$Fn(function(oEvent)
		{
			//oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
			this.setCurrentNum(this.chkNum(this.stringToNum(this.textFeild.value)));
		}, this);
		this.startButtonDown = jindo.$Fn(function(oEvent)
		{		
			//oEvent.stop(jindo.$Event.CANCEL_DEFAULT);
			this.downBtn = jindo.$Event(oEvent).element;			
			this.startTimer = setTimeout(this.autoComputeStart.bind(),500);		
		}, this);
		this.endButtonDown = jindo.$Fn(function(oEvent)
		{
			//oEvent.stop(jindo.$Event.CANCEL_DEFAULT);					
			this.stopCompute();
		}, this);
		this.autoComputeStart = jindo.$Fn(function()
		{	
			if(this.downBtn == this.btnUp) this.endButtonDown.attach(this.btnUp, "mouseout");
			else this.endButtonDown.attach(this.btnDown, "mouseout");
			this.updateTimer = setInterval(this.autoCompute.bind(),100);	
		},this),
		this.autoCompute =  jindo.$Fn(function()
		{			
			if(this.downBtn == this.btnUp) this.setCurrentNum(this.chkNum(++this.currentNum));
			else this.setCurrentNum(this.chkNum(--this.currentNum));		
		},this),

		this.changeText.attach(this.textFeild, "change");
		this.increaseNum.attach(this.btnUp, "click");
		this.startButtonDown.attach(this.btnUp, "mousedown");
		this.endButtonDown.attach(this.btnUp, "mouseup");
		this.decreaseNum.attach(this.btnDown, "click");
		this.startButtonDown.attach(this.btnDown, "mousedown");
		this.endButtonDown.attach(this.btnDown, "mouseup");
	},
	stopCompute : function()
	{
		if(this.startTimer)clearTimeout(this.startTimer);
		if(this.updateTimer)clearInterval(this.updateTimer);
	},
	setCurrentNum : function(value)
	{
		this.textFeild.value = this.currentNum = Number(value);
	},
	getCurrentNum : function()
	{
		return Number(this.currentNum);
	},
	setNumberInterval : function(value)
	{
		this.interval = Number(value);
	},
	setMaxNumber : function(value)
	{
		this.max = Number(value);
	},
	setMinNumber : function(value)
	{
		this.min = Number(value);
	},
	chkNum : function(num)
	{		
		if(this.max)num = Math.min(this.max, num);
		if(this.min)num = Math.max(this.min, num);		
		if(num == this.max){this.btnUp.disabled=true;this.btnDown.disabled=false;this.stopCompute()}
		else if(num == this.min){this.btnUp.disabled=false;this.btnDown.disabled=true;this.stopCompute()}
		else{ this.btnUp.disabled=false;this.btnDown.disabled=false;}
		return num;
	},	
	stringToNum : function(str)
	{
		var _reg = /\D/g;
		return Number(str.replace(_reg, ""));
	}
});