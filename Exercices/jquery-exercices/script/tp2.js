$(".provisoire").attr("title", "Provisoire");
$(function () {
    $("td:empty").text("n.d").addClass("non-defini");
    $("td[title*='non significatif']").addClass("non-significatif");
});