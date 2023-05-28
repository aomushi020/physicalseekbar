let old_data = "";
let port;

domain = location.hostname
console.log(domain);

let target = document.getElementById("center");
let button = document.createElement("button");
button.onclick = function () {
    connect();
};
button.innerHTML = "Connect";
target.appendChild(button);

function timeToString(time) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
}

if (domain == "www.youtube.com") {
    current = document.getElementsByClassName("ytp-time-current")[0];
    duration = document.getElementsByClassName("ytp-time-duration")[0];
    videoElement = document.getElementsByClassName("video-stream html5-main-video")[0];

    videoElement.addEventListener('timeupdate', function () {
        var duration = videoElement.duration;
        var current = videoElement.currentTime;
        now_data = timeToString(current) + " / " + timeToString(duration);
        if (now_data != old_data) {
            old_data = now_data;
            console.log(now_data);
            if (port != undefined) {
                current_hour = Math.floor(current / 3600);
                current_minute = Math.floor(current / 60) % 60;
                current_second = Math.floor(current % 60);
                duration_hour = Math.floor(duration / 3600);
                duration_minute = Math.floor(duration / 60) % 60;
                duration_second = Math.floor(duration % 60);
                const data = new Uint8Array([current_hour, current_minute, current_second, duration_hour, duration_minute, duration_second]);
                send(data);
            }
        }
    });
}

// connect serial port
async function connect() {
    const filter = {
        usbVendorId: 0x2E8A // Arduino SA
    };

    try {
        port = await navigator.serial.requestPort({ filters: [filter] });
        await port.open({ baudRate: 115200 });
    } catch (e) {
        // Permission to access a device was denied implicitly or explicitly by the user.
    }
}

async function send(x) {
    if (port != undefined) {
        const writer = port.writable.getWriter();
        writer.write(x);
        writer.releaseLock();
    }
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
