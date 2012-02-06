Drag = jindo.$Class(
{
	$init : function (elDragObj,obj) 
	{
		if(!elDragObj)
		{
			alert("check Drag Class args");
			throw new Error(0,"check Drag Class args");
		}
		this.elCloneObj = null;
		this.oMother = obj;
		this.clone = true;
		this.startPosition = {};
		this.mousePosition = {};
		this.dragBounce = {};
		this.dropFunction = null;
		this._dragObj;
		this._dragObj = elDragObj;
		this._dragObj.style.position = "absolute";
		this.dragBounce.top = (arguments[1])? arguments[1]:null;
		this.dragBounce.bottom = (arguments[2])? arguments[2]:null;
		this.dragBounce.left = (arguments[3])? arguments[3]:null;
		this.dragBounce.right = (arguments[4])? arguments[4]:null;

		this.onMouseDownHandler = jindo.$Fn(function(oEvent)
		{		
			var e = jindo.$Event(oEvent);		
			var oPos = e.pos();
			this.startPosition.top = parseInt(this._dragObj.style.top);
			this.startPosition.left = parseInt(this._dragObj.style.left);
			this.mousePosition.y = parseInt(oPos.clientY) - parseInt(this._dragObj.style.top);
			this.mousePosition.x = parseInt(oPos.clientX) - parseInt(this._dragObj.style.left);

			if(this.clone) this.duplicateObj();
			else
			{
				this.elCloneObj = this._dragObj;
				this.elCloneObj.zIndex = 100;
				//console.log(parseInt(this.elCloneObj.zIndex));
				this.elCloneObj.zIndex = parseInt(this.elCloneObj.zIndex) + 10;
			}

			this.onMouseMoveHandler.attach(document, "mousemove");
			this.onMouseUpHandler.attach(document, "mouseup");

			e.stopDefault();
		}, this);
		this.onMouseMoveHandler = jindo.$Fn(function(oEvent)
		{		
			var e = jindo.$Event(oEvent);		
			var oPos = e.pos();

			this.elCloneObj.style.top = (oPos.clientY-this.mousePosition.y) + "px";
			this.elCloneObj.style.left = (oPos.clientX-this.mousePosition.x) + "px";

			e.stopDefault();
		}, this);
		this.onMouseUpHandler = jindo.$Fn(function(oEvent)
		{
			var e = jindo.$Event(oEvent);		
			var oPos = e.pos();

			this.onMouseMoveHandler.detach(document, "mousemove");
			this.onMouseUpHandler.detach(document, "mouseup");

			var x = parseInt(this.elCloneObj.style.left);
			var y = parseInt(this.elCloneObj.style.top);
			this.removeObj();
			if(this.dropFunction)this.dropFunction(x,y,this.oMother);
			
			if(e.preventDefault) e.preventDefault(); 
			else e.returnValue = false; 
		}, this);
	},
	setDragBounce : function(valueObj)
	{
		dragBounce.top = valueObj.top;
		dragBounce.bottom = valueObj.bottom;
		dragBounce.left = valueObj.left;
		dragBounce.right = valueObj.right;
	},
	readyDrag : function()
	{		
		this.onMouseDownHandler.attach(this._dragObj, "mousedown");
	},
	endDrag : function()
	{
		this.onMouseDownHandler.detach(this._dragObj, "mousedown");
	},
	setDropFn : function(func)
	{
		this.dropFunction = func;
	},
	duplicateObj : function()
	{
		if (!this.elCloneObj) 
		{
			this.elCloneObj = this._dragObj.cloneNode(true);
			this.elCloneObj.setAttribute("id", "elCloneObj");	
			document.body.appendChild(this.elCloneObj);
			this.elCloneObj.style.position = "absolute";
			this.elCloneObj.style.top = this.startPosition.top + "px";
			this.elCloneObj.style.left = this.startPosition.left  + "px";
		}
	},
	removeObj : function()
	{
		if (this.elCloneObj) 
		{
			if(this.clone) document.body.removeChild(this.elCloneObj);
			this.elCloneObj = null;
		}
	}
});