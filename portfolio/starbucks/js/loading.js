/*Add {opacity:0} style to body element.*/
var max_delay_time = 2000,
    loading_bg_color = "#007042",
    loading_style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: "+loading_bg_color+"; z-index: 9999;",

    progress_bar_container_bg_color = "#fff",
    progress_bar_container_width = "25%",
    progress_bar_container_height = "6px",
    progress_bar_container_style = "position: absolute; top: 50%; left: 50%; width: "+progress_bar_container_width+"; height: "+progress_bar_container_height+"; background: "+progress_bar_container_bg_color+"; border-radius: 100px; transform: translate(-50%, -50%); overflow: hidden;",

    progress_bar_color = "#113722",
    progress_bar_style = "position: absolute; top: 0; left: 0; width: 0%; height: 100%; background: "+progress_bar_color+"; border-radius: inherit;",

    progress_font = "Poppins",
    progress_font_size = "14px",
    progress_font_color = "#fff",
    progress_font_style = "position: absolute; top: 52%; left: 50%; width: 50px; margin-left: -25px; font-family: \""+progress_font+"\"; font-size: "+progress_font_size+"; color: "+progress_font_color+"; text-align: center;",
    
    progress_update,
    is_stop = false;
function counter(a, b, c){
    a.each(function () {
        $(this).prop('Counter', b).stop().animate({
            Counter: c
        }, {
            duration: 500,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now)+"%");
            }
        });
    });
}
$(function(){
    $("body").append("<div class='loading_cover' style='"+loading_style+"'><div class='progress_bar_container' style='"+progress_bar_container_style+"'><div class='progress_bar' style='"+progress_bar_style+"'></div></div><div class='progress_text' style='"+progress_font_style+"'>0%</div></div>").animate({opacity:1}, 250);
    var progress_percent = 0;
    setTimeout(function(){
        progress_update = setInterval(function(){
            if(is_stop){
                clearInterval(progress_update);
                $(".progress_bar").stop().animate({width: "100%"}, 500);
                counter($(".progress_text"), $(".progress_text").text().replace(/%/g,""), 100);
                setTimeout(function(){
                    $(".loading_cover").fadeOut(1000, function(){
                        $(this).remove();
                    }); 
                    $("body").css({overflow:"visible"});
                }, 350);  
            }else{            
                const random_number = Math.floor(Math.random() * 2);
                $(".progress_bar").stop().animate({width: progress_percent + "%"}, 50);
                progress_percent += random_number;
                counter($(".progress_text"), $(".progress_text").text().replace(/%/g,""), progress_percent);
            }
        }, 50);
    }, 250);
});
$(window).load(function(){
    setTimeout(function(){
        is_stop = true; 
    }, max_delay_time);
});