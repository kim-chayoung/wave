
history.scrollRestoration = "manual"; /*새로고침 시 스크롤 최상단*/







var w_w, w_h, re_resize_timer;

function scroll_effect(sc_y){/*스크롤 했을 때 스크롤 값에 따라 블러와 투명도 효과 적용*/
    if(sc_y <= 0){
        $("#visual.sections.section_01 iframe").attr("style","");
    }else if(sc_y <= 1080){
        $("#visual.sections.section_01 iframe").css({marginTop: sc_y / 2, opacity: (1080 - sc_y) / 1080, filter: "blur("+ (sc_y / 1080 * 10) +"px)"});
    }
}

function resize(){/*화면 크기가 변경될 때 이미지의 크기 변경.
16:9 비율을 기준으로 이미지의 크기를 조절 만약 요소의 높이가 16:9 비율보다 크면 이미지의 높이를 요소의 높이에 맞추고 너비는 자동으로 조절. 그렇지 않으면 이미지의 너비를 요소의 너비에 맞추고 높이는 자동으로 조절*/
    clearTimeout(re_resize_timer);
    re_resize_timer = setTimeout(function(){ 
        $(".fixed_bg").each(function(){
            var this_h = $(this).height();
            var this_w = $(this).width();
            if(this_h / 9 > this_w / 16){
                $(this).find("img").css({width: "auto", height: this_h});
            }else{
                $(this).find("img").css({width: this_w, height: "auto"});
            }
        });
        window.addEventListener("DOMContentLoaded", function (ev) {/*화면 크기에 따라 헤더의 네비게이션 부분의 스타일을 변경.
        만약 창의 너비가 1000미만이면, 헤더 내의 네비게이션 부분의 높이를 창의 높이로 설정. 그렇지 않으면, 해당 네비게이션 부분의 스타일을 초기화하고, 전체 페이지에서 "open_menu" 클래스를 제거함.*/
            const { innerHeight } = window;
        });
        w_w = $(window).width();
        w_h = innerHeight;
        if(w_w < 1000){
            $("#header.section_00 .width_con .nav_con").height(w_h);
        }else{
            $("#header.section_00 .width_con .nav_con").attr("style","");
            $("html").removeClass("open_menu");
        }
    }, 100);
}

$(window).on("resize",function(){
    resize();
});
$(window).load(function(){
    resize();
});

