(function(){
    let btn = document.querySelector('button');
    let age = document.querySelector('#age');
    let login = document.querySelector('#login');
    
    btn.addEventListener('click', () => {
        let newUrl=encodeURI('page2.html?login=' + login.value + '&age=' + age.value);
        document.location.href = newUrl;
    })
})();