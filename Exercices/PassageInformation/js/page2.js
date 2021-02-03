(function() {
    let dataOutput = document.getElementById('dataOutput');
    if ((location.href.split('?login=')[1] !== undefined)) {
        let loginValue = decodeURI(location.href.split('?login=')[1].split('&age=')[0]);
        let ageValue = decodeURI(location.href.split('?login=')[1].split('&age=')[1]);
        dataOutput.innerHTML = "Informations reçues <br>" + "Login: " + loginValue + "<br>Age: " + ageValue;
    }
})();