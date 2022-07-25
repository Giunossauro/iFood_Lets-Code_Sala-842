
const trElements = document.getElementsByTagName("tr");
const summaryElements = document.getElementsByTagName("summary");
const detailsElements = document.getElementsByTagName("details");
const dropItems = document.getElementsByClassName("drop-item");
var navbar = document.getElementById("navbar");
var dropData = document.getElementsByClassName("drop-data")[0];
var dropBtn = document.getElementById("drop-btn");
var drop = document.getElementsByClassName("drop")[0];
var radioSpans = document.getElementsByTagName("span");
 
var url = new URL(window.location.href);
var searchParams = new URLSearchParams(url.search);

if (searchParams.get('enviado') == "true"){
    alert("Contato realizado com sucesso!")
}

document.getElementsByTagName("main")[0].addEventListener("click", () => {
    navbar.className = "topnav";
    dropData.style.display = "none";
    dropData.style.top = "10vh";
    dropData.style.width = "21%";
});

var observer = new MutationObserver(function(mutations) {
    mutations.forEach((mutation) => window.location.href = "#" + mutation.target.getAttribute("id"));
});

radioSpans[0].addEventListener("click", () => {
    if (!document.getElementById("rsim").checked || !document.getElementById("rsim").hasAttribute("checked")){
        document.getElementById("rsim").setAttribute("checked","");
        document.getElementById("rnao").removeAttribute("checked");
    }
    else{
        document.getElementById("rnao").removeAttribute("checked");
    }
});

radioSpans[1].addEventListener("click", () => {
    if (!document.getElementById("rnao").checked || !document.getElementById("rnao").hasAttribute("checked")){
        document.getElementById("rnao").setAttribute("checked","");
        document.getElementById("rsim").removeAttribute("checked");
    }
    else{
        document.getElementById("rsim").removeAttribute("checked");
    }
});

for (let index = 2; index < trElements.length - 1; index++){
    trElements[index].addEventListener("click", () => window.location.href = trElements[index].getElementsByTagName("a")[0].getAttribute("href"));
    observer.observe(detailsElements[index - 2], { attributes: true });

    dropItems[index - 2].addEventListener("click", () => {
        if (dropData.style.display == "block"){
            navbar.className = "topnav";
            dropData.style.display = "none";
            dropData.style.top = "10vh";
            dropData.style.width = "21%";
        }
        else{
            dropData.style.display = "block";
            dropData.style.top = "unset";
            dropData.style.width = "100%";
        }
    });
}

const details = document.querySelectorAll("details");

details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
        details.forEach((detail) => {
            if (detail != targetDetail) {
                detail.removeAttribute("open");
            }
        });
    });
});

dropBtn.addEventListener("click", () => {
    if (dropData.style.display == "block"){
        dropData.style.display = "none";
        dropData.style.top = "10vh";
        dropData.style.width = "21%";
    }
    else if (dropData.style.display == "none" && !window.matchMedia("(max-width: 600px)").matches){
        dropData.style.display = "block";
        dropData.style.top = "10vh";
        dropData.style.width = "21%";
    }
    else{
        dropData.style.display = "block";
        dropData.style.top = "unset";
        dropData.style.width = "100%";
    }
});

dropBtn.addEventListener("mouseover", () => {
    if(navbar.className == "topnav responsive"
    && window.matchMedia("(max-width: 600px)").matches
    && navigator.maxTouchPoints > 1){
        dropData.style.display = "block";
        dropData.style.top = "unset";
        dropData.style.width = "100%";
    }
    else if (navigator.maxTouchPoints > 1){
        dropData.style.display = "block";
        dropData.style.top = "10vh";
        dropData.style.width = "21%";
    }
});

dropData.addEventListener("mouseleave", () => {
    dropData.style.display = "none";
});

document.getElementById("nav2").addEventListener("mouseover", () => {
    dropData.style.display = "none";
});

document.getElementById("nav4").addEventListener("mouseover", () => {
    dropData.style.display = "none";
});

document.getElementById("navresp").addEventListener("click", () => {
    if (navbar.className == "topnav") {
        navbar.className += " responsive";
    }
    else {
        navbar.className = "topnav";
        dropData.style.display = "none";
        dropData.style.top = "10vh";
        dropData.style.width = "21%";
    }
});

//observer.disconnect();