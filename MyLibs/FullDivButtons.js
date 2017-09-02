
class BtnGroupButton {
	
  constructor(text, onclick, display, subButtonList) {
		var defaultText = "Btn";
		if(BtnGroupButton.btnNb != undefined)
		{
			defaultText += BtnGroupButton.btnNb;
			BtnGroupButton.btnNb++;
		}
		
    this.text = defaultText;
		this.onclick = function(){ alert(defaultText); };
		this.display = 'block';
		this.subButtonList = [];
	
		
		if(text != undefined)  this.text = text;
		if(onclick != undefined)  this.onclick = onclick;
		if(display != undefined)  this.display = display;
		if(subButtonList != undefined)  this.subButtonList = subButtonList;
  };
		
}
BtnGroupButton.btnNb = 0;








function createBtnGroup(btnGroup, buttonList, isHorizontal, color, colorFactor, isRandomColor)
{
	var btnList = [];
	var btnNb = buttonList.length;
	for(var i=0; i < btnNb; i++)
	{
		var newBtn = document.createElement("BUTTON");
		btnGroup.appendChild(newBtn);
		btnList.push(newBtn);	
		
		newBtn.onclick = buttonList[i].onclick;
		
		newBtn.className  = "button";
		newBtn.innerHTML = buttonList[i].text;
		newBtn.style.width = 100+"%";
		newBtn.style.height = 100+"%";
		
		if(isHorizontal) newBtn.style.width = (100/btnNb)+"%";
		else newBtn.style.height = (100/btnNb)+"%";
		
		newBtn.style.display = buttonList[i].display;
		
		if(isRandomColor)
		{
			color.r = Math.floor( Math.random()*255 );
			color.g = Math.floor( Math.random()*255 );
			color.b = Math.floor( Math.random()*255 );
		}
		else
		{
			color.r *= colorFactor.r;
			color.g *= colorFactor.g;
			color.b *= colorFactor.b;
		}		
		newBtn.style.backgroundColor = "rgba("+color.r+", "+color.g+", "+color.b+", "+color.a+")";		
		
		
		
		addSubButtons(i);
		function addSubButtons(i)
		{ 
			var newBtnDiv = document.createElement("div");
			newBtnDiv.style.display = 'none';
			btnGroup.appendChild(newBtnDiv);	

			if(buttonList[i].subButtonList.length > 0)
			{
				newBtn.onclick = function()
				{ 
					if(newBtnDiv.style.display == 'none') newBtnDiv.style.display = 'block';
					else newBtnDiv.style.display = 'none';
				};
				createBtnGroup(newBtnDiv, buttonList[i].subButtonList, isHorizontal, color, colorFactor, 0);
			}
		};

	}	
	return btnList;
}




