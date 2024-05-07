document.addEventListener('DOMContentLoaded', function() {
    const button4 = document.getElementById('button4');
    if (button4) {
        button4.addEventListener('click', addContent);
    } else {
        console.error('Button with ID "button4" not found.');
    }
});

function addContent() {
    var con = document.getElementById("con_board");
    con.innerHTML = ''; // Clear existing content
    con.innerHTML += `
        <p>1.在路口交通管理中，交通信号灯是最重要的指示工具，在红灯停、绿灯行的原则下，驾驶员应严格遵守信号灯的指示，不得闯红灯。</p>
        <p>2.在路口交通管理中，行车道的选择非常重要，驾驶员应根据自己的行驶方向和目的地选择正确的车道，并在不同车道之间变换时注意提前打灯示意。</p>
        <p>3.在路口交通管理中，遇到交通拥堵或者交通事故时，驾驶员应保持冷静，按照交通警察或交通标志的指示，有序地排队等待通行。</p>
        <p>4.在路口交通管理中，遇到行人过马路时，驾驶员应礼让行人，停车等待行人通过，不得在行人过马路时强行通行。</p>
        <p>5.在路口交通管理中，遇到紧急情况时，驾驶员应立即采取相应的应急措施，如紧急制动、变道避让等，确保自己和他人的安全。</p>
           <div class="tit" style="">管理照片墙</div><div class="photo-wall">
         <span class="j_1"></span>
                <span class="j_2"></span>
                <span class="j_3"></span>
                <span class="j_4"></span>
                   
                      <div class="boxnav" style="width: 100%;height: 100%">
            <img src="../static/images/traff4.png" alt="Photo 1" class="active" style="width: 100%;height: 100%">
            <img src="../static/images/traff2.jpg" alt="Photo 2" >
            <img src="../static/images/traff3.jpg" alt="Photo 3"></div>
        </div>
        <div>
       
        <button id="prev" style="display:inline;width: 150px;height: 40px;font-size: medium;margin-left: 300px; cursor: pointer;">Previous</button> 
        <button id="next" style="display:inline;width: 150px;height: 40px;font-size: medium;margin-left: 300px;  cursor: pointer;">Next</button>
        <input type="file" id="upload" accept="image/*" style="display:inline;width: 150px;height: 40px;font-size: medium;margin-left: 20px; cursor: pointer;">
    </div>`;

    // Add event listeners for next and previous buttons
    document.getElementById('next').addEventListener('click', function() {
        changePhoto(1);
    });

    document.getElementById('prev').addEventListener('click', function() {
        changePhoto(-1);
    });

     document.getElementById('upload').addEventListener('change', function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Uploaded Photo';
            var photoWall = document.querySelector('.photo-wall .boxnav');
            photoWall.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

function changePhoto(direction) {
    const images = document.querySelectorAll('.photo-wall img');
    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });

    images[currentIndex].classList.remove('active');
    let nextIndex = (currentIndex + direction + images.length) % images.length;
    images[nextIndex].classList.add('active');
}