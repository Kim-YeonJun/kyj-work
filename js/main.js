//  드래그 방지, 글자드래그 방지, 미우스우측버튼 방지, 특정키 방지
window.document.oncontextmenu = () => false;
window.document.onselectstart = () => false;
window.document.ondragstart = () => false;
// window.document.onkeydown = (e) => {
//     let key = e.key || e.keyCode;
//     if(key === "F12" || key === 123){
//         console.log(key);
//         return false;
//     }
// };

//카카오 맵 api 시작
//37.563875 , 126.909335 마청단 위치
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
let lLat = 37.563875;
let lLon = 126.909335;

//지도생성 셋팅
const options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(lLat, lLon), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
};

//마커이미지 셋팅
const imageSrc = './images/pin.png'; // 마커이미지의 주소입니다    
const imageSize = new kakao.maps.Size(20, 30); // 마커이미지의 크기입니다
const imageOption = { offset: new kakao.maps.Point(10, 30) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

//마커옵션 셋팅
const markerOptions = {
    position: new kakao.maps.LatLng(lLat, lLon),
    image: markerImage
};

//커스텀 오버레이 셋팅
const coContent = '<div class="infoContent">마포청년일자리사업단</div>'
const coPosition = new kakao.maps.LatLng(lLat, lLon);
// const iwRemoveable = false;
const iwOptions = {
    position: coPosition,
    content: coContent,
    xAnchor: 0.5,
    yAnchor: 2,
};

//지도 객체생성 &객체 리턴
const map = new kakao.maps.Map(container, options);
//마커 객체생성 &객체 리턴
const marker = new kakao.maps.Marker(markerOptions);
//인포윈도우 객체생성& 객체 리턴
const customOverlay = new kakao.maps.CustomOverlay(iwOptions);

const changePosition = new kakao.maps.LatLng(lLat, lLon);
marker.setMap(map);
customOverlay.setMap(map);

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();
// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
//카카오 맵 종료

//html제어용
const rootDom = document.documentElement;

//브라우저 크기 768이하일때 작동 시작
const navbar = document.querySelector('.navbar');
const navbarLink = document.querySelectorAll('.navbar a');
const overlay_navbar = document.querySelector('.overlay_navbar');
const menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () => {
    toggleFn();
};

navbarLink.forEach((it)=>{
    it.onclick = () => {
        toggleFn();
    };
});

window.onscroll = () => {
    removeFn() ;
};

window.addEventListener('resize', () => {
    if (parseInt(window.innerWidth) > 768) {
        removeFn();
    }
    //브라우저 리사이즈시 좌표맵 중심 이동
    map.panTo(changePosition);
});

function toggleFn() {
    navbar.classList.toggle("active");
    overlay_navbar.classList.toggle("active");
}

function removeFn() {
    navbar.classList.remove("active");
    overlay_navbar.classList.remove("active");
}

//gotoHome 이벤트 시작
const gotoHomeBtn = document.querySelector('#gotoHome-btn');
let scrollFlag = true;

window.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        scrollEvent(true, "fade-out");
    } else if (window.scrollY !== 0 && scrollFlag) {
        scrollEvent(false, "fade-in");
    }
});

gotoHomeBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
});

gotoHomeBtn.addEventListener("animationend", () => {
    if (gotoHomeBtn.style.animationName === "fade-out") {
        gotoHomeBtn.style.display = "none";
    }
});

function scrollEvent(check, aniName) {
    if (scrollFlag) {
        gotoHomeBtn.style.display = "block";
    }
    gotoHomeBtn.style.animation = `${aniName} 0.2s linear forwards`;
    scrollFlag = check;
} //gotoHome 이벤트 끝

//modal youtube 페이지
const card = document.querySelectorAll('.project .box_container .box .card');
const modal = document.querySelector('.modal');
const ytPlayerBack = document.querySelector('.ytPlayer_back');
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlayer = null;

function onYouTubeIframeAPIReady() {
    // console.log('api commplete');
    ytPlayer = new YT.Player('ytPlayer', {
        height: '100%',
        width: '100%',
        videoId: ''
    });
}

ytPlayerBack.onclick = () => {
    ytPlayer.stopVideo();
    modal.style.display = 'none';
    rootDom.style.overflowY = 'visible';
} 
    
card.forEach((it) => {
    it.onclick = () => {
        ytPlayer.loadVideoById({'videoId': it.dataset.ytid});
        modal.style.display = 'flex';
        rootDom.style.overflowY = 'hidden';
    };
});

//navbar 스크롤이동
function scrollToEl(el) {
    document.querySelector('#'+el).scrollIntoView();
}

