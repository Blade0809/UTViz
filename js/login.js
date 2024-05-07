 let veriCodeTips = document.querySelector('.veri-code-tips');
    let veriCode = document.querySelector('.veri-code');
    let signupInto = document.querySelector('.signup-into');
    let otherLoginBtn = document.querySelector('.other-login-btn');
    let signupForm = document.querySelector('.signup-form');
    let loginForm = document.querySelector('.login-form');
    let loginInto = document.querySelector('.login-into');
    let pwdBtn = document.querySelector('.pwd');
    let reckonTimeFlag = 5; //倒计时
    let reckonTime; //定时器
    let otherLoginFlag = false;
    //定时器
    function countDown() {
        veriCodeTips.innerHTML = `RESEND(${reckonTimeFlag})`
        reckonTimeFlag--;
        if (reckonTimeFlag < 0) {
            clearInterval(reckonTime);
            reckonTimeFlag = 5;
            veriCodeTips.innerHTML = `Click To Get`;
            veriCodeTips.style.color = "rgb(39, 150, 247)";
            veriCodeTips.onclick = veriCodeTipsClick;
        }
    }
    //点击事件触发的方法
    function veriCodeTipsClick() {
        veriCodeTips.onclick = null;
        veriCodeTips.style.color = "rgb(153, 151, 151)";
        reckonTime = setInterval(countDown, 1000);
        countDown();
    }
    //验证码登录设置点击事件
    veriCodeTips.onclick = function() {
        veriCodeTipsClick();
    }
    loginInto.onclick = function() {
        signupForm.style.zIndex = '0';
        signupForm.style.opacity = '0';
        signupForm.style.transform = 'translate(0, 0px)';
        setTimeout(function() {
            loginForm.style.opacity = '1';
            loginForm.style.zIndex = '1';
        }, 500)
    }
    signupInto.onclick = function() {
        loginForm.style.opacity = '0';
        loginForm.style.zIndex = '0';
        setTimeout(function() {
            signupForm.style.zIndex = '1';
            signupForm.style.opacity = '1';
            // signupForm.style.transform = 'translate(0, 50px)';
        }, 500)
    }
    otherLoginBtn.onclick = function() {
        if (otherLoginFlag) {
            veriCode.style.opacity = '0';
            veriCode.style.zIndex = '0';
            veriCode.style.transform = 'translate(0, 0px)';
            pwdBtn.style.opacity = '1'
            otherLoginBtn.innerHTML = '验证码登录';
            otherLoginFlag = false;
        } else {
            veriCode.style.opacity = '1';
            veriCode.style.zIndex = '1';
            veriCode.style.transform = 'translate(0, -90px)';
            pwdBtn.style.opacity = '0'
            otherLoginBtn.innerHTML = '密码登录';
            otherLoginFlag = true;
        }
    }