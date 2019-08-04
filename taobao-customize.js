// ==UserScript==
// @name         Home - Taobao Customize
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.taobao.com/item.htm?*
// @match        https://detail.tmall.com/item.htm?*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// ==/UserScript==

var enable_floating_bar = true;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.fixed_bar { position:fixed; top: 40px; left: 5px; z-index: 999999991; padding: 0px; border: 1px solid #333333;}');
addGlobalStyle('.f_header, .f_content { font-size: 16px; font-family: "Microsoft JhengHei"  }');
addGlobalStyle('.f_header { width: 80px; display: table-cell}');
addGlobalStyle('.f_content { width: 160px; display: table-cell}');
addGlobalStyle('.f_bar_1 { padding: 4px; height: 24px; background-color: #ffcc66; color: #000;}');
addGlobalStyle('.f_bar_2 { padding: 4px; height: 24px; background-color: #996633; color: #fff}');
addGlobalStyle('#f_search_item_id { width: 120px; height: 22px;  border:1px; padding: 0px; margin: 0px; font-size: 14px; color: #734d26}');
addGlobalStyle('#f_search_icon { width: 22px; height: 22px; border:1px; padding: 0px; margin: 0px; font-size: 14px;  color: #cc6600; cursor: pointer}');


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

(function() {
    'use strict';

    $(document).ready(function() {
        // Quantity Input
        $(".mui-amount-input, .tb-stock input").css({
            'color' : 'darkred',
            "font-weight" : "bolder",
            "font-size" : "24px",
            'min-width' : '64px'
        });


        if (enable_floating_bar){
            $('body').append(`
<div class="fixed_bar">
<div style="display: block;">
<div class="f_bar_1 f_header">物品編號：</div>
<div class="f_bar_1 f_content"><span id="current_item_id"></span></div>
</div>
<div style="display: block">
<div class="f_bar_2 f_header">查詢編號：</div>
<div class="f_bar_2 f_content">
<input type="text" id="f_search_item_id" style="display: inline-block">
<button id="f_search_icon" style="display: inline-block">🔍</button>
</div>
</div>
</div>`);

            $("#f_search_icon").click(function(){
                let search_item_id = $("#f_search_item_id").val().trim();
                if (search_item_id.length <=0){
                    alert("未輸入編號");
                    return;
                }
                let item_url = `https://item.taobao.com/item.htm?id=${search_item_id}`;
                window.location.href = item_url;

            })

            $('#f_search_item_id').on("keypress", function(e) {
                /* ENTER PRESSED*/
                if (e.keyCode == 13) {
                    $("#f_search_icon").trigger("click");
                }
            });

             $("#current_item_id").html(getUrlVars()["id"]);
        }



        // Fixed
        $(window).scroll(function(){
            if ($(this).scrollTop() > 135) {
                // $('#custom_bar').addClass('fixed');
            } else {
                // $('#custom_bar').removeClass('fixed');
            }
        });

    });

})();
