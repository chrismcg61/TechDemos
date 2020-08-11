var canvasW = 70;
//
var curTable;
//var tableContainer;
var sortDir = 1;

/*** INIT Table Mgr ***/
function initTableMgr(_canvasW){ //_tableContainer
  canvasW = _canvasW;  
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


/*** CREATE Table from DATA Obj ***/
function createTable(items, titleKey, paramsKey){
  var params0 = items[0][paramsKey];
  var newTable = document.createElement("TABLE");  
  for ( var i=-1; i<items.length; i++ ) {
    var item;
    if(i==-1) item = items[0];
    else item = items[i];
    //
    var params = item[paramsKey];
    if(!params) continue;
    /* Add Title to Params : */
    if(!params[titleKey]) params[titleKey] = item[titleKey];
    //
    // var newTr = addRow(newTable);   
    var newTr = addElt(newTable, "TR", "", "");
    var colId = -1;
    for(var key in params0){
      colId++;
      if(i==-1) {
        var cell = addElt(newTr, "TH", "", "");
        var btn = addElt(cell, "BUTTON", "", "+");
        btn.onclick = setFunc(hideColumn,colId);      
        btn.classList.add("minBtn");
        var colName = addElt(cell, "SPAN", "", key);
        var btn = addElt(cell, "BUTTON", "", "▼");
        btn.onclick = setFunc(sortTable,colId);
        btn.classList.add("minBtn");
      }
      else{ 
        // addCell(newTr, "TD", params[key] );
        if(key==titleKey) var cell = addElt(newTr, "TD", "", params[key]);
        else{
          var cell = addElt(newTr, "TD", "", "");
          var newInput = addElt(cell, "INPUT", "", "");
          newInput.type = "number";
          newInput.classList.add("bigFont");
          newInput.style.width = "50px";
          newInput.value = params[key];
          var canvas = addElt(cell, "CANVAS", "", "");
          canvas.classList.add("barCanvas");
          canvas.height = 8;
          canvas.width = 100;
          canvas.style.backgroundColor = "red";
          canvas.style.marginLeft = "8px";
          var canvas = addElt(cell, "CANVAS", "", "");
          canvas.classList.add("barCanvas");
          canvas.height = 8;
          canvas.width = 100;
          // canvas.style.backgroundColor = "red";
        }
      }
    }
  }
  // meshBis.content = newTable;  
  //curTable = newTable;
  return newTable;
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
  if(cellVal<=maxColVal){
    bar.width = cellVal * canvasW/maxColVal;
    barBack.width = (maxColVal-cellVal) * canvasW/maxColVal;    
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
//
function addElt(parent, tag, id, innerHTML){
  var newElt = document.createElement(tag);  
  newElt.id = id;
  newElt.innerHTML = innerHTML;
  parent.appendChild( newElt );  
  return newElt;
}
