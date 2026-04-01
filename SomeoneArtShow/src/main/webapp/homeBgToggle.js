//此段代码由ai辅助完成
// homeBgToggle.js - 控制Home背景图显示/隐藏 + 本地存储 + 文本颜色适配
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取元素
    const homeSection = document.querySelector('.Home');
    // 获取Home区域内所有文本元素（h2/h3/p/a 都变色）
    const homeTexts = homeSection.querySelectorAll('h2, h3, p, a');

    // 2. 从本地存储读取用户上次的选择（默认显示）
    let isBgVisible = localStorage.getItem('homeBgVisible') !== 'false';

    // 3. 创建切换按钮
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = isBgVisible ? '隐藏背景图' : '显示背景图';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.padding = '10px 20px';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '5px';
    toggleBtn.style.backgroundColor = '#231c1a';
    toggleBtn.style.color = 'white';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '9999'; // 确保按钮在最上层
    document.body.appendChild(toggleBtn);

    // 4. 页面加载时自动应用用户上次的选择
    applyBgState();

    // ------------------------------
    // 核心：应用背景状态 + 文本颜色
    // ------------------------------
    function applyBgState() {
        if (isBgVisible) {
            // 显示背景：恢复背景图 + 文本白色（适配深色背景）
            homeSection.style.backgroundImage = 'url("iamges/background.png")';
            homeSection.style.backgroundRepeat = 'no-repeat';
            homeSection.style.backgroundSize = 'cover';
            homeSection.style.backgroundPosition = 'center';
            homeTexts.forEach(el => el.style.color = 'white');
        } else {
            // 隐藏背景：去掉背景图 + 文本黑色（适配浅色背景）
            homeSection.style.backgroundImage = 'none';
            homeTexts.forEach(el => el.style.color = 'black');
        }
    }

    // ------------------------------
    // 切换状态 + 保存到本地存储
    // ------------------------------
    function toggleHomeBg() {
        isBgVisible = !isBgVisible;
        
        // 应用新状态
        applyBgState();
        
        // 保存到本地存储（永久记住）
        localStorage.setItem('homeBgVisible', isBgVisible);
        
        // 更新按钮文字
        toggleBtn.textContent = isBgVisible ? '隐藏背景图' : '显示背景图';
    }

    // 5. 绑定按钮点击
    toggleBtn.addEventListener('click', toggleHomeBg);

    // 6. 快捷键 B 切换（可选）
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'b') {
            toggleHomeBg();
        }
    });
});