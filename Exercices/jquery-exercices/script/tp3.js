"use strict";
$(function() {
    $(".provisoire").html("<a href='#' title='Provisoire'>(p)</a>");
    $("td").filter(function() {
        return $(this).text().trim() == "";
    }).html("n.d").addClass("non-defini");
    $(".non-defini").parent()
                    .children(":first-child")
                    .append("<a href=\"#\" title=\"Incomplet\">(i)</a>");
}); 