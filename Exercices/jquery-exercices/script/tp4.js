"use strict";
$(function () {
    $("table").hide();
    let allLinks = $("ul.onglets>li>a");
    allLinks.each(function () {
        $(this).click(function () {
            let target = $(this).attr("href").replace("#", "");
            $("table").filter(function () {
                return $(this).attr("id") == target;
            }).show();
            $("table").filter(function () {
                return $(this).attr("id") != target;
            }).hide();
        });
    });
    var $loupe = $("<div id=\"loupe\"></div>").hide()
        .appendTo($("#conteneur"));
    $("td").hover(function () {
        $loupe.show().text($(this).text());
    }, function () {
        $loupe.hide();
    });
    $("table").each(function () {
        var $table = $(this);
        $table.find("td").hover(
            function () {
                var $td = $(this);
                var headers = $td.attr("headers");
                var $memeLigne = $td.closest("tr").children();
                $memeLigne.addClass("on");
                var $memeColonne = $table.find("[headers=" + headers + "]");
                $memeColonne.addClass("on");
                var $teteColonne = $table.find("#" + headers);
                $teteColonne.addClass("on");
                $td.addClass("active");
            },
            function () {
                $table.find("*").removeClass("active").removeClass("on");
            }
        )
    });
});