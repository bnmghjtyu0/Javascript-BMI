// DOM
var date = new Date();
var peopleHeight = document.querySelector("#peopleHeight");
var peopleWeight = document.querySelector("#peopleWeight");
var calculatorBMI = document.querySelector("#calculatorBMI");
var listview = document.querySelector(".grid-listView");
var data = JSON.parse(localStorage.getItem("listData")) || [];

// 監聽與更新
calculatorBMI.addEventListener("click", BMIfunc, false);
listview.addEventListener("click", deleteFunc,false);
updateList(data);

// 判斷BMI的數值
function BMIfunc(e) {
  // BMI = 公斤/身高平方
  var height = parseInt(peopleHeight.value);
  var weight = parseInt(peopleWeight.value);
  var BMI = (weight / (height * 0.01 * height * 0.01)).toFixed(2);
  var len = 0;
  if (BMI < 18.5) {
    addlist(weight, height, BMI, "過輕", "thin");
  } else if (BMI >= 18.5 && BMI < 22) {
    addlist(weight, height, BMI, "一般", "common");
  } else if (BMI >= 22 && BMI < 23) {
    addlist(weight, height, BMI, "理想", "nice");
  } else if (BMI >= 23 && BMI < 25) {
    addlist(weight, height, BMI, "一般", "common");
  } else if (BMI >= 25 && BMI < 31) {
    addlist(weight, height, BMI, "過重", "fatA");
  } else if (BMI >= 31 && BMI < 36) {
    addlist(weight, height, BMI, "輕度肥胖", "fatAA");
  } else if (BMI >= 36 && BMI < 41) {
    addlist(weight, height, BMI, "中度肥胖", "fatAAA");
  } else if (BMI >= 41 && BMI < 51) {
    addlist(weight, height, BMI, "重度肥胖", "fatAAAA");
  } else {
    console.log("錯誤");
  }
}

// 將資料回傳DOM
function addlist(w, h, bmi, text, color) {
  var Year = date.getFullYear();
  var Month = date.getMonth() + 1;
  var Day = date.getDate();
  var str =
    `<li class="` +
    color +
    `">
    <div class="grid-item">` +
    text +
    `</div>
    <div class="grid-item"><em class="emi">BMI</em><span class="emiNum">` +
    bmi +
    `</span></div>
    <div class="grid-item"><em class="weight">weight</em><span class="weightNum">` +
    w +
    `</span>kg</div>
    <div class="grid-item"><em class="height">height</em><span class="heightNum">` +
    h +
    `</span>cm</div>
    <div class="grid-item"><em class="date">`+Year+`/`+Month+`/`+Day+`</em></div>
    </li>
    `;

  listview.innerHTML += str;
  var todo = {
    content: str
  };
  data.push(todo);
  localStorage.setItem("listData", JSON.stringify(data));
}

// 將localstorage資料傳回DOM
function updateList(items) {
  str = "";
  var len = items.length;
  for (var i = 0; len > i; i++) {
    str += "<li><span>" + items[i].content + "</span><a data-index='"+i+"' href='#' class='btn btn-close'>刪除</a></li>";
    
  }
  listview.innerHTML = str;
}

// 刪除事件
function deleteFunc(e) {
  e.preventDefault();
  if(e.target.nodeName !== 'A'){return};
  var index = e.target.dataset.index;
  data.splice(index,1);
  localStorage.setItem('listData',JSON.stringify(data));
  updateList(data)
}
