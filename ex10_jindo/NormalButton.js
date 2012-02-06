NormalButton = jindo.$Class(
{
	$init : function (value,x,y,w,h) 
	{
		this.setClickF = function(func)	
		{
			//addEvent(this.button,"click",function(){func(value)});
			jindo.$Fn(function(){func(value)},arguments.callee).attach(this.button,"click");
		}
		this.button = jindo.$("<DIV>");
		this.button.style.position = "absolute";
		this.button.style.top = y + "px";
		this.button.style.left = x + "px";
		this.button.style.width = w + "px";
		this.button.style.height = h + "px";
		this.button.style.borderColor = "#000000";
		this.button.style.borderStyle = "solid";
		this.button.style.borderWidth = "1px";
		this.button.innerHTML = "["+ value + "]"
		this.button.style.cursor = "pointer";
	}
});