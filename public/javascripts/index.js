/*$(document).ready(function () {
    $(".password_rem_lab_class").click(function () {
        $(".password_rem_div").toggle();
    });
});*/

/*function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log(profile.getAuthInstance);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const id_token = googleUser.getAuthResponse().id_token;

    fetch('users/google', {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: 'token=' + id_token, // Coordinate the body type with 'Content-Type'	
        headers: new Headers({
            'User-agent': 'Mozilla/4.0 Custom User Agent',
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = '/user/login';
            } else {
                signOut();
                window.location.href = '/?msg=nologgin';
            }

        })
        .catch(error => console.error(error))
}

function signOut() {
    gapi.load('auth2', function () {
        gapi.auth2.init().then(() => {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            }).catch((error) => {
                console.log('User NOT signed out.');
            });
        })
    });
}*/