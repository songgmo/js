function Drag(dragObj)
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

		duplicateObj();
		addEvent(document,"mousemove",onMouseMoveHandler);
		addEvent(document,"mouseup",onMouseUpHandler);

		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false; 
	}
	function onMouseMoveHandler(e)
	{		
		e = e||window.event;
		cloneObj.style.top = (e.clientY-mousePosition.y) + "px";
		cloneObj.style.left = (e.clientX-mousePosition.x) + "px";

		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false; 
	}
	function onMouseUpHandler(e)
	{
		deleteEvent(document,"mousemove",onMouseMoveHandler);
		deleteEvent(document,"mouseup",onMouseUpHandler);		
		var x = parseInt(cloneObj.style.left);
		var y = parseInt(cloneObj.style.top);
		removeObj();
		if(dropFunction)dropFunction(x,y);
		
		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false; 
	}
	function duplicateObj()
	{
		if (!cloneObj) 
		{
			cloneObj = __dragObj.cloneNode(true);
			cloneObj.setAttribute("id", "cloneObj");	
			document.body.appendChild(cloneObj);
			cloneObj.style.position = "absolute";
			cloneObj.style.top = startPosition.top + "px";
			cloneObj.style.left = startPosition.left  + "px";
		}
	}	
	function removeObj()
	{
		if (cloneObj) 
		{
			document.body.removeChild(cloneObj);
			cloneObj = null;
		}
	}

	function addEvent(o, evt, handler) 
	{
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
}