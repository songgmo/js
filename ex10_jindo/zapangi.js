var oringalData = [
	{name:"아메리카노",price:900,src:"c1.jpg",stock:3},
	{name:"카페모카",price:1000,src:"c2.jpg",stock:3},
	{name:"카푸치노",price:1000,src:"c3.jpg",stock:3},
	{name:"플랫화이트",price:900,src:"c4.jpg",stock:3},
	{name:"카페라떼",price:1000,src:"c5.jpg",stock:3},
	{name:"콘파냐",price:1200,src:"c6.jpg",stock:3},
	{name:"마키아또",price:1100,src:"c7.jpg",stock:3},
	{name:"에스프레소",price:700,src:"c8.jpg",stock:3}
	];

window.onload = _init;

var nInputMoney,nMyMoney,num1000,oProductsData,oInputMoney;
var eZapangi,eWallet,eRefundBtn, eMoneyInput, eCurrentMoney, eProductOut;
nInputMoney = 0;
nMyMoney = 10000;
num1000 = 0;
oInputMoney= [];

function _init()
{
    eZapangi = jindo.$("zapangi");
	eWallet = new Box("지갑",10,840,350,140);
	document.body.appendChild(eWallet);

	eRefundBtn = new NormalButton("반환",250,290,50,30);
	eRefundBtn.setClickF(refund);
	eZapangi.appendChild(eRefundBtn.button);

	eMoneyInput = new Box("투입구",250,660,60,80);
	document.body.appendChild(new Box("",270,676,5,50));
	document.body.appendChild(new Box("",255,730,50,5));
	document.body.appendChild(eMoneyInput);

	eCurrentMoney = new Box("현재금액:0원",60,190,150,20);
	eZapangi.appendChild(eCurrentMoney);

	eProductOut = new Box("",30,230,180,100);
	eZapangi.appendChild(eProductOut);

	oProductsData = randomSortArray(oringalData);
	setProductsNum();
	setButton();
	setMyMoneys();	
}
function setButton()
{	
	for(var i = 0 ; i < oProductsData.length ; i++)
	{
		var btn = new ProductButton(i);
		eZapangi.appendChild(btn.button);
		btn.setClickF(buttonClick);
		btn.button.style.left = 30 +((i%4)*80) +"px";
		btn.button.style.top = 30 +(Math.floor(i/4)*75) +"px";
	}	
	writeStatus("현재 투입 금액: 0원");
}
function setMyMoneys()
{
	var moneyType = {'m1000':7,'m500':4,'m100':8,'m50':4};
	makeMoney(moneyType);
	writeStatus("현재 가진 금액: "+nMyMoney+"원");
}
function makeMoney(moneyType)
{
	for(var mm in moneyType)
	{
		for(var i = 0 ; i < moneyType[mm] ; i++)
		{
			var myMoney = new Money(mm.slice(1));
			document.body.appendChild(myMoney.money);
			myMoney.setDropFn(moneyDrop);
			myMoney.money.style.left = 50 + Math.ceil(Math.random()*250) +"px";
			if(mm != 'm1000')myMoney.money.style.top = 850 + Math.ceil(Math.random()*50) +"px";
			else myMoney.money.style.top = 860 +"px";
		}
	}
}
function buttonClick(i,obj)
{
	//console.log(obj.getProduct(),obj.getPrice(),obj.getStock());
	if(nInputMoney - obj.getPrice() < 0)
	{
		alert("잔액이 부족합니다.");
		return;
	}
	if(obj.getStock() > 0)
	{
		nInputMoney -= obj.getPrice();
		obj.sellStock();
		//console.log(obj.getStock());
		writeStatus("<span class='sale'>"+obj.getProduct() + "선택,"+obj.getPrice()+"원 차감</span>");

		if(num1000 ==2 && nInputMoney < 2000) num1000 = 1;
		if(nInputMoney < 1000) num1000 = 0;
	}
}
function refund()
{
	if(nInputMoney == 0) 
	{
		alert("투입금액이 없습니다.");
		return;
	}
	var tmpN = nInputMoney;
	var moneyType = {};
	moneyType.m50 = (tmpN%100)/50;
	tmpN -= moneyType.m50 * 50;
	moneyType.m100 = (tmpN%500)/100;
	tmpN -= moneyType.m100 * 100;
	moneyType.m500 = (tmpN%1000)/500;
	tmpN -= moneyType.m500 * 500
	moneyType.m1000 = tmpN/1000;
	//console.log(moneyType);
	makeMoney(moneyType);
	writeStatus("반환된 금액: "+nInputMoney+"원");
	nMyMoney += nInputMoney;
	nInputMoney = 0;
	writeStatus("현재 가진 금액: "+nMyMoney+"원");
	num1000 = 0;
	
}
function moneyDrop(x,y,obj)
{
	var tx = parseInt(eMoneyInput.style.left);
	var ty = parseInt(eMoneyInput.style.top);
	var tw = tx + parseInt(eMoneyInput.style.width);
	var th = ty + parseInt(eMoneyInput.style.height);

	var wx = parseInt(eWallet.style.left);
	var wy = parseInt(eWallet.style.top);
	var ww = wx + parseInt(eWallet.style.width);
	var wh = wy + parseInt(eWallet.style.height);

	if(x >= tx && x <= tw && y >= ty && y <= th)
	{
		obj.money.style.left = 50 + Math.ceil(Math.random()*250) +"px";
		if(obj.getPrice() != 1000)obj.money.style.top = 850 + Math.ceil(Math.random()*50) +"px";
		else obj.money.style.top = 860 +"px";
		if(3000 < nInputMoney + Number(obj.getPrice()))
		{
			alert("총 3000원까지만 투입가능합니다.");			
			return;
		}
		if(obj.getPrice() == 1000 && num1000 >= 2)
		{
			alert("지폐는 2장만 넣을 수 있습니다.");	
			return;
		}
		if(obj.getPrice() == 1000 && num1000 < 2) num1000++;
		nInputMoney += Number(obj.getPrice());		
		nMyMoney -= obj.getPrice();	
		obj.money.style.display = "none";

		writeStatus("투입 금액: "+obj.getPrice()+"원");

		document.body.removeChild(obj.money);
		obj = null;
		
	}
	else if(x >= wx && x <= ww && y >= wy && y <= wh)
	{
		//console.log("eWallet");		
	}
	else
	{		
		console.log(obj);		
		document.body.removeChild(obj.money);
		alert("돈을 흘렸습니다. 잘 넣으셔야죠~.\n어머! 없어졌네?");
		nMyMoney -= obj.getPrice();		
		
		writeStatus("<span class='lost'>잃어버린 금액: "+obj.getPrice()+"원</span>");
		writeStatus("현재 가진 금액: "+nMyMoney+"원");

		obj = null;
	}	
}
function setProductsNum()
{
	for(var i = 0 ; i < oProductsData.length ; i++)
	{
		oProductsData[i].stock = Math.ceil(Math.random()*3);
	}
	writeStatus("재고 재설정");
}
function randomArray(n)
{	
	n = n || 10;	
	var randA = [];
	var randN,noMem;
	while(randA.length < n)
	{
		randN = Math.floor(Math.random()*n);
		noMem = true;
		for(var j = 0 ; j < randA.length ; j++)
		{
			if(randN == randA[j]) {noMem = false;break;}
		}
		if(noMem) randA.push(randN);
	}
	return randA;
}
function randomSortArray(a)
{
	var tmpA = randomArray(a.length);
	var returnA = [];
	for(var i = 0; i < a.length ; i++)
	{
		returnA[i] = a[tmpA[i]];
	}
	return returnA;
}
function writeStatus(sValue)
{
	var elStatus = jindo.$("status");
	var textString = elStatus.innerHTML;
	elStatus.innerHTML = textString + sValue + "<br>";

	if(elStatus.scrollHeight > elStatus.offsetHeight)
	{
		elStatus.scrollTop = elStatus.scrollHeight;
	}

	eCurrentMoney.innerHTML = "현재금액:"+nInputMoney+"원";
	eWallet.innerHTML = "지갑 : 잔액:"+nMyMoney+"원";
}



function Box(value,x,y,w,h){
		
	var box = jindo.$("<div>");
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
