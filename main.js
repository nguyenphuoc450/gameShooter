let board = document.querySelector('.board');
let plane = document.querySelector('.plane');
let score = document.querySelector('.score');
let n = 0; 

// Bắt sự kiện di chuyển của máy và bắn ra đạn
window.addEventListener('keydown',function(event){
    let planeLeft = parseInt(window.getComputedStyle(plane).getPropertyValue('left'));
    if(event.key == 'ArrowLeft' && planeLeft > 0){
        plane.style.left = planeLeft - 10 + "px";
    }
    if(event.key == 'ArrowRight' && planeLeft <= 460){
        plane.style.left = planeLeft + 10 + "px";
    }

    if(event.key == 'ArrowUp' || event.keyCode == 32){
        let bullet = document.createElement('div');
        bullet.classList.add('bullets');
        board.appendChild(bullet);

        // Di chuyển  viên đạn và xử lý khi bắn trúng mục tiêu
        let moveBullet = setInterval(function(){

            // xử lý khi bắn trúng mục tiêu
            let aliens = document.querySelectorAll('.aliens');
            for(let i =0 ; i < aliens. length ; i ++) {
                let alien = aliens[i];
                let alienBound = alien.getBoundingClientRect();
                let bulletBound = bullet.getBoundingClientRect();

                if(bulletBound.left >= alienBound.left && bulletBound.right <= alienBound.right && bulletBound.top <= alienBound.top && bulletBound.bottom <= alienBound.bottom){
                    alien.parentElement.removeChild(alien);
                    score.innerHTML = `Điểm : ${n+=1}`;
                }
            }


            // Di chuyển viên đạn
            let bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue('bottom'));
            bullet.style.left = planeLeft  + 'px';
            bullet.style.bottom = bulletBottom + 3 + 'px';
        });
    }
});

// Tạo ra quái vật
let generateAliens = setInterval(function(){
    let alien = document.createElement('div');
    alien.classList.add('aliens');
    // let alienLeft = parseInt(window.getComputedStyle(aliens).getPropertyValue('left'));
    alien.style.left = Math.random()*450 + 'px';
    board.appendChild(alien);
},1500);


// Tạo sự di chuyển của các quái vật và xử lý khi quái vật chạm đáy (xử thua)
let moveAliens = setInterval(function(){
    let aliens = document.querySelectorAll('.aliens');
    for(let i=0; i < aliens.length ; i++ ) {
        let alien = aliens[i];
        let alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue('top'));
        alien.style.top = alienTop + 20 + 'px';

        // Xử lý thua
        if (alienTop >= 460){
            alert('Bạn đã thua');
            clearInterval(moveAliens);
            window.location.reload();
        }
    }
},450);