document.getElementById("addBtn").addEventListener("click", function() {
   var addContent = document.getElementById('addInput')
   var textContent = document.getElementById('board')
   // 获取输入框内容
    var inputContent =addContent.value;

    // 创建新的信息元素
    var newInfo = document.createElement('div');
    newInfo.textContent = inputContent;

    // 将新信息元素添加到board中
    textContent.appendChild(newInfo);
saveContent(inputContent);
    // 清空输入框内容
    addContent.value = '';
});

document.getElementById("removeBtn").addEventListener("click", function() {
// 获取board元素
var board = document.getElementById('board');

// 获取输入框元素
var input = document.getElementById('addInput');

    // 获取输入框内容
    var inputContent = input.value;

    // 遍历board内的所有信息元素
    var infoElements = board.getElementsByTagName('div');
    for (var i = 0; i < infoElements.length; i++) {
       if (infoElements[i].textContent === inputContent) {
          board.removeChild(infoElements[i]);
       }
    }

    // 清空输入框内容
    input.value = '';

});

// 页面加载时检查localStorage中是否有保存的内容
window.addEventListener('load', function() {
    var savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
        var newInfo = document.createElement('div');
        newInfo.textContent = savedContent;
        board.appendChild(newInfo);
    }
});

  function saveContent(content) {
            $.ajax({
                type: 'POST',
                url: '/save_content',
                data: {content: content},
                success: function(response) {
                    console.log('Content saved successfully!');
                }
            });
        }