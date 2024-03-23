const img = document.getElementById('randImage');
const scoreDiv= document.getElementById('score')
const sound1 = new Audio('./sound/sound_1.wav');
const sound2 = new Audio('./sound/sound_2.wav');
const sound3 = new Audio('./sound/sound_3.wav');

let intervalTime=1000
let interval
let score=0
let imgWidth=200
let isStart=false

startButton.addEventListener('click', (e) => {
    e.stopPropagation();
    startButton.style.display = 'none';
    isStart=true
    interval = setInterval(() => {
        img.style.display = 'block';
        let scaleValue = 1 + (Math.random() - 0.5) * 0.4;
        img.style.transform = `scale(${scaleValue})`;
        img.style.top = Math.random() * (window.innerHeight - img.offsetHeight - 10) + 'px';
        img.style.left = Math.random() * (window.innerWidth - img.offsetWidth - 10) + 'px';
        sound1.play();
    }, intervalTime);
});

img.addEventListener('click', (e) => {
    clearInterval(interval);
    img.style.display = 'none';
    score+=1
    scoreDiv.textContent='分数: '+score
    sound3.play();
    showModal();
});

img.addEventListener('dragstart',(e)=>{
    e.preventDefault()
})

function showModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    document.body.addEventListener('click', (e) => {
        if (!isStart)return
        if (e.target != img) {
            sound2.play();
        }
    });
    
    handleClick=(e) => {
        e.stopPropagation();
        modal.style.display = 'none';
        if (interval) {
            clearInterval(interval);
            intervalTime-=50
            intervalTime=intervalTime>=500?intervalTime:500
            if(intervalTime==800){
                intervalTime=600
            }
            if(intervalTime==500){
                if(imgWidth>=20){
                console.log(imgWidth)
                imgWidth=imgWidth-5
                img.style.width=imgWidth+'px'
                }
            }
        }
        interval = setInterval(() => {
            img.style.display = 'block';
            let scaleValue = 1 + (Math.random() - 0.5) * 0.2;
            img.style.transform = `scale(${scaleValue})`;
            img.style.top = Math.random() * (window.innerHeight - img.offsetHeight- 10)  + 'px';
            img.style.left = Math.random() * (window.innerWidth - img.offsetWidth - 10) + 'px';
            sound1.play();
        }, intervalTime);
        modal.removeEventListener('click', handleClick);
    }
    modal.addEventListener('click',handleClick);
}
