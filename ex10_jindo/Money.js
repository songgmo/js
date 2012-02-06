Money = jindo.$Class(
{
	$init : function (price) 
	{
		if(!price)
		{
			alert("check Money Class args");
			throw new Error(0,"check Money Class args");
		}
		this._price = price;
		this.money = jindo.$("<DIV>");
		this.money.style.position = "absolute";
		this.money.style.cursor = "pointer";

		if(this._price<1000)
		{
			
			var img = jindo.$("<img>");
			img.src = "img/m"+this._price+".png";
			img.alt = this._price+"원";
			
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
			this.money.innerHTML = ""+ this._price + "원"
		}	

		this.myMoney = new Drag(this.money,this);
		this.myMoney.clone = false;
		this.myMoney.readyDrag();
	},
	getPrice : function()
	{
		return this._price;
	},
	setDropFn : function(func)	
	{
		this.myMoney.setDropFn(func);
	}
});