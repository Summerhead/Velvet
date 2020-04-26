function saveCookie(name, value) {
    setCookie(name, value);
    setCartNumber();
    console.log(document.cookie);
}

function addCookie(name, value) {
    var cookie = getCookie(name);

    if (cookie) {
        cookie = JSON.parse(cookie);
        value = JSON.parse(value);
        cookie.push(value);

        cookie = JSON.stringify(cookie);

        saveCookie(name, cookie);
    } else {
        value = JSON.parse(value);
        value = [value];
        value = JSON.stringify(value);
        saveCookie(name, value);
    }
}

function setCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    });
}

// function read_cookie(name) {
//     var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
//     result = JSON.parse(result[1])
//     console.log(result);
//     for (let i of result) {
//         console.log(i);
//     }
//     result && (result = JSON.parse(result[1]));
//     return result;
// }