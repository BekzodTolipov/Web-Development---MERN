alert('register')
$('#password-one, #password-two').on('keyup', function () {
    if($('#password-one').val() === $('#password-two').val()) {
        $('password-message').css('visibility', 'hidden');
        $('#password-two').css('text-color', 'green');
        $('#password-one').css('text-color', 'green');
    } else {
        $('password-message').css('visibility', 'visible');
        $('password-message').css('visibility', 'visible');
        $('#password-two').css('text-color', 'red');
        $('#password-one').css('text-color', 'red');
    }
});