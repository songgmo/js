MultiDrag = jindo.$Class(
{
	$init : function(elStage)
	{
		this.elStage = jindo.$Element(elStage); 
		this.boxSize = 30;
		this.elCloneObj = null;
	},
	run : function()
	{
		var i,nRedNum,nBlueNum;		
		this.nStageWidth = this.elStage.width();
		this.nStageHeight = this.elStage.height();
		nRedNum = Math.ceil(Math.random()*10); 
		nBlueNum = Math.ceil(Math.random()*10); 

		for(i =0 ; i < nBlueNum ; i++)
		{			
			var box = this.makeBox(0);
			jindo.$Element(box.$value()).className('blue');

			jindo.$Fn(function(oEvent)
			{
				oFoggy.show(oEvent.currentElement);
			}).attach(box.$value(),"click");
		}
		for(i =0 ; i < nRedNum ; i++)
		{
			var box = this.makeBox('');
			jindo.$Element(box.$value()).className('red');
			/*
			jindo.$Fn(function(oEvent)
			{
				jindo.$Element(oEvent.currentElement).addClass('redOvered');
			}).attach(box.$value(),"mouseover");
			jindo.$Fn(function(oEvent)
			{
				jindo.$Element(oEvent.currentElement).removeClass('redOvered');
			}).attach(box.$value(),"mouseout");			
			*/
		}
		var oFoggy = new jindo.Foggy();
		oFoggy.getFog().onclick = function() { oFoggy.hide(); };
		var oRolloverArea = new jindo.RolloverArea(document.body, 
		{
			sClassName : 'red', 
			bCheckMouseDown : false,
			sClassPrefix : '', 
			htStatus : {
				sOver : "redOvered"
			}
		});

		this.cloneObj(0,0);
		jindo.$Element(this.elCloneObj.$value()).hide();
		
		var oDragArea = new jindo.DragArea(document.body, { sClassName : 'red'}).attach(
		{
			'dragStart' : function(oCustomEvent) 
			{
				oTransition.abort();
				var cloneObj = jindo.$Element('cloneRed');
				cloneObj.show();
				var oMousePos = oCustomEvent.weEvent.pos();   			
				cloneObj.offset(oMousePos.pageY - 8,oMousePos.pageX - 8);
				oCustomEvent.elDrag = cloneObj.$value();				
			},   
			'drag' : function(oCustomEvent) 
			{   
				var cloneObj = jindo.$Element('cloneRed');
				cloneObj.offset(oCustomEvent.nY - 8,oCustomEvent.nX - 8);					
			 }
		});  
		var oTransition = new jindo.Transition({bCorrection:true}).attach(
			"end", function() 
			{
				var cloneObj = jindo.$Element('cloneRed');
				cloneObj.hide();				
			});
		var oDropArea = new jindo.DropArea(document.body, { sClassName : 'blue', oDragInstance : oDragArea }).attach(
		{
			'over' : function(oCustomEvent) 
			{				
				jindo.$Element(oCustomEvent.elDrop).addClass('overed');
			},
			'out' : function(oCustomEvent) 
			{
				jindo.$Element(oCustomEvent.elDrop).removeClass('overed');
			},
			'drop' : function(oCustomEvent) 
			{
				oCustomEvent.elDrop.innerHTML = Number(oCustomEvent.elDrop.innerHTML)+1;
				jindo.$Element(oCustomEvent.elDrop).removeClass('overed');
				jindo.$Element(oCustomEvent.elDrag).hide();	
			},
			'dragEnd' : function(oCustomEvent) 
			{
				if (!oCustomEvent.aDrop.length) 
				{			
					oTransition.abort().start(1000,oCustomEvent.elDrag,	
					{
						'@left' : jindo.Effect.easeOut(jindo.$Element(oCustomEvent.elHandle).offset().left + 'px')
					},
					oCustomEvent.elDrag,{
						'@top' : jindo.Effect.easeOut(jindo.$Element(oCustomEvent.elHandle).offset().top + 'px')
					})
				}
			}
		});
	},
	makeBox : function(n)
	{
		var randX = Math.ceil(Math.random()*(this.nStageWidth - this.boxSize));
		var randY = Math.ceil(Math.random()*(this.nStageHeight - this.boxSize)) + 50;
		var box = new NormalButton(n,randX,randY,this.boxSize,this.boxSize);	
		jindo.$Element(box.$value()).appendTo(document.body);
		return box;
	},
	cloneObj : function(x,y)
	{
		if(!this.elCloneObj) 
		{
			this.elCloneObj = new NormalButton("",x,y,this.boxSize,this.boxSize);	
			jindo.$Element(this.elCloneObj.$value()).className('cloneRed');
			jindo.$Element(this.elCloneObj.$value()).attr("id","cloneRed");
			jindo.$Element(this.elCloneObj.$value()).appendTo(document.body);
		}
		else
		{
			jindo.$Element(this.elCloneObj.$value()).css(
			{
				left: x + "px", 
				top: y + "px", 
			});
		}
	}
});



NormalButton = jindo.$Class(
{
	$init : function (value,x,y,w,h) 
	{
		this.button = jindo.$("<DIV>");
		jindo.$Element(this.button).css(
		{
			position : "absolute",
			left: x + "px", 
			top: y + "px", 
			width: w + "px", 
			height: h + "px", 
		});
		this.button.innerHTML = value;		
	},
	setNum : function(n)
	{
		this.button.innerHTML = n;		
	},
	$value : function()
	{
		return this.button;
	}
});