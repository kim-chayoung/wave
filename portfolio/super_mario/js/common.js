    //화면전환시 애니메이션을 위한 각 섹션별 hide클래스 제거
function remove_hide(i){
        $(".fullsection.full"+i).removeClass("hide");
    }


function moving_underbar(gnbindex){ //네비 메뉴 언더바 이동
    var nav_length = 0,
        this_length = $("ul.nav li").eq(gnbindex).outerWidth(true) / 2 - $("ul.nav li.coin").outerWidth(true) / 2;
    
    for(var i=0; i<(gnbindex); i++){
        nav_length += $("ul.nav li").eq(i).outerWidth(true);
    }
    $("ul.nav li.coin").css({left: nav_length + this_length}).addClass("spin");//코인 애니메이션 작동 
    setTimeout(function(){
        $("ul.nav li.coin").removeClass("spin");
    }, 750);
}




    var change_speed = 750;
    var release_times, times;
    // 사이드 퀵버튼 클릭 이동
    function moving_sections(gnbindex,length){ //화면전환 중에 다른 화면 전환 불가        
        $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * gnbindex)}, change_speed);
        $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
        $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");
        moving_underbar(gnbindex);

        $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
        $(".pagination b").text(gnbindex+1);
        remove_hide(gnbindex+1);
    }
    function quickClick(){
        $(".quick li, ul.nav li").click(function(){
            var gnbindex = $(this).index();
            var length = 0;
            for(var i=1; i<(gnbindex+1); i++){
                length+=$(".full"+i).height();
            }
            //if($("body").find("#fullpage:animated").length >= 1) return false;
            moving_sections(gnbindex,length);
            $(".quick li").css({"visibility": 'visible'})
            return false;
        }).mousedown(function(){
            $(".quick_inner").css({ opacity: 0});
        }).mouseup(function(){
            setTimeout(function(){
                $(".quick_inner").css({ opacity: 1});
            }, change_speed);
        });
    }
    function fullset(){
        var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
        $(".pagination span").text(pageindex);
        for(var i=1;i<=pageindex;i++){
            $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
        }
        
        /*왼쪽도트 추가 231018*/
        $(".fullsection").each(function(n){//좌우 수평 도트생성
		var subcon_index = $(this).find(".full_sub").length; //페이지 갯수 찾기(0~7)
            
		for(var i=0; i<subcon_index; i++){
			$(".fullsection").eq(n).find(".quick_inner").find("ul").append("<li></li>");
            //페이지 .full_sub 갯수만큼 .fullsection 안에 .quick_inner에 li추가
            }
        });
        /*----------------------*/
        
        $(".quick").css({marginTop: $(".quick").height()/2});
        $("#fullpage .quick ul li:first-child, #header ul.nav li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
        
        function moving_page(){
            clearTimeout(times);
            times = setTimeout(function(){
                $("body").removeClass("locked");
                $(".quick_inner").css({ opacity: 1});
            }, change_speed);
            
            $(".quick li").css({"visibility": 'visible'});
            $(".quick_inner").css({ opacity: 0});
            //event.preventDefault();
            if(!$("body").hasClass("locked")){
                $("body").addClass("locked");
                var page = $(".quick ul li.on");
                //console.log(page.index()+1);  // 현재 on 되어있는 페이지 번호
                if($("body").find("#fullpage:animated").length >= 1){
                    return false;
                }
                
                if (event.wheelDelta > 0 || event.detail < 0) {//마우스 휠을 위로
                    var before = page.index();
                    var pagelength=0;
                    for(var i=1; i<(before); i++){
                        pagelength += $(".full"+i).height();
                    }
                    if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                        page = page.index()-1;                        
                        moving_sections(page, pagelength);
                    }else{
                        /*alert("첫번째 섹션 입니다.");*/
                    }	
                }else{ // 마우스 휠을 아래로	
                    var nextPage = parseInt(page.index()+1); //다음페이지번호
                    var lastPageNum = parseInt($(".quick ul li").length); //마지막 페이지번호
                    //현재페이지번호 <= (마지막 페이지 번호 - 1)
                    if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                        var pagelength=0;
                        for(var i = 1; i<(nextPage+1); i++){ 
                            //총 페이지 길이 구하기
                            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                            pagelength += $(".full"+i).height();
                        }
                        moving_sections(nextPage, pagelength);
                    }else{ // 현재 마지막 페이지 일때는
                       /* alert("마지막 섹션 입니다!");*/
                    }
                }                      
            }else{
                return false;
            }
            clearTimeout(release_times);
            release_times = setTimeout(function(){            
                $("body").removeClass("locked");
            }, change_speed);
        }
        
        window.addEventListener("mousewheel", moving_page, {passive: false});
        window.addEventListener("DOMMouseScroll", moving_page, {passive: false});    
        
        $(window).resize(function(){ 
            //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
            var resizeindex = $(".quick ul li.on").index()+1;
            var pagelength = 0;
            for(var i = 1; i<resizeindex; i++){ 
                //총 페이지 길이 구하기
                //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                pagelength += $(".full"+i).height();
            }
            $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
            full_sub_resize();
        });
    }

    function full_sub_inner(){
        //full_sub_inner 함수를 선언함
        //변수는 var let const

        $(".quick_inner").css({"margin-left": - $(".quick_inner li").outerWidth()});//.quick_inner 인 ul이 통으로 li의 너비만큼 이동.
        $("#fullpage .fullsection .quick_inner li:first-child").addClass("on");
        
        $(".quick_inner li, .sp_list").click(function(){
            var $this = $(this).parents(".fullsection").find(".quick_inner").find("li").eq($(this).index());
            var subindex = $(this).index() + 1;
            var length = 0;
            for(var i=1; i<subindex; i++){
                length += $(".fullsection").width();
            }
            var quick_w = $this.outerWidth();
            for(var i=2; i<subindex+1; i++){
                quick_w += $this.outerWidth(true);
            }
            $this.parents(".fullsection").find(".full_sub_con").stop().animate({"left": -length + "px"}, change_speed).attr("data-index", subindex);
            $this.parents(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed);
            $this.parents("ul").find("li").removeClass("on").eq(subindex-1).addClass("on");
            $(".sp_list").removeClass("on").eq($(this).index()).addClass("on");


            var quickindex = $this.parents(".fullsection").index();
            $(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'});
            $this.parents(".fullsection").find(".full_sub").eq(subindex-1).removeClass("hide");
            
            var $parents_full = $(this).parents(".fullsection");
if(subindex == 1){
    $parents_full.find(".btn_left").addClass("disable");
    $parents_full.find(".btn_right").removeClass("disable");
}else if (subindex == $(this).parent("ul").find("li").length){
    $parents_full.find(".btn_left").removeClass("disable");
    $parents_full.find(".btn_right").addClass("disable");
}else{
    $parents_full.find(".btn_left").removeClass("disable");
    $parents_full.find(".btn_right").removeClass("disable");
}
        });
    }

    var prnts_w, prnts_h;
    function full_sub_resize(){
        $(".full_sub").each(function(){
            prnts_w = $(this).parents(".fullsection").width();
            prnts_h = $(this).parents(".fullsection").height();
            $(this).css({width: prnts_w, height:prnts_h});
        });
        $(".full_sub_con").each(function(){
            $(this).width(prnts_w * $(this).find(".full_sub").length);
        });
    }
    function full_sub_sizing(){
        full_sub_resize();
        full_sub_inner();
        
        
        $(".btn_left, .btn_right").each(function(){
            if($(this).hasClass("btn_left")){ //btn_left를 가지고 있다면
		   $(this).addClass("disable"); //disable 클래스 추가
		}
            
            $(this).click(function(){
                var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
                var move_w = prnts_w;
                if($(this).hasClass("btn_left")){
                    if(sub_counter > 1){
                        sub_counter -=1;
                        if(sub_counter == 1){
						$(this).addClass("disable");//disable 클래스 추가
					}
                    }$(this).parent().find(".btn_right").removeClass("disable");//btn_right를 찾아서 disable 클래스 제거
                }else{
                          $(this).parent().find(".btn_left").removeClass("disable");//btn_left를 찾아서 disable 클래스 제거
				if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){//.fullsection에서 .full_sub의 갯수보다 sub_counter가 작으면
					sub_counter +=1;//sub_counter값에 +1을 해준다.
					if(sub_counter == $(this).parents(".fullsection").find(".full_sub").length){ //sub_counter가 full_sub의 개수랑 똑같다면
						$(this).addClass("disable"); //disable 클래스 추가
					}
				}
			}
                move_w = move_w * (sub_counter-1) * -1;
                $(this).parent(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
                
			    var quick_w = $(this).parent(".fullsection").find(".quick_inner ul li").outerWidth();
                
                for(var i=2; i<sub_counter+1; i++){
				quick_w += $(this).parent(".fullsection").find(".quick_inner ul li").eq(sub_counter - 1).outerWidth(true);
			}
			$(this).parent(".fullsection").find(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed);
			
			var quickindex = $(this).parents(".fullsection").index();
			$(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'});
			$(this).parent(".fullsection").find(".quick_inner ul li").removeClass("on").eq(sub_counter-1).addClass("on");
                
            });
        });  
    }

    
$(function(){
    fullset();
    quickClick();
    full_sub_sizing();
    
    setInterval(function(){//비디오 90초마다 반복재생
    $(".video").attr("src",$(".video").attr("src"));
}, 90000);  


    var $mouse_tracker_p, $mouse_tracker_c;    
    $mouse_tracker_p = $(".mouse_tracker.pointer");
    $mouse_tracker_c = $(".mouse_tracker.cell");
    $("body").on("mousemove", function(event){
        $mouse_tracker_p.css({ left: event.clientX, top: event.clientY});
        $mouse_tracker_c.stop().animate({left: event.clientX, top: event.clientY}, 200, "easeOutCirc");
    });

    var $lists = $("#visual ul.nav li");
    for(i=0; i<$lists.length; i++){
        $(".box").eq(i).attr("data-text",$lists.find("a").eq(i).text());
        $("ul.dot_nav > li").eq(i).attr("title",$lists.find("a").eq(i).text());
    }




    var old_mario_position = 0;
    var now_mario_position = 0;
    $(".tab_menu ul.tab_btn li").each(function(){/*탭 버튼 셀렉트*/

        $(this).click(function(){
            $(".tab_menu ul.tab_btn li").removeClass("selected");
            $(this).addClass("selected");                        
            $(".tab_menu ul.tab_content").removeClass("selected").eq($(this).index()).addClass("selected");

            var nav_length = 0,//마리오 제발 움직여라
                this_length = $(".tab_menu ul.tab_btn li").eq($(this).index()).outerWidth(true) / 2 - $(".tab_menu ul.tab_btn li.run_sb img").outerWidth(true) / 2;
            for(var i = 0; i < $(this).index(); i++){
                nav_length += $(".tab_menu ul.tab_btn li").eq(i).outerWidth(true);
            }
            now_mario_position = nav_length;
            if(now_mario_position < old_mario_position){
                $(".tab_menu ul.tab_btn li.run_sb").addClass("back");
            }
            $(".tab_menu ul.tab_btn li.run_sb").css("margin-left", nav_length).addClass("run");            
            old_mario_position = nav_length;
            setTimeout(function(){
                $(".tab_menu ul.tab_btn li.run_sb").removeClass("run").removeClass("back");
            }, 750);
        });

    });
    $('ul.film_list').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 700,

    });

var mario_jump = $('#world_view.full2 .full_con li.cells:nth-child(2)');//마리오 점프하기

    mario_jump.on('transitionend', function() {

        $(this).addClass('bounce-animation');
    });


});














   




