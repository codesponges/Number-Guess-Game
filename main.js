// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!!
// 랜덤번호가 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면, 알려준다. 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다




let computerNum = 0;
let inputArea = document.getElementById("input-area"); // index.html에서 태그에 id를 주면 main.js에서 id를 getElementById()의 인수로 넘겨서 "태그"를 가져올 수 있다
let btnPlay = document.getElementById("btn-start");
let notifyArea = document.getElementById("notify-area");
let btnReset = document.getElementById("btn-reset");
let chances = document.getElementById("chances");
let gameOver = false;
let chance = 5; // 총 기회 5번 부여
let history = []; // js에서 배열은 [] pop, includes, push, indexOf, slice, splice, length
// 중복된 값 입력하지 못하게 하려고 history 배열에 입력값을 저장

btnPlay.addEventListener("click", play); 

btnReset.addEventListener("click", reset);

inputArea.addEventListener("focus", function() {inputArea.value = "";})

randomNumber(); // 함수 호출할 때는 () 꼭 붙여줄 것


function randomNumber() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    // Math.random()은 0이상 1미만의 수를 반환한다
    // Math.floor()은 소수점 이하를 버린다
    console.log(computerNum);
}


function play() { // 버튼 한 번 클릭시 실행되는 과정
    let userValue = inputArea.value; // input 태그에 입력한 값을 가져오는 .value
    
    

    if(history.includes(userValue)){ // 만약 기존에 입력값이라면면
        notifyArea.textContent = "새로운 값을 입력하세요"
        return; // 함수를 종료 ( 하단 코드 실행 불가하도록 한다 )
    }

    history.push(userValue);
    console.log(history);


    // 범위 내에 값을 입력했는지 유효성 검사
    if(userValue < 0 || userValue >= 100){ // or는 둘 중 하나만 참이어도 전체가 참
        notifyArea.textContent = "범위를 벗어난 값을 입력하셨습니다";
        return; // 함수를 종료
    }


    chance--;
    chances.textContent = `잔여 기회 : ${chance}번`;

    // 사용자 입력값과 랜덤값 비교
    if(userValue < computerNum) {
        notifyArea.textContent = "UP!!"
    } else if (userValue > computerNum){
        notifyArea.textContent = "DOWN!!"
    } else {
        notifyArea.textContent = "정답입니다!!"
        gameOver = true;
    }

    
    if(chance == 0){ // 기회를 모두 소진하면
        gameOver = true; 
        notifyArea.textContent = `정답은 ${computerNum}`
    }


    if(gameOver == true){
        btnPlay.disabled = true;
    }
}



function reset() {
    // 기회 5번으로 초기화
    chance = 5;
    // 게임 다시 켜기 - play() 함수 안에서 기회 모두 소진 or 정답 일 경우 gameOver로 버튼 전원을 조작해서.
    gameOver = false;
    notifyArea.textContent = "1~100 사이의 수를 입력하세요" // 문구 변경
    // 실행 버튼 재활성화
    btnPlay.disabled = false; 
    // 잔여 기회 안내문 리셋
    chances.textContent = "잔여 기회 : 5번";
    // 새로운 랜덤번호를 생성
    randomNumber(); 
    // input 창의 값을 비워준다
    inputArea.value = ""; 
    // 입력값 저장해놓은 배열 원소들 초기화 해주기
    history = [];
}









 
