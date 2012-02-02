function Drag(dragObj,obj)
{
	if(!dragObj)
	{
		alert("check Drag Class args");
		throw new Error(0,"check Drag Class args");
	}
	var THIS = this;
	var cloneObj = null;
	var startPosition = {};
	var mousePosition = {};
	var dragBounce = {};
	var dropFunction = null;
	var __dragObj;
	__dragObj = dragObj;
	__dragObj.style.position = "absolute";
	dragBounce.top = (arguments[1])? arguments[1]:null;
	dragBounce.bottom = (arguments[2])? arguments[2]:null;
	dragBounce.left = (arguments[3])? arguments[3]:null;
	dragBounce.right = (arguments[4])? arguments[4]:null;


	this.setDragBounce = function(valueObj)
	{
		dragBounce.top = valueObj.top;
		dragBounce.bottom = valueObj.bottom;
		dragBounce.left = valueObj.left;
		dragBounce.right = valueObj.right;
	}
	this.readyDrag = function()
	{		
		addEvent(__dragObj,"mousedown",onMouseDownHandler);	
	}
	this.endDrag = function()
	{		
		deleteEvent(__dragObj,"mousedown",onMouseDownHandler);	
	}
	this.setDropFn = function(func){
		dropFunction = func;
	}
	function onMouseDownHandler(e)
	{		
		e  = e||window.event;
		startPosition.top = parseInt(__dragObj.style.top);
		startPosition.left = parseInt(__dragObj.style.left);
		mousePosition.y = parseInt(e.clientY) - parseInt(__dragObj.style.top);
		mousePosition.x = parseInt(e.clientX) - parseInt(__dragObj.style.left);

		addEvent(document,"mousemove",onMouseMoveHandler);
		addEvent(document,"mouseup",onMouseUpHandler);
		__dragObj.style.zIndex = __dragObj.style.zIndex+100;
		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false; 
	}
	function onMouseMoveHandler(e)
	{		
		e = e||window.event;
		__dragObj.style.top = (e.clientY-mousePosition.y) + "px";
		__dragObj.style.left = (e.clientX-mousePosition.x) + "px";

		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false; 
	}
	function onMouseUpHandler(e)
	{
		deleteEvent(document,"mousemove",onMouseMoveHandler);
		deleteEvent(document,"mouseup",onMouseUpHandler);		
		var x = parseInt(__dragObj.style.left);
		var y = parseInt(__dragObj.style.top);
		if(dropFunction)dropFunction(obj,x,y);
		
		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false; 
	}
}