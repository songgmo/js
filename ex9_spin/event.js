function addEvent(o, evt, handler) 
{
	if (window.addEventListener) { //FF
		o.addEventListener(evt, handler, false);
	}
	else if (document.body.attachEvent) { //IE
		o.attachEvent("on"+evt, handler);
	}
	else if (document.getElementById) {
		o['on'+evt] = handler;
	} 
}
function deleteEvent(o, evt, handler) 
{
	//console.log(handler);
	if (window.addEventListener) { //FF
		o.removeEventListener(evt, handler, false);
	}
	else if (document.body.attachEvent) { //IE
		o.detachEvent("on"+evt, handler);
	}
	else if (document.getElementById) {
		o['on'+evt] = null;
	} 
}