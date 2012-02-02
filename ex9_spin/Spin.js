function $Spin(canvasObj,w,h)
{
	var THIS = this;
	var eCtx,nTimer,nWidth,nHeight,index;
	var nLineNum,nLineLength,nLineWidth,nLineRedius,nTrail,nSpeed,bShadow,bHwaccel;

	this.init = function()
	{
		if(!canvasObj)
		{
			alert("check Spin Class args");
			throw new Error(0,"check Spin Class args");
		}
		nWidth = w;
		nHeight = h;
		index = 0;
		eCtx = canvasObj.getContext('2d');
		//eCtx.fillStyle = "rgba(0,0,0,0.3)";
		//eCtx.fillRect(0,0,nWidth,nHeight);		
		eCtx.translate(Math.floor(nWidth/2),Math.floor(nHeight/2));
		this.setProperty();
		this.motionStart();
	}

	this.setLines = function(n)
	{
		nLineNum = n;
	}
	this.setLength = function(n)
	{
		nLineLength = n;
	}
	this.setWidth = function(n)
	{
		nLineWidth = n;
	}
	this.setRadius = function(n)
	{
		nLineRedius = n;
	}
	this.setTrail = function(n)
	{
		nTrail = n;
	}
	this.setSpeed = function(n)
	{
		nSpeed = n;
		if(eCtx)this.motionStop();
		if(eCtx)this.motionStart();
	}
	this.setShadow = function(b)
	{
		bShadow = b;
	}
	this.motionStart = function()
	{
		nTimer = setInterval(this.drawSpin,nSpeed);
	}
	this.motionStop = function()
	{
		clearInterval(nTimer);
	}
	this.drawSpin = function()
	{
		eCtx.clearRect(0,0,nWidth,nHeight);
		//eCtx.fillRect(-nWidth,-nHeight,nWidth*2,nHeight*2);		
		index = (index < nLineNum-1)? index+1:0;
		if(bShadow)
		{
			eCtx.shadowOffsetX = 3;
			eCtx.shadowOffsetY = 3;
			eCtx.shadowBlur = 3;
			eCtx.shadowColor = "rgba(0,0,0, .8)";
		}
		else
		{
			eCtx.shadowOffsetX = 0;
			eCtx.shadowOffsetY = 0;
			eCtx.shadowBlur = 0;
		}

		var oAlpha = [];
		var i,alpha;
		for( i = 0 ; i < nLineNum ; i++)
		{
			alpha = Math.ceil((1/nLineNum) * i*(Number(nTrail)+30))/100;
			oAlpha[i] = (alpha>0.3)?alpha:0.3;
		}
		for( i = 0 ; i < index ; i++)
		{
			oAlpha.unshift(oAlpha.pop());
		}
		for ( i = 0; i<nLineNum ; i++)
		{
			eCtx.rotate( (Math.PI / 180) * ((360/nLineNum))); 
			alpha = (index == i)?1:oAlpha[i];
			THIS.drawLine(eCtx,0,0,nLineLength,nLineWidth,nLineRedius,"rgba(255, 255, 255, "+alpha+")");	
		}		
	}
	this.drawLine = function(ctx,x,y,l,w,r,c)
	{
		var sx = x - Math.floor(w/2);
		var sy = y - r - (l*1.5);
		var ex = x + Math.floor(w/2);
		var ey = y - r;
		
		ctx.beginPath();
		ctx.moveTo(x, sy);
		ctx.lineTo(x,ey);
		ctx.lineWidth = w;
		ctx.strokeStyle = c; 
		ctx.lineCap = "round";
		ctx.stroke();
		ctx.closePath();
	}
	this.setProperty = function()
	{
		nLineNum = 10;
		nLineLength = 20; 
		nLineWidth = 5; 
		nLineRedius = 30; 
		nTrail = 80;
		nSpeed = 100;
		bShadow = true;// 그림자 유무
		bHwaccel = false;// 하드웨어 지원(사용안함)
	}
	this.init();
}