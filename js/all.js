const btn_add = document.querySelector("#addTodoBtn");

const inputVal = document.querySelector("#inputVal");

const todoList = document.querySelector("#todoList");

const tab = document.querySelector("#tab");

const workNum = document.querySelector("#workNum");

const deleteButton = document.querySelector("#deleteBTN");

let todoData = [];
// 預設為全部顯示
let situation = "all";
// 不同葉面資料
let dataShow = [];

//
btn_add.addEventListener("click", addTodo);
function addTodo() {
  let todo = {
    text: inputVal.value,
    id: new Date().getTime(),
    complete: "",
  };

  if (todo.text.trim() !== "") {
    todoData.push(todo);
    inputVal.value = "";
  } else {
    alert("要輸入事情喔");
  }

  updateList(dataShow);
}

// 渲染
function render(todoData) {
  let str = "";
  todoData.forEach((item) => {
    str += `<li data-id="${item.id}">
        <label class="checkbox" for="">
          <input type="checkbox" ${item.complete ? "checked" : ""}  />
          <span>${item.text}</span>
        </label>
        <a href="#" class="delete"></a>
      </li>`;
  });

  todoList.innerHTML = str;
}

// 刪除單筆//切換打勾狀態
todoList.addEventListener("click", (e) => {
  let id = parseInt(e.target.closest("li").dataset.id);
  // data-id= ${item.id} 來自getTime
  // 找到li，取出id
  if (e.target.getAttribute("class") === "delete") {
    e.preventDefault;
    let index = todoData.findIndex((item) => item.id === id);
    todoData.splice(index, 1);
  } else {
    todoData.forEach((item) => {
      if (item.id === id) {
        item.complete ? (item.complete = false) : (item.complete = true);
      }
    });
  }
  updateList(dataShow);
});

// 切換狀態
tab.addEventListener("click", changeTab);
// 監聽ul #tab
function changeTab(e) {
  situation = e.target.dataset.tab;
  // 這裡還沒用到↑
  let tabs = document.querySelectorAll("#tab li");

  //   item=li，item視為forEach裡的參數，上面宣告選擇#tab裡面全部li
  tabs.forEach((item) => {
    item.setAttribute("class", "");
    // 三個li點到其中一個就會執行清除其兩個的樣式
  });
  e.target.setAttribute("class", "active");
  //   點到才給li class
  updateList();
}

// 篩選
function updateList() {
  if (situation === "all") {
    dataShow = todoData;
  } else if (situation === "work") {
    dataShow = todoData.filter((item) => item.complete == false);
  } else {
    dataShow = todoData.filter((item) => item.complete == true);
  }
  let longer = todoData.filter((item) => !item.complete);
  let todolength = longer;
  workNum.textContent = todolength.length;
  render(dataShow);
}
updateList();

deleteButton.addEventListener("click", function (e) {
  e.preventDefault();

  todoData = todoData.filter((item) => item.complete == false);

  updateList();
});