//모든 준비 완료시 실행
//window.onload = () => {};
window.addEventListener('load', () => {
    init();
});

//화면 프레임60fps를 유지하도록 처리해주는 requestAnimationFrame(callbackFn) 내장함수
const render = () => {
    window.requestAnimationFrame(render);
};

const init = () => {
    loadingScreenFn()
    slideShowImgFn();
    fontChangeFn();
    render();
};

function loadingScreenFn() {
    const loading = document.querySelector('.loading');

    //새로고침 이후 로드시 화면 맨위로 한번에 이동
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, 500);

    setTimeout(() => {
        // 지도에 컨트롤을 추가해서 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        //맵 타입[지도, 스카이뷰] 컨트롤러 추가
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        //줌버튼 컨트롤러 추가
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        //마우스휠을 사용한 확대 축소 금지
        map.setZoomable(false);
        //해당 포지견으로 맵 중심을 이동시깁니다.
        map.panTo(changePosition);

        //로딩화면 제어
        loading.style.transition = '0.3s';
        loading.style.opacity = 0;
        rootDom.style.overflowY = 'visible';

        setTimeout(() => {
            loading.style.display = 'none';
        }, 300);
    }, 700);
}

async function fontChangeFn() {

    //폰트 셋팅
    const fontArr = ['MapoAgape', 'MapoBackpacking', 'MapoDacapo', 'MapoDPP', 'MapoFlowerIsland', 'MapoGoldenPier', 'MapoHongdaeFreedom', 'MapoMaponaru', 'MapoPeacefull'];
    //폰트 Download
    for(let i = 0; i < fontArr.length; i++){
        console.log(document.fonts.check("12px MapoAgape"));
        const font = new FontFace(fontArr[i], `url(../font/${fontArr[i]}.woff) format("woff2")`);
        // wait for font to be loaded
        await font.load();
        // add font to document
        document.fonts.add(font);
    }

    //폰트 체인지 시작
        const nowFontName = document.querySelector('.now_whatis_fontname');
        const change = document.querySelector('#selectfont');
        let fontNum = 4;

        rootDom.style.fontFamily = fontArr[3];
        nowFontName.innerHTML = "서체 : " + rootDom.style.fontFamily;

        change.addEventListener('change', (e) => {
            fontNum = e.target.value;
            rootDom.style.fontFamily = fontArr[fontNum];
        });
}

function slideShowImgFn() {
    // START loading slideShowImg & text
    const imgHome = [
        "./images/home_bg2.jpg",
        "./images/home_bg3.jpg",
        "./images/home_bg4.jpg",
        "./images/home_bg5.jpg",
        "./images/home_bg6.jpg",
        "./images/home_bg7.jpg",
        "./images/home_bg8.jpg",
        "./images/home_bg9.jpg",
        "./images/home_bg1.jpg",
    ];

    const title = [
        "방송컨텐츠팀",
        "회의실",
        "개발&UIUX팀",
        "1층 사업단 사무실",
        "회의실",
        "개발&UIUX팀",
        "캐릭터 디자인팀 발표회",
        "방송컨텐츠팀 발표회",
        "캐릭터 디자인팀"
    ];
    
    const imgs = new Array();
    imgHome.forEach((it,idx)=> {
        imgs[idx] = new Image();
        imgs[idx].src = it;
    }); // End loading slideShowImg & text

    // START slideShowImg Animation
    const mySlide = document.querySelector(".mySlides");
    const imgTitle = document.querySelector(".mySlides h3");
    const img = document.querySelector('.home_bg');
    let animationChange = true;
    let nextNum = 0;
    
    setInterval(() => {
        // console.log(imgTitle,document.querySelector('.home_bg'));
        img.src = imgs[nextNum].src;
        imgTitle.innerHTML = title[nextNum];
        if(animationChange) {
            mySlide.style.animation = "fade_in_home_img1 1.5s linear forwards";
            animationChange = false;
        }
        else {
            mySlide.style.animation = "fade_in_home_img2 1.5s linear forwards";
            animationChange = true;
        }
        nextNum++;
        if (nextNum >= imgHome.length) {
            nextNum = 0;
        }
    }, 5000); // END slideShowImg Animation

    // START loading imgInterView 
    const imgInterView = [
        "./images/interView_Manager.jpg",
        "./images/interview_PM.jpg",
        "./images/interview_CdLd.jpg",
        "./images/interview_BcLd.jpg",
        "./images/interview_DevUIUXLd.jpg",
        "./images/interView_DevFront.jpg"
    ];

    imgInterView.forEach((it,idx)=> {
        document.querySelectorAll('.interview_img')[idx].src = it;
    });
}