function Money(price)
{
	if(!price)
	{
		alert("check Money Class args");
		throw new Error(0,"check Money Class args");
	}
	var THIS = this;
	var __price;
	__price = price;

	this.getPrice = function()
	{
		return __price;
	}
	this.setDropFn = function(func)	
	{
		myMoney.setDropFn(func);
		//addEvent(this.button,"click",function(){func(idx)});
	}

	this.money = document.createElement("div");
	this.money.style.position = "absolute";
	this.money.style.cursor = "pointer";

	if(__price<1000)
	{
		
		var img = document.createElement("img");
		img.src = "img/m"+__price+".png";
		img.alt = __price+"원";
		
		this.money.setAttribute("class", "money");	
		this.money.appendChild(img);		
	}
	else
	{
		this.money.style.width = "50px";
		this.money.style.height = "100px";
		this.money.style.backgroundColor = "#FFFFFF";
		this.money.style.borderStyle = "solid";
		this.money.style.borderWidth = "1px";
		this.money.innerHTML = ""+ __price + "원"
	}

	var myMoney = new Drag(this.money,this);
	//myMoney.setDropFn(dropCheck);
	myMoney.readyDrag();
}