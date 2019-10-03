const thumbnails = [
	"https://i.ibb.co/d41zXxL/loveit.png",
	"https://i.ibb.co/gWsKN7x/nailedit.png",
	"https://i.ibb.co/HY7yXx5/welcome.png",
	"https://i.ibb.co/xspCXrp/lol.png",
	"https://i.ibb.co/48V3TB0/face.png",
];

function fakeapi() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(thumbnails);
        }, 3000);
    });
}

function loadData() {
    const scrollUl = document.getElementById("scrollUl");
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
    fakeapi()
        .then(resp => {
            const frag = document.createDocumentFragment();
            for (let r of resp) {
                const li = document.createElement('li');
                li.classList.add("scroll-li");
                
                const img = document.createElement('img');
                img.src = r;
                img.classList.add("scroll-img");

                li.appendChild(img);
                frag.appendChild(li);
            }
            scrollUl.append(frag);
            loader.style.display = "none";
        });
}

function load() {
    const scrollUl = document.createElement('ul');
    scrollUl.classList.add("scroll-ul");
    scrollUl.id = "scrollUl";

    const parent = document.getElementById("parent")
    parent.prepend(scrollUl);

    scrollUl.addEventListener("scroll", function(event) {
        if (scrollUl.scrollTop + scrollUl.clientHeight >= scrollUl.scrollHeight) {
            throttle(loadData, 2000)();
        }
    });

    loadData();
}

function throttle(func, interval) {
    return (...args) => {
        let prevTime = this.now;
        this.now = +new Date();

        if (!prevTime || now - prevTime >= interval) {
            func(...args);
            prevTime = now;
        }
    }
}

document.addEventListener("DOMContentLoaded", load);