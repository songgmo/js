/**
 * Editable Inline Text CalendarComp ver 0.9
 * 
 * @class 
 * @name nhn.EditableText
 * @extends nhn.Component
 * @author songsl, Ajax UI2
 */
 if(typeof console === 'undefined') {
 	var console = {
		log : function () {}
	};
 }
 
nhn.CalendarComp = jindo.$Class(
{
	





}).extend(jindo.UIComponent);

	sTpl : '',
	sClassName : 'editable',
	oDatas : null,
	$init : function (oOpt) { 
		this.sClassName = oOpt.className || 'editable';
		this.bClickableText = oOpt.clickableText;
		this.sTpl = '<input type="text" value="{=text}" class="{=label}" />';
		this.oDatas = [];
		if(this.bClickableText){this._bindEvent();};
		
	},
	edit : function (el) {
		var self = this;
		el = el.currentElement || el;
		
		if(self._getData(el)) {
			self._setEditMode(self._getData(el));
			return;
		}
		var oData = {bEdit : true};
		var oParam = {template : self.sTpl};
		var welText = $Element(el);
		var fpSetTemplate = function(sTpl) {
			var sUnique = ('data-' + (Date.now || function(){ return +new Date; })()).toString();
			var sText = welText.html();
			oData.sUniqueClassName = sUnique;
			sTpl = $Template(sTpl).process({ text : sText , label : sUnique});
			
			return sTpl;
		};
		
		self.fireEvent('beforeprocessdata', oParam);
		oData.sOriginalText = welText.html();
		oData.elText = $(el);
		var sCode = fpSetTemplate(oParam.template);
		welText.html(sCode);
		
		var elEdit = self._getElement(oData);
		$Fn(self._keydown,self).attach(elEdit , 'keydown');
		$Fn(self._blur,self).attach(elEdit , 'blur');
		self._setEditMode(); //init edit mode
		self.oDatas.push(oData);
		this.fireEvent('load',  {element : elEdit});
	},
	commit : function(sUniqueClassName,e) {
		var oData = this._getData(sUniqueClassName) || null;
		this._cancelBubble(e,oData);
		this._back(true,oData);
	},
	rollback: function(sUniqueClassName,e){
		var oData = this._getData(sUniqueClassName) || null;
		this._cancelBubble(e,oData);
		this._back(false,oData); 
	},
	
	_back : function (bSave,oData) {
		oData = oData || this._getData();
		if(!oData) return;
		var elEdit = this._getElement(oData);
		var sBehavior = bSave ? 'commit' : 'rollback';
		var sText = bSave ? elEdit.value : oData.sOriginalText;
		$Element(oData.elText).text(sText);
		this._setInit(oData); 
		this.fireEvent('complete',{text : sText, result: sBehavior});
	},
	_getData : function (variant) {
		var oData = null;
		$A(this.oDatas).forEach(function(o) {
			if( typeof(variant)==='object' ? variant===(o.elText) : typeof(variant)==='string' ? variant===o.sUniqueClassName : o.bEdit)
				oData = o;
		});
		return oData;	
	},
	_getElement : function(oData) {
		return cssquery.getSingle('.'+oData.sUniqueClassName,oData.elText);
	},
	_keydown : function(oEvent) {
		this.fireEvent('keydown', oEvent);
	},
	_blur : function(oEvent) {
		this._setEditMode(this._getData());
		this.fireEvent('blur',oEvent);
	},
	_setInit : function (oData) {
		var oNewDatas = [];
		oData = oData || this._getData();
		$A(this.oDatas).forEach(function(o) {
			if(oData !== o)
				oNewDatas.push(o);
		}); 
		this.oDatas = oNewDatas;
	},
	_setEditMode : function (oData) {
		$A(this.oDatas).forEach(function(o) {
			o.bEdit = oData === o;
		});
	},
	_cancelBubble : function (e,oData) {
		try{
			e = (e) ? e : window.event;
			e.cancelBubble = true;
			this._setEditMode(oData);
		}
		catch(e) {}
	},
	_bindEvent : function () {
		var aEl = cssquery('.'+this.sClassName);
		var self = this;
		$A(aEl).forEach(function(o){
			$Fn(self.edit,self ).attach(o , 'click');
		});
	}
}).extend(nhn.Component);


function $CalendarComp(canvasObj,w,h)
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