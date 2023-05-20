old_data = "";

domain = location.hostname
console.log(domain);

function timeToString(time) {
    return Math.floor(time/60) +":"+ ("0" + Math.floor(time%60)).slice(-2)
}

if(domain=="www.youtube.com"){
    current = document.getElementsByClassName("ytp-time-current")[0];
    duration = document.getElementsByClassName("ytp-time-duration")[0];
    videoElement = document.getElementsByClassName("video-stream html5-main-video")[0];

    var time = videoElement.duration;

    videoElement.addEventListener('timeupdate', function() {
        now_data = timeToString(videoElement.currentTime) + " / " + timeToString(videoElement.duration);
        if (now_data != old_data) {
            old_data = now_data;
            console.log(now_data);
        }
    });

}
// else if(domain=="www.amazon.co.jp"){
//     var tag = undefined
//     var interval = setInterval(findTarget, 1000);

//     function findTarget(){
//         tag = document.getElementsByClassName(".atvwebplayersdk-timeindicator-text")[0]
//         if (tag != undefined){
//             clearInterval(interval);
//             console.log(tag.innerHTML);
//             var mo = new MutationObserver(function() {
//             });
//             mo.observe(tag, config);
//         }
//     };
// }