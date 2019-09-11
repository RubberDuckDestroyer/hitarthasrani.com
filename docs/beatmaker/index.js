window.addEventListener('load', () => {
  const sounds = document.querySelectorAll(".sound");
  const pads = document.querySelectorAll(".pads div");
  const visual = document.querySelector(".visual");
  const colors = [
    "#60d394",
    "#d36060",
    "#c060d3",
    "#d3d160",
    "#1ecabc",
    "#6b69e6"
  ];
  console.log(sounds);

 //Check if sound is added
  pads.forEach((pad, index) =>{
    pad.addEventListener("click", function() {
       //Set currentTime to 0 so that you can play another tune before the first one ends. 
        sounds[index].currentTime = 0;
        sounds[index].play();
        createBubbles(index);
    });
  });

  // Function for bubbles
  const createBubbles = (index) => {
    const bubble = document.createElement("div");
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = "jump 1s ease";
    // Optimisation by removing the child after the animation ended.
    bubble.addEventListener("animationend", function(){
      visual.removeChild(this);
    })
  };
});