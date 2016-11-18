jQuery(function($) {
    "use strict";
    
    $("body").on("click",".toggleOptionPanel",function () {
        $("body").toggleClass("quickSectionActive");
    });

    $("body").on("click",".accordion > header > a",function (e) {
        e.preventDefault();
        var $this = $(this),
            p = $this.parents(".accordion"),
            sibAcc = p.siblings(".accordion");
        sibAcc.find(".accordion-content").slideUp();
        p.find(".accordion-content").slideToggle();
    });

    $("body").on("click",".input-block",function(e){
        var $this = $(this).find("label");
        $this.hide();
        $this.siblings(".sib").focus();
    });
    $("body").on("focusout",".input-block input,.input-block textarea",function(){
        var $this = $(this);
        if($this.val()===""){
            $this.siblings("label").show();
        }
    });

    $('.custom-select select').on('change', function() {
        var p = $(this).parent(".custom-select");
        p.find('span').html($(this).find('option:selected').text());
    });

    $("body").on("click",".next-wt",function (e) {
        e.preventDefault();
        var $this = $(this),
            target = $(".walk-through.active").index();
        if($(".walk-through").length == target+2) {
            $this.hide();
        }
        if($(".walk-through").length > target+1) {
            $(".walk-through-links li").eq(target + 1).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
            $(".walk-through").eq(target + 1).addClass("active").siblings().removeClass("active");
        }else{
            $this.fadeOut();
        }
    });
    $("body").on("click",".walk-through-links a",function (e) {
        e.preventDefault();
        var $this = $(this),
            targetIndex = $this.parent().index(),
            $length = $(".walk-through-links li").length;
        $this.addClass("active").parent().siblings().find("a").removeClass("active");
        $(".walk-through").removeClass("active");
        $(".walk-through").eq(targetIndex).addClass("active");
        if($length > targetIndex+1) {
            $(".next-wt").fadeIn();
        }
        if($length == targetIndex+1) {
            $(".next-wt").fadeOut();
        }

    });
    $("body").on("click",".nav-trigger",function (e) {
        e.preventDefault();
        $(".main-nav").fadeToggle();
    });
    $("body").on("click",".triggerSwap",function (e) {
        e.preventDefault();
        var $this = $(this),
            p = $this.parents(),
            target = $this.attr("href");
        p.removeClass("active");
        $(target).addClass("active");
    });

    var collapseTimer;
    collapseControls();
    function collapseControls(){ 
        collapseTimer=setInterval(function() {   //calls click event after a certain time
            if(!$("body").hasClass("skipAutoCollapse")){
                $("body").removeClass("quickSectionActive");
            }
            clearTimeout(collapseTimer);
        }, 2000);
    }
  
    $( "#loginForm" ).submit(function( event ) {
        var formData = {};
        $("#loginForm").find("input[name]").each(function (index, node) {
            formData[node.name] = node.value;
        });
        $.ajax({
          type: "POST",
          url: "/api/login",
          data: formData,
          success: function(data) {
            addToken(data.token);
            console.log(data.token);
            window.location.href = "/home";
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("please enter valid credentials");
             console.log(errorThrown);
          }
        });

        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    $( "#signupForm" ).submit(function( event ) {
        var formData = {};
        $("#signupForm").find("input[name]").each(function (index, node) {
            formData[node.name] = node.value;
        });
        $.ajax({
          type: "POST",
          url: "/api/register",
          data: formData,
          success: function(data) {
            addToken(data.token);
            console.log(data.token);
            window.location.href = "/home";
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
             alert("Email already registered");
             console.log(errorThrown);
          }
        });

        event.preventDefault();
        event.stopPropagation();
        return false;
    });
    if(!isUserLoggedIn())
    {
        $("#logoff").css("display","none");
    }
    $("#logoff").click(function() {
        logOff();
    })
});
function addToken(token) {
    localStorage.setItem("xDocToken", token);
}
function getToken(){
    return localStorage.getItem("xDocToken");
}
function logOff(){
    localStorage.removeItem("xDocToken");
    window.location.href = "/";
}
function isUserLoggedIn (){
    if (localStorage.getItem("xDocToken") === null) {
      return false;
    }
   return true;
}
