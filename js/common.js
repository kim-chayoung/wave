
history.scrollRestoration = "manual"; /*새로고침 시 스크롤 최상단*/

var w_w, w_h, re_resize_timer;

$(function(){
    let ticking = false;
    var current_scroll,wh;
    function show_whatever(el, current_scroll, wh){ 
    var el_offset_t = el.offset().top; 
    if(current_scroll > el_offset_t - wh){
        el.parent().removeClass("wait_scroll");
    }       
    }
    
    function doSomething(scrollPos) {
        var dwh =  $(window).height();
        current_scroll = scrollPos;
        $(".show_trigger").each(function(){
            show_whatever($(this), current_scroll, dwh);
        }); 
        if(scrollPos > 0){
            $("body").addClass("scrolled");
        }else{
            $("body").removeClass("scrolled");
        }
    }
    document.addEventListener('scroll', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });
 
    
    
    setTimeout(function(){
        $("html").removeClass("loading");
            setTimeout(function(){
                $("html").removeClass("not_yet");
            }, 4500);
    }, 750);
    
            

    
    
     $("#header ul.nav li").each(function(){
        $(this).click(function(){
            $("#header ul.nav li").removeClass("selected");
            $(this).addClass("selected");                        
        });
    });

//로딩  
var loadings;
function loading_start(){
    loadings = setInterval(function(){
        $(".loading_cover");
    }, 500);
}
function loading_end(){
    clearInterval(loadings);
    setTimeout(function(){
        $(".loading_cover").fadeOut(1000);
    }, 500);
    setTimeout(function(){
//        $(".loading_text").text("complete");
        $(".l_text").text("complete").addClass("done").fadeOut(1500, function(){
        });
    });
    setTimeout(function(){          
        $("body").addClass("done").removeClass("loading");
        setTimeout(function(){
            $(".loading_cover").remove();
        }, 2000);
    }, 1500);
}
 
 
$(window).load(function(){
    setTimeout(function(){
        loading_end();
    }, 3500);
});
 
    
$("#works.section_04 .width_con .gallery .v_con.four_con li.cells").each(function(){
         
        $(this).click(function(){
           
            $("html,body").addClass("design_locked");
             
            $(".design_cover .design_con .box .large_box.large_img").html(""); 
            $("#works.section_04 .width_con .design_cover").addClass("on");
            $("#works.section_04 .width_con .open_design_cover").addClass("on");
            
            var list="",
                name = $(this).attr("data-name"),
                num = $(this).attr("data-num");
            
            for(i=1; i<=num; i++){
                list+= "<img src='img/portfolio/portfolio_"+name+"_"+i+".jpg'>"
            }
            $("#works.section_04 .width_con .design_cover .design_con .box .large_box").append(list);
        });
    });

    $("#works.section_04 .width_con .design_cover .design_con .close_btn, #works.section_04 .width_con .open_design_cover").click(function(){
        $("html,body").removeClass("design_locked");
        $("#works.section_04 .width_con .design_cover").toggleClass("on");
        $("#works.section_04 .width_con .open_design_cover").toggleClass("on");
        $("#works.section_04 .width_con .design_cover .design_con .box .large_box").scrollTop(0);
    });    
    
    
    
    
    
    $("#works.section_04 .width_con .gallery .v_con.four_con li.cells").each(function(){
                    $(this).click(function(){
                        $("body").addClass("lock_scroll");
                        $(".gallary_popup").addClass("on");
                        var port_no = $(this).attr("data-name");
                        /*if(port_no < 10){
                            port_no = "0" + port_no;
                        }*/
                        var port_count = $(this).attr("data-num");
                        if(port_count == undefined){
                            port_count = 1;
                        };
                        var port_zero_count = port_count;
                        var port_list = "";
                        for(i=1; i<=port_count; i++){
                          /*  if(i < 10){
                                i = "0" + i;
                            }*/
                            port_list += "<img class='origin_img' src='img/portfolio/portfolio_"+port_no+"_"+i+".jpg'>";
                        }
                        $(".popup_viewer").html(port_list).scrollTop(0);
                    });
                });
                $(".gallary_popup .gallary_popup_bg, .btn_close").click(function(){
                    $(".gallary_popup").removeClass("on");
                    $("body").removeClass("lock_scroll");
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

