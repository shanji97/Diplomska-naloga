$(window).scroll(function () {
    let scroll = $(window).scrollTop();
    
    if(scroll > 0){
        $(".to_top").show();
    }else{
        $(".to_top").hide();
    }
});

$(document).on("click", ".to_top", function(){
    $("html").animate({ scrollTop: 0 });
});

$(document).on("click", ".box i.fa-caret-down, .box i.fa-caret-up", function(){
    let t = $(this);
    
    if($(this).hasClass("fa-caret-down")){
        $(this).parent().siblings(".box_content").slideUp(300, function(){
            t.removeClass("fa-caret-down").addClass("fa-caret-up");
        });
    }else{
        $(this).parent().siblings(".box_content").slideDown(300, function(){
            t.removeClass("fa-caret-up").addClass("fa-caret-down");
        });
    }
});

$(document).on("click", ".remember_me i", function(){
    let checkbox = $('[name="remeber_me"]');
    
    if(checkbox.prop("checked") === false){
        checkbox.prop("checked", true);
        $(".remember_me i").removeClass("fa-square").addClass("fa-check-square");
    }else{
        checkbox.prop("checked", false);
        $(".remember_me i").removeClass("fa-check-square").addClass("fa-square");
    }
});

$(document).on("click", ".hamburger", function(){
    if($(this).hasClass("is-active")){
        $(this).removeClass("is-active");
        $(".mobile_menu").slideUp(300);
    }else{
        $(this).addClass("is-active");
        $(".mobile_menu").slideDown(300);
    }
});

$(document).on("click", ".fa-trash", function(){
    let id = $(this).attr("data-id");
    let title = $(this).attr("data-title");
    let author = $(this).attr("data-author");
    let delete_type = $(this).attr("data-delete");
    
    if(delete_type === "topic"){
        html = `Ali res želite izbrisati temo <b>${title}</b> avtorja <b>${author}</b>?
                <div class="buttons"><button class="cancel">Prekliči</button> <button class="delete" data-id="${id}" data-delete="${delete_type}">Da, izbriši</button></div>`;
    }
    
    open_popup(html);
});

$(document).on("click", ".popup_content button.cancel", function(){
    close_popup();
});

$(document).on("click", ".popup_content button.delete", function(){
    let id = parseInt($(this).attr("data-id"));
    let delete_type = $(this).attr("data-delete");
    
    if(delete_type === "topic"){
        if(id === 1){
            $(`.topic [data-id=${id}]`).parent().slideUp(300, function(){
                $(this).remove();
            });
        }else{
            let topic = $(`.topic [data-id=${id}]`).parent();
            topic.removeClass().addClass("topic locked");
            topic.find("div:nth-child(1) i").removeClass().addClass("fas fa-lock").attr("title", "Zaklenjena tema");
            topic.find(".fa-trash").remove();
        }
    }
     
    close_popup();
});

function open_popup(html){
    $("html").append(`<div class="popup_bg"></div>`);
    $("html").append(`<div class="popup_content"></div>`);
    
    $(".popup_bg").fadeIn(300, function(){
        $(".popup_content").html(html).fadeIn(300);
    });
}

function close_popup(){
    $(".popup_content").fadeOut(300, function(){
        $(".popup_bg").fadeOut(300, function(){
            $(".popup_content").remove();
            $(".popup_bg").remove();
        });
    });
}