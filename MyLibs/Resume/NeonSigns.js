const neonSigns = document.querySelectorAll('neon-sign');

function randInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mixupInterval(el){
  const ms = randInterval(2000, 4000);
  el.style.setProperty('--interval', `${ms}ms`);
}


neonSigns.forEach(el => {
  mixupInterval(el);
  el.addEventListener('webkitAnimationIteration', function(){
    mixupInterval(el);
  });
})


