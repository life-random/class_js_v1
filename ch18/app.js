// app.js

// ----- 공통 요소 선택 -----
const getTodoBtn = document.getElementById("getTodoBtn");
const postTodoBtn = document.getElementById("postTodoBtn");

const patchTodoBtn = document.getElementById("patchTodoBtn");
const putTodoBtn = document.getElementById("putTodoBtn");
const deleteTodoBtn = document.getElementById("deleteTodoBtn");
const listBtn = document.getElementById("listBtn");
const resultDisplay = document.getElementById("resultDisplay");
const todoList = document.getElementById("todoList");

// API 기본 주소 - "http://localhost:8080/api"
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 결과를 pre 태그에 보여주는 헬퍼 함수
function showResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
}

// 1. GET 조회
async function fetchTodo() {
  resultDisplay.textContent = "Loading (GET) ......";

  try {
    // 1) 요청을 보내고 응답이 도착할 때까지 여기서 잠시 대기
    //  fetch 함수에서 기본값을 GET 요청이다
    const response = await fetch(`${BASE_URL}/todos/1`);

    console.log(response.status); // 응답 상태코드

    // 2) 응답 본문(json 문자열)을 객체로 바꿀 때까지 기다린다
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = `요청 실패 : ${error.message}`;
  }
}
getTodoBtn.addEventListener("click", fetchTodo);

// 1. GET 조회 - then 사용
async function fetchTodo2() {
  resultDisplay.textContent = "Loading (GET) ......";

  // fetch는 Promise를 돌려 준다. 메서드를 안쓰면 기본 GET 요청이다
  fetch(`${BASE_URL}/todos/2`, { method: "GET" })
    .then((response) => {
      // 1) 응답이 도착하면 실행된다
      console.log(response.status); // 응답 상태 코드
      // response.json()도 promise를 반환
      return response.json();
    })
    .then((data) => {
      // 응답 본문에 문자열을 js Object로 파싱해서 응답받는다
      console.log(data);
      showResult(data);
    })
    .catch((error) => {
      // 인터넷 끊기는 동안 요청 자체 실패
      resultDisplay.textContent = `요청 실패 : ${error.message}`;
    });
}

getTodoBtn.addEventListener("click", fetchTodo2);

// ----- 2. POST : 생성 -----
async function createTodo() {
  resultDisplay.textContent = "Loading (POST) ......";

  const newTodo = { title: "자바스크립트 복습", completed: false, userId: 1 };

  try {
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8 " },
      body: JSON.stringify(newTodo), // 객체를 문자열로 바꿔 보내야 한다.
    });

    // 상태 코드 POST : 201 (Created)
    console.log(response.status);
    console.log(response);
    const data = await response.json(); // JSON 형식에 문자열이 객체로 변환됨
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = `요청 실패 : ${error.message}`;
  }
}

postTodoBtn.addEventListener("click", createTodo);

// 3. ----- PATCH: 부분 수정 -----
async function patchTodo() {
  resultDisplay.textContent = "Loading (PATCH) ......";

  const fetchTodoBody = { title: "자바스크립트 복습" };

  try {
    const response = await fetch(`${BASE_URL}/todos/5`, {
      method: `PATCH`,
      body: JSON.stringify(fetchTodoBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log(response.status);
    const data = await response.json();
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = `요청 실패 : ${error.message}`;
  }
}

patchTodoBtn.addEventListener("click", fetchTodo);

// 4. ----- PUT: 전체 수정 -----
async function putTodo() {
  resultDisplay.textContent = "Loading (PUT) ......";

  const putTodoBody = {
    id: 1,
    title: "foo",
    body: "bar",
    userId: 1,
  };

  try {
    const response = await fetch(`${BASE_URL}/todos/3`, {
      method: `PUT`,
      body: JSON.stringify(putTodoBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(response.status);
    const data = await response.json();
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = `요청 실패 : ${error.message}`;
  }
}

putTodoBtn.addEventListener("click", putTodo);

// 5. ----- DELETE: 삭제 -----
async function deleteTodo() {
  resultDisplay.textContent = "Loading (Delete) ......";

  try {
    const response = await fetch(`${BASE_URL}/todos/3`, {
      method: `DELETE`,
    });
    console.log(response.status);
    if (response.ok) {
      resultDisplay.textContent = "삭제 성공!";
    }
  } catch (error) {
    resultDisplay.textContent = `요청 실패 : ${error.message}`;
  }
}

deleteTodoBtn.addEventListener("click", deleteTodo);
