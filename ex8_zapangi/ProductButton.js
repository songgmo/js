function ProductButton(idx)
{
	if(typeof idx != "number" || idx < 0)
	{
		alert("check ProductButton Class args");
		throw new Error(0,"check ProductButton Class args");
	}
	var THIS = this;
	var __idx,__price,__product;
	__idx = idx;
	__price = productsData[__idx].price;
	__product = productsData[__idx].name;

	this.getPrice = function()
	{
		return __price;
	}
	this.getProduct = function()
	{
		return __product;
	}
	this.setSoldOut = function()
	{
		//console.log(this.button);
		this.button.style.cursor = null;
		deleteEvent(this.button,"click",function(){buttonClick(idx)});
		THIS.button.style.opacity = "0.5";
		text.innerHTML = "[매진]"
	}
	this.setClickF = function(func)	
	{
		addEvent(this.button,"click",function(){func(idx)});
	}

	this.button = document.createElement("div");
	var img = document.createElement("img");
	var br = document.createElement("br");
	var text = document.createElement("div");
	text.style.width = "50px";
	text.innerHTML = "["+__price + "원]"
	img.src = "img/"+productsData[__idx].src;
	img.alt = productsData[__idx].name;
	img.style.width = "50px";
	
	this.button.setAttribute("class", "money");	
	this.button.appendChild(img);
	this.button.appendChild(br);
	this.button.appendChild(text);
	this.button.style.position = "absolute";
	this.button.style.cursor = "pointer";
}