var toggleHindi = function () {
    $('#hindi').css('opacity', '1');
    $('#english').css('opacity', '0.3');
};

var toggleEnglish = function () {
    $('#hindi').css('opacity', '0.3');
    $('#english').css('opacity', '1');
};


$('#hindi').click(toggleHindi);
$('#english').click(toggleEnglish);


var fullView = function () {
    $('#editorspane').css('grid-template-columns', '49.75% 0.5% 49.75%');
}

var jsView = function () {
    $('#editorspane').css('grid-template-columns', '100% 0% 0%');
}

var pyView = function () {
    $('#editorspane').css('grid-template-columns', '0% 0% 100%');
}
