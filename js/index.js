function typeEffect(element, speed) {
    var text = $(element).text();
    $(element).html('');

    var i = 0;
    var timer = setInterval(function () {
        if (i < text.length) {
            $(element).append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

$(document).ready(function () {
    var speed = 75;
    var delay = $('#text').text().length * speed + speed;
    typeEffect($('#text'), speed);
});


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
