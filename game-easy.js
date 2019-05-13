window.onload = function () {//这个开头window.onload的用意？？？？？

    const holes = document.querySelectorAll('.hole');//洞
    //querySelectorAll 获取文档中 class="example" 的所有元素
    //document.querySelector("#demo");获取文档中 id="demo" 的元素
    const scoreBoard = document.querySelector('.score');//分数
    const moles = document.querySelectorAll('.mole');//获取所有地鼠
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');
    //为什么有些颜色是灰色的？因为值没有设置√

    let lastHole;
    let timeUp = false;//
    let score = 0;
    let gameTime = 10000;//10秒游戏时间

    //addEventListener，在文档中添加点击事件。当用户在文档任何地方点击时，在 id="demo" 的 <p> 元素上输出 "Hello World"：
    //document.addEventListener("click", function(){
    //document.getElementById("demo").innerHTML = "Hello World";});
    startBtn.addEventListener('click', function () {
        showBtnAnimation();//按钮动画
        startGame();//开始游戏
    }, false);
    //false- 默认。事件句柄在冒泡阶段执行

    function showBtnAnimation() {
        event.preventDefault();
        //event.preventDefault() 方法阻止元素发生默认的行为。
        startBtn.classList.add('animate');
        //HTML DOM classList 属性 为元素添加 class
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);
    }

    //游戏开始时候要发生的事件
    function startGame() {
        resetScoreAndTime();//游戏初始化设置
        peep();//老鼠出洞
        //箭头函数
        //setTimeout(JavaScript 函数, 等待的毫秒数)
        score = 0;
        timeUp = false;
        setTimeout(() => timeUp = true,10000);
    }

    /**
     * 初始化设置.
     */
    function resetScoreAndTime() {
        // TODO: 写游戏的初始化设置，时间和分数的设置
        scoreBoard.textContent = 0;        
        setTimeout(() => timeUp = true,10000);
    }

    /**
     * 出洞.
     */
    function peep() {
        const time = randomTime(200, 1000);//随机时间出现
        const hole = randomHole(holes);//随机洞口出现
        comeOutAndStop(hole, time);
    }

    /**
     * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
     *
     * @param min 随机数的下界.
     * @param max 随机数的上界.
     * @returns {number}
     */
    function randomTime(min, max) {
        // TODO: 写生成随机数的逻辑
        return Math.round(Math.random() * (max - min) + min);
        //return 0;//老鼠不会出洞
    }

    /**
     * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
     *
     * @param holes
     * @returns {*}
     */
    function randomHole(holes) {
        // TODO: 写地鼠随机选择钻出地洞的逻辑，如果与上一个是相同地洞，则重新选择一个地洞.
        const current = Math.floor(Math.random() * holes.length); 
        const hole = holes[current];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
        //return null;//老鼠不出现
    }

    /**
     * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
     *
     * @param hole 地鼠所出地洞.
     * @param time 地鼠停留时间.
     */
    function comeOutAndStop(hole, time) {
        // TODO: 写地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
        hole.classList.add('up');
        setTimeout(() => {
          hole.classList.remove('up');
          if(!timeUp) peep();
        }, time);
    }

    /**
     * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
     */
    moles.forEach(mole => mole.addEventListener('click', function (e) {
        //JavaScript forEach() 方法
        // TODO: 在这里写用户点击地鼠发生的事.
        //if(timeUp==false){
            //alert("Please Start Game !");
           // return;
        //}
       // else{
            //if(document.getElementsByClassName("hole["+current+"]").innerHtml !=""){
                //score += 1;
                //scoreBoard.textContent = score;
                //document.getElementsByClassName("hole["+current+"]")//.innerHtml = '<img src="whack-a-mole\mole.svg">';
           // }

        //}
        if(!e.isTrusted) return; // cheater
        score ++;
        this.classList.remove('up');
        scoreBoard.textContent = score;
    }));

};