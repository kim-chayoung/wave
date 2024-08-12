history.scrollRestoration = "manual";

function resize(){
    $(".fixed_bg").each(function(){
        var this_h = $(this).height();
        var this_w = $(this).width();
        if(this_h / 9 > this_w / 16){
            $(this).find("img").css({width: "auto", height: this_h});
        }else{
            $(this).find("img").css({width: this_w, height: "auto"});
        }
    });
}
$(window).on("resize",function(){
    resize();
});
$(window).load(function(){
    resize();
 
    setInterval(function(){
            $("iframe.video").attr("src",$("iframe.video").attr("src"));

        }, 35000);    
    
    setTimeout(function(){
        $("body").removeClass("ready");
        $(".loading_cover").fadeOut(1000, function(){
            $(this).remove();
        });
    }, 1000);
});

$(function(){
    resize();
    
    $(".choice").each(function(){
        $(this).click(function(){
            $(".choice").removeClass("selected");
            $(this).addClass("selected");
            for(i=0; i<$(".choice").length; i++){
                $("#collaborations.sections.section_05").removeClass("choice_0"+(i+1));
            }
            $("#collaborations.sections.section_05").addClass("choice_0"+($(this).index()+1));
        });
    });
});