$(function(){
    resize();
    
    var $menu = $("#menu.sections.section_02 .width_con ul.v_con.two_con li.cells ul.v_con.four_con li.cells");
    $menu.addClass("hide");

    var $at_home = $("#at_home.sections.section_04 .width_con ul.g_con li.cells");
    $at_home.addClass("hide");

    var $merchandise = $("#merchandise.sections.section_07 .width_con .v_con.four_con li.cells");
    $merchandise.addClass("hide");   
    
    

    let ticking = false;
    var current_scroll,wh;
    function show_whatever(el, current_scroll, wh){ 
    var el_offset_t = el.offset().top; 
    if(current_scroll > el_offset_t - wh){
        el.parent().removeClass("wait_scroll");

        if(el.parent().hasClass("section_02")){
            setTimeout(function(){
                $menu.each(function(i){
                    setTimeout(function(){
                        $menu.eq(i).removeClass("hide");
                    }, 75 * i);
                });
            }, 1200);
        }

        if(el.parent().hasClass("section_04")){
            setTimeout(function(){
                $at_home.each(function(i){
                    setTimeout(function(){
                        $at_home.eq(i).removeClass("hide");
                    }, 150 * i);
                });
            }, 1200);
        }

        if(el.parent().hasClass("section_07")){
            setTimeout(function(){
                $merchandise.each(function(i){
                    setTimeout(function(){
                        $merchandise.eq(i).removeClass("hide");
                    }, 250 * i);
                });
            }, 1200);
        }

        el.remove();
    }    
    }
    function doSomething(scrollPos) {
        var dwh =  $(window).height();
        current_scroll = scrollPos;
        $(".show_trigger").each(function(){
            show_whatever($(this), current_scroll, dwh);
        }); 
    }
    document.addEventListener('scroll', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scroll_effect(window.scrollY);
                doSomething(window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });
 
    
    $("#header.section_00 .width_con .nav_con > i, .nav_cover, #header.section_00 .width_con .nav_con ul li a").click(function(){
        if(w_w < 1000){
            resize();
            $("html").toggleClass("open_menu");
        }
    }); 
    
   $(window).scroll(function(){
        SE = $(document).scrollTop();
        if(SE >= 500){
            $("#header").addClass("small");
        }else{
            $("#header").removeClass("small");
        }
    });
    $("#header").hover(function(){
        $(this).removeClass("small");
    });
    
    setInterval(function(){/* 비디오 10초마다 반복재생*/
        $(".video").attr("src",$(".video").attr("src"));
    }, 10000);    
    
    
    
    setTimeout(function(){
        $("html").removeClass("loading");
            setTimeout(function(){
                $("html").removeClass("not_yet");
            }, 4500);
    }, 750);
    
            
    $(".tab_menu ul.tab_btn li").each(function(){/*탭 버튼 셀렉트*/
        $(this).click(function(){
            $(".tab_menu ul.tab_btn li").removeClass("selected");
            $(this).addClass("selected");                        
            $(".tab_menu ul.tab_content").removeClass("selected").eq($(this).index()).addClass("selected");
        });
    });
    
    
     $("#header ul.nav li").each(function(){
        $(this).click(function(){
            $("#header ul.nav li").removeClass("selected");
            $(this).addClass("selected");                        
        });
    });
    
    
    $(".card").each(function(){/*카드 뒤집기.
    해당 카드가 클릭되면 클릭된 .card 요소에 flip 클래스가 이미 있으면, 그 클래스를 제거,flip 클래스가 없으면 모든 .card 요소에서 flip 클래스를 제거. 클릭된 .card 요소에만 flip 클래스를 추가함.
.card 요소를 클릭할 때마다 해당 카드가 뒤집힌 상태로 바뀌며 동시에 다른 카드들은 원래 상태로 돌아감*/
        $(this).hover(function(){
            if($(this).hasClass("flip")){
                $(this).removeClass("flip");
            }else{
                $(".card").removeClass("flip");
                $(this).addClass("flip");
            }
        });
    });
    
    $(".store_list").each(function(){/*스토어 리스트 선택시 백그라운드 이미지 변경*/
        $(this).click(function(){
           var store_num = $(this).attr("data-store");
            $("#store").css({background: "url(img/img_store_"+ store_num +".webp) 50% 50% no-repeat", backgroundSize: "cover"});
        });
    });
    

    $(".input_email").keyup(function(event){
        if(event.keyCode == 13){

        }
    });

    $("ul.v_con.four_con.reseve_list").slick({
                                  //@ : 디폴트값
            autoplay: false,       //자동넘김 켬/끔@
            autoplaySpeed: 1500,  //자동넘김 타이밍 3000@
            arrows: true,         //이전,다음 켬@/끔
            //centerMode: true      //컨텐츠 중앙 모드
            dots: true,           //도트표시기 켬/끔@
            infinite: true,       //무한반복 켬@/끔
            slidesToScroll: 2,    //한번에 넘길 갯수 1@ (swipeToSlide 가 true일 경우 비활성화됨)
            slidesToShow: 4,      //한줄에 나올 갯수
            swipeToSlide: false,   //한번에 여러게 넘김 켬/끔@
            responsive: [
                {
                    breakpoint: 999,
                    settings: {
                        slidesToShow: 3,
                        dots: true,
                        arrows: true,
                    }
                },
                {
                    breakpoint: 599,
                    settings: {
                        dots: true,
                        arrows: true,
                        slidesToShow:2
                    }
                }
            ]

    });
});



/*
$(".aaa).on("click", function){
    정적 + 동적요소 제어(아래에 비하여 조금 느림)
});

$(".aaa).click"(function(){
    정적요소제어
});


정적요소: 이미 적혀있는 태그들
동적요소: 외부에 의하여 추가된 태그들


each로 한번 더 감싸 준 이유
제이쿼리 옛날버전 (1버전)에서는 클릭이벤트가 동시다발적으로 실행되기에 이치로 한번 감싸고 디스 사용
>오래전에 만든 코드도 수정할 상황이 생길수 있으니
*/

