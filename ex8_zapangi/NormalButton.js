function NormalButton(value,x,y,w,h)
{
	var THIS = this;
	this.setClickF = function(func)	
	{
		addEvent(this.button,"click",function(){func(value)});
	}

	this.button = document.createElement("div");
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

function Box(value,x,y,w,h){
		
	var box = document.createElement("div");
	box.innerHTML = value;
	box.style.position = "absolute";
	box.style.top = y + "px";
	box.style.left = x + "px";
	box.style.width = w + "px";
	box.style.height = h + "px";
	box.style.borderColor = "#000000";
	box.style.borderStyle = "solid";
	box.style.borderWidth = "1px";

	return box;
}