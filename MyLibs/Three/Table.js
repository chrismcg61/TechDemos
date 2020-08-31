var canvasW = 70;
var PREFIX_SUBITEM = "﹍﹍►";
var createTableCallback = function(){};
//
var curTable;
//var tableContainer;
var sortDir = 1;

/*** INIT Table Mgr ***/
function initTableMgr(_table, _canvasW){    //_tableContainer
  canvasW = _canvasW;  
  curTable = _table;
  refreshTable();
}

/*** DISPLAY Current Table ***/
function displayTable(_table, _tableContainer){
  curTable = _table;
  _tableContainer.innerHTML = "";
  _tableContainer.appendChild( _table );
}

/*** HIDE a Column ***/
function hideColumn(colId) {  
  if(curTable.rows[0].cells[colId].style.width != "auto") 
    curTable.rows[0].cells[colId].style.width = "auto";
  else
    curTable.rows[0].cells[colId].style.width = "20px";    
}

/*** SORT a Column ***/
function sortTable(colId) {  
  var rows, switching, i, x, y, shouldSwitch;
  // var table = curTable;
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = curTable.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[colId];
      y = rows[i + 1].getElementsByTagName("TD")[colId];
      
      // if(sortDir==-1){var tx = x;  x = y;  y = tx; } 
      // var xVal = x.innerHTML;
      var xVal = x.getElementsByTagName("INPUT")[0].value;
      var yVal = y.getElementsByTagName("INPUT")[0].value;      
      if(sortDir==-1) {
        xVal = y.getElementsByTagName("INPUT")[0].value;  
        yVal = x.getElementsByTagName("INPUT")[0].value;  
      }
      
      //check if the two rows should switch place:
      // if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
      if(parseInt(xVal) > parseInt(yVal)){
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  
  sortDir *= -1;
}



/*** Sync Table Data/Display ***/
//refreshTable();
function refreshTable() {  
  refreshBars();  
  setTimeout(refreshTable, 500);
}
//
function refreshBars() {  
  var rows = curTable.rows;
  for (var colId = 1; colId < (rows[0].cells.length); colId++) {
    refreshColBars(colId);
  }        
}
//
function refreshColBars(colId) {
  var rows = curTable.rows;
  var maxColVal = 0;
  /* Find MAX Col Value : */
  for (var i = 1; i < (rows.length); i++) {
    var cell = rows[i].getElementsByTagName("TD")[colId];
    var cellVal = parseInt( cell.getElementsByTagName("INPUT")[0].value );
    if(cellVal > maxColVal) maxColVal = cellVal;
  }
  /* Refresh Bars Accordingly : */
  for (var i = 1; i < (rows.length); i++) {
    var cell = rows[i].getElementsByTagName("TD")[colId];
    var cellVal = cell.getElementsByTagName("INPUT")[0].value;
    var bar = cell.getElementsByTagName("CANVAS")[0];
    var barBack = cell.getElementsByTagName("CANVAS")[1];
    refreshBar(bar, barBack, cellVal, maxColVal);
  }
}
//
function refreshBar(bar, barBack, cellVal,maxColVal) {
  var ratio = cellVal/maxColVal;
  // bar.style.backgroundColor = "rgb("+(ratio*255)+",0,"+(ratio*50)+")";
  var ratio2 = Math.max(0, (ratio-0.5)*2);
  bar.style.backgroundImage = "linear-gradient(to right, rgb(0,0,0), rgb("+(180*ratio)+",0,0), rgb("+(180+75*(ratio2))+","+(255*(ratio2))+",0) )";
  
  if(cellVal<=maxColVal){
    bar.width = canvasW * ratio;
    barBack.width = canvasW * (maxColVal-cellVal)/maxColVal;
  }    
  else{
    bar.width = cellVal;
    barBack.width = 0;    
  }     
}

/*** Dyn HTML Tools ***/
function setFunc(_func, i){
  return function(){ _func(i) };
}

/*** Add HTML Elt (FPS UI Version) ***/
function addEltUI(parent, tag, id, innerHTML){
  var newElt = document.createElement(tag);  
  newElt.id = id;
  newElt.innerHTML = innerHTML;
  parent.appendChild( newElt );  
  return newElt;
}





/*** --- ***/
/*** NEW Section ***/
/*** MAIN Creation API ***/
function createMyTable(_items, _paramsKey, _params0){
  var newTable = document.createElement("TABLE");    
  //
  createMyRow(newTable, _items[0], _paramsKey, _params0, -1, 0);  
  //
  createMySubTable(newTable, _items, _paramsKey, _params0, 0);  
  //
  return newTable;
}

/*** FILL EXISTING TABLE (Recursive) ***/
function createMySubTable(_newTable, _items, _paramsKey, _params0, _lvl){
  for ( var i=0; i<_items.length; i++ ) {
    var item = _items[i];
    //if(getTitle(item)=="") continue;
    var newTr = createMyRow(_newTable, item, _paramsKey, _params0, 0, _lvl);
    //
    var subItems = getSubItems(item);
    if(subItems){
      var titleCell = newTr.cells[0];
      var btn = addEltUI(titleCell, "BUTTON", "", "+");
      // btn.classList.add("minBtn");
      btn.onclick = setFunc(function(item){ 
        if(item.expand) item.expand = false;
        else item.expand = true;
        createTableCallback();
      },item);    
      if(item.expand)
      {
        createMySubTable(_newTable, subItems, _paramsKey, _params0, _lvl+1);      
      }
    } 
  }  
}

/*** Add a Row ***/
function createMyRow(_newTable, _item, _paramsKey, _params0, _lineId, _lvl){
  var rowId = _newTable.rows.length;
  var newTr = _newTable.insertRow(rowId);    
  var cellContent_Title = getTitle(_item);
  if(_lvl>0) cellContent_Title = PREFIX_SUBITEM + cellContent_Title;
  if(_lineId==-1)  addEltUI(newTr, "TH", "id", "TITLE");  
  else {
    var cell = addEltUI(newTr, "TD", "id", cellContent_Title);
    cell.style.textAlign = "left";
  }  
  //
  var colId = 0;
  for(var key in _params0){
    if(key=="title") continue;
    colId++;
    //
    //var cellContent_Val = getVal(_item, _paramsKey, key);
    if(_lineId==-1) displayTitleCell(newTr, colId, key);
    else displayNumVal(newTr, _item, _paramsKey, key,  );
      //addEltUI(newTr, "TD", "id", cellContent_Val);
    //var cell = addEltUI(newTr, "TD", "id", cellContent_Val);
  }  
  //
  return newTr;
}

/*** Display Number Elements ***/
function displayNumVal(_newTr, _item, _paramsKey, _key,  ){
  var cell = addEltUI(_newTr, "TD", "", "");
  var newInput = addEltUI(cell, "INPUT", "", "");
  newInput.type = "number";
  newInput.classList.add("bigFont");
  newInput.style.width = "50px";
  //var cellContent_Val = getVal(_item, _paramsKey, _key);
  newInput.value = getVal(_item, _paramsKey, _key);
  //else newInput.value = 0;
  var canvas = addEltUI(cell, "CANVAS", "", "");
  canvas.classList.add("barCanvas");
  canvas.height = 8;
  canvas.width = 100;
  canvas.style.backgroundColor = "red";
  canvas.style.marginLeft = "8px";
  var canvas = addEltUI(cell, "CANVAS", "", "");
  canvas.classList.add("barCanvas");
  canvas.height = 8;
  canvas.width = 100;  
}

/*** Display Title-Line Elements ***/
function displayTitleCell(_newTr, _colId, _key){
  var cell = addEltUI(_newTr, "TH", "", "");
  var btn = addEltUI(cell, "BUTTON", "", "+");
  btn.onclick = setFunc(hideColumn,_colId);      
  btn.classList.add("minBtn");
  var colName = addEltUI(cell, "SPAN", "", _key);
  //if(key!=titleKey)
  {
    var btn = addEltUI(cell, "BUTTON", "", "▼");
    btn.onclick = setFunc(sortTable,_colId);
    btn.classList.add("minBtn");
  }  
}

/*** Getters (Subitems + Title + Vals) ***/
function getSubItems(_item){
  var subItems = null;
  if(subItems==null && _item.subItems) subItems = _item.subItems;
  if(subItems==null && _item.subDivs) subItems = _item.subDivs;
  return subItems;
}
function getTitle(_item){
  var title = "";
  if(title=="" && _item.title && _item.title.txt) title = _item.title.txt;
  if(title=="" && _item.tagDiv && _item.tagDiv.title) title = _item.tagDiv.title;
  //
  return title;  
}
function getVal(_item, _paramsKey, _key){
  var value = 0;
  if(value==0 && _item[_paramsKey] && _item[_paramsKey][_key] ) value = _item[_paramsKey][_key];
  //
  return value;  
}

