ProductButton = jindo.$Class(
{
	$init : function(idx) 
	{
		if(typeof idx != "number" || idx < 0)
		{
			alert("check ProductButton Class args");
			throw new Error(0,"check ProductButton Class args");
		}
		this._idx = idx;
		this._price = oProductsData[this._idx].price;
		this._stock = oProductsData[this._idx].stock;
		this._product = oProductsData[this._idx].name;

		this.button = jindo.$("<DIV>");
		this.img = jindo.$("<img>");
		this.br = jindo.$("<br>");
		this.text = jindo.$("<div>");
		this.text.style.width = "50px";
		this.text.innerHTML = ""+this._price + "원"
		this.img.src = "img/coffee/"+oProductsData[this._idx].src;
		this.img.alt = oProductsData[this._idx].name;
		this.img.style.width = "50px";
		this.img.style.height = "50px";
		
		this.button.setAttribute("class", "money");	
		this.button.appendChild(this.img);
		this.button.appendChild(this.br);
		this.button.appendChild(this.text);
		this.button.style.position = "absolute";
		this.button.style.cursor = "pointer";
	},
	getStock : function()
	{
		return this._stock;
	},
	sellStock : function()
	{
		oProductsData[this._idx].stock--;
		this._stock = oProductsData[this._idx].stock;
		if(this._stock == 0) this.setSoldOut();
	},
	getPrice : function()
	{
		return this._price;
	},
	getProduct : function()
	{
		return this._product;
	},
	setSoldOut : function()
	{
		//console.log(this.button);
		this.button.style.cursor = null;
		jindo.$Fn(function(){func(this.idx,this)},this).detach(this.button,"click");
		this.button.style.opacity = "0.5";
		this.text.innerHTML = "[품절]"
	},
	setClickF : function(func)	
	{
		jindo.$Fn(function(){func(this.idx,this)},this).attach(this.button,"click");
	}
});