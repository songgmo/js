var productsData = [
	{name:"아메리카노",price:700,src:"rx78.png",num:3},
	{name:"카페라떼",price:700,src:"rx78.png",num:3},
	{name:"카페모카",price:700,src:"rx78.png",num:3},
	{name:"카푸치노",price:700,src:"rx78.png",num:3},
	{name:"우유",price:700,src:"rx78.png",num:3},
	{name:"녹차",price:700,src:"rx78.png",num:3},
	{name:"마키아또",price:700,src:"rx78.png",num:3},
	{name:"스프",price:700,src:"rx78.png",num:3}
	]			


window.onload = _init;

var eZapangi,eWallet,nInputMoney,nMyMoney,num1000;
var eRefundBtn, eMoneyInput, eCurrentMoney, eProductOut;
nInputMoney = 0;
nMyMoney = 10000;
num1000 = 0;

var dragObj,dropObj;

function _init()
{
	eZapangi = document.getElementById("zapangi");
	eWallet = new Box("지갑",10,430,350,140);
	document.body.appendChild(eWallet);
	//eWallet = document.getElementById("wallet");
	setButton();
	setMyMoneys();
	setProductsNum();
}

function setButton()
{
	for(var i = 0 ; i < productsData.length ; i++)
	{
		var btn = new ProductButton(i);
		eZapangi.appendChild(btn.button);
		btn.setClickF(buttonClick);
		btn.button.style.left = 30 +((i%4)*80) +"px";
		btn.button.style.top = 30 +(Math.floor(i/4)*75) +"px";
		//btn.setSoldOut();
	}

	eRefundBtn = new NormalButton("반환",250,300,50,30);
	eRefundBtn.setClickF(buttonClick);
	eZapangi.appendChild(eRefundBtn.button);

	eMoneyInput = new Box("투입구",250,260,60,80);
	document.body.appendChild(eMoneyInput);

	eCurrentMoney = new Box("현재금액:0원",60,200,150,20);
	eZapangi.appendChild(eCurrentMoney);

	eProductOut = new Box("",30,230,180,100);
	eZapangi.appendChild(eProductOut);
	
	writeStatus("현재 투입 금액: 0원");
}
function setMyMoneys()
{
	var moneyType = {'m1000':9,'m100':9,'m50':4};
	for(var mm in moneyType)
	{
		for(var i = 0 ; i < moneyType[mm] ; i++)
		{
			var myMoney = new Money(mm.slice(1));
			document.body.appendChild(myMoney.money);
			myMoney.setDropFn(moneyDrop);
			myMoney.money.style.left = 50 + Math.ceil(Math.random()*250) +"px";
			if(mm != 'm1000')myMoney.money.style.top = 440 + Math.ceil(Math.random()*50) +"px";
			else myMoney.money.style.top = 450 +"px";
		}
	}
	writeStatus("현재 가진 금액: "+nMyMoney+"원");
}
function buttonClick(i)
{
	alert(i);
}
function moneyDrop(obj,x,y)
{
	//console.log(x,y);
	var tx = parseInt(eMoneyInput.style.left);
	var ty = parseInt(eMoneyInput.style.top);
	var tw = tx + parseInt(eMoneyInput.style.width);
	var th = ty + parseInt(eMoneyInput.style.height);
	//console.log(tx,ty,tw,th);

	var wx = parseInt(eWallet.style.left);
	var wy = parseInt(eWallet.style.top);
	var ww = wx + parseInt(eWallet.style.width);
	var wh = wy + parseInt(eWallet.style.height);

	if(x >= tx && x <= tw && y >= ty && y <= th)
	{
		//console.log("Drop");
		console.log(obj.getPrice());
		if(obj.getPrice() == 1000 && num1000 >= 2)
		{
			alert("지폐는 2장만 넣을 수 있습니다.");
			obj.money.style.left = 50 + Math.ceil(Math.random()*250) +"px";
			if(obj.getPrice() != 1000)obj.money.style.top = 440 + Math.ceil(Math.random()*50) +"px";
			else obj.money.style.top = 450 +"px";
		}
		if(obj.getPrice() == 1000 && num1000 < 2) num1000++;
		nInputMoney += Number(obj.getPrice());		
		nMyMoney -= obj.getPrice();	
		obj.money.style.display = "none";

		

		writeStatus("투입 금액: "+obj.getPrice()+"원");
		//writeStatus("총투입 금액: "+nInputMoney+"원");
		//writeStatus("현재 가진 금액: "+nMyMoney+"원");
		
	}
	else if(x >= wx && x <= ww && y >= wy && y <= wh)
	{
		console.log("eWallet");		
	}
	else
	{		
		

		document.body.removeChild(obj.money);
		alert("돈을 흘렸습니다. 잘 넣으셔야죠~.\n어머 없어졌네?");
		nMyMoney -= obj.getPrice();		
		obj = null;

		writeStatus("현재 가진 금액: "+nMyMoney+"원");
	}	

}
function setProductsNum()
{
	for(var i = 0 ; i < productsData.length ; i++)
	{
		productsData[i].num = Math.ceil(Math.random()*3);
	}
	writeStatus("잔고 재설정");
}






function dropCheck(x,y)
{
	var tx = parseInt(dropObj.style.left);
	var ty = parseInt(dropObj.style.top);
	var tw = tx + parseInt(dropObj.style.width);
	var th = ty + parseInt(dropObj.style.height);

	if(x >= tx && x <= tw && y >= ty && y <= th)
	{
		document.getElementById("dropImg").src = "something.jpg";
	}
	else
	{		
		document.getElementById("dropImg").src = "oops.jpg";
	}
	return;
}


function writeStatus(sValue)
{
	var elStatus = document.getElementById("status");
	var textString = elStatus.innerHTML;
	elStatus.innerHTML = sValue + "<br>"+textString;

	if(elStatus.scrollHeight > elStatus.offsetHeight)
	{
		elStatus.scrollTop = elStatus.scrollHeight;
	}

	eCurrentMoney.innerHTML = "현재금액:"+nInputMoney+"원";
	eWallet.innerHTML = "지갑 : 잔액:"+nMyMoney+"원";
}