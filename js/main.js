{
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


    //모든 준비 완료시 실행
    window.addEventListener('load', () => {
        const loading = document.querySelector('.loading');

        //폰트 체인지 시작
        const fontArr = ['MapoAgape', 'MapoBackpacking', 'MapoDacapo', 'MapoDPP', 'MapoFlowerIsland', 'MapoGoldenPier', 'MapoHongdaeFreedom', 'MapoMaponaru', 'MapoPeacefull'];

        const rootDom = document.querySelector('.html');
        const nowFontName = document.querySelector('.now_whatis_fontname');
        const change = document.querySelector('#selectfont');
        let fontNum = 4;

        rootDom.style.fontFamily = fontArr[3];
        nowFontName.innerHTML = "서체 : " + rootDom.style.fontFamily;

        change.addEventListener('change', (e) => {
            fontNum = e.target.value;
            rootDom.style.fontFamily = fontArr[fontNum];
        });

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });

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
            document.documentElement.style.overflowY = 'visible';

            setTimeout(() => {
                loading.style.display = 'none';
            }, 300);
        }, 700);
    });

    //브라우저 크기 768이하일때 작동 시작
    const navbar = document.querySelector('.navbar');
    const navbarLink = document.querySelectorAll('.navbar a');
    const overlay_navbar = document.querySelector('.overlay_navbar');
    const menuBtn = document.querySelector('#menu-btn');

    menuBtn.onclick = () => {
        console.log("menuBtn onclick");
        navbar.classList.toggle("active");
        overlay_navbar.classList.toggle("active");
    };

    navbarLink.forEach((it)=>{
        it.onclick = () => {
            console.log("it onclick");
            navbar.classList.toggle("active");
            overlay_navbar.classList.toggle("active");
        };
    });

    window.onscroll = () => {
        navbar.classList.remove("active");
        overlay_navbar.classList.remove("active");
    };

    window.addEventListener('resize', () => {
        if (parseInt(window.innerWidth) > 768) {
            navbar.classList.remove("active");
            overlay_navbar.classList.remove("active");
        }
        //브라우저 리사이즈시 좌표맵 중심 이동
        map.panTo(changePosition);
    });

    //홈 화면 이미지 변화 애니메이션 시작
    const mySlides = document.querySelectorAll(".mySlides");
    let nextNum = 1;

    mySlides[0].style.display = "block";
    setInterval(() => {
        for (i = 0; i < mySlides.length; i++) {
            mySlides[i].style.display = "none";
        }
        mySlides[nextNum].style.animation = "fade_in_home_img 2s linear";
        mySlides[nextNum].style.display = "block";
        nextNum++;
        if (nextNum >= mySlides.length) {
            nextNum = 0;
        }
    }, 5000);

    //맨 위로 올라가는 버튼관려 이벤트 시작
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
    } //맨 위로 올라가는 버튼관려 이벤트 끝

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

    window.onclick = (e) => {
        if (e.target === ytPlayerBack) {
            ytPlayer.stopVideo();
            modal.style.display = 'none';
            rootDom.style.overflowY = 'visible';
            return;
        } 
        
        card.forEach((it) => {
            if(e.target.parentNode === it){
                // ytPlayer.cueVideoById({'videoId': it.dataset.ytid});
                ytPlayer.loadVideoById({'videoId': it.dataset.ytid});
                modal.style.display = 'flex';
                rootDom.style.overflowY = 'hidden';
                console.log('rootDom',rootDom);
                return;
            }
        });
    };

    function scrollToEl(el) {
        document.querySelector('#'+el).scrollIntoView();
    }

}