let butweather = document.getElementById('butweather')
butweather.onclick = function (){f1()}
let sendbut = document.getElementById('sendbut')
sendbut.onclick = f2


function f1(id=524901){
    let key = 'f1bbc900ee2e50dc66bebd83f2f0a9f3'
    // let id = 524901
    let req
    if (window.XMLHttpRequest){
        req = new XMLHttpRequest()
    } else{
        req = new ActiveXObject("Microsoft.XMLHTTP")
    }

    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id='
        + id +'&appid=' + key + '&lang=ru&units=metric')

    req.onload = function (){
        if (req.status === 200){
            let newobj = JSON.parse(req.response)
            console.log(newobj)
            forresponce(newobj)
        } else {
            console.log('neok')
        }

    }

    req.send()
}


function forresponce(resp){
    let k1 = resp.name
    let k2 = resp.main.temp
    let k3 = resp.wind.speed
    let k4 = resp.weather[0].description
    console.log(k1,k2,k3,k4)
    let divresponce = document.getElementById('divresponce')
    divresponce.innerHTML = '<h3>Город: ' + k1 + '</h3>' +
                            '<h3>Температура: ' + k2 + 'С</h3>' +
                            '<h3>Скорость ветра: ' + k3 + 'м/с</h3>' +
                            '<h3>Погода: ' + k4 + '</h3>'
}



function f2(){
    let key = 'f1bbc900ee2e50dc66bebd83f2f0a9f3'
    let name = document.getElementById('gorod').value

    let req
    if (window.XMLHttpRequest){
        req = new XMLHttpRequest()
    } else{
        req = new ActiveXObject("Microsoft.XMLHTTP")
    }

    req.open('GET', 'https://api.openweathermap.org/data/2.5/find?q='
        + name +'&appid=' + key + '&lang=ru&units=metric&type=like')


    req.onload = function (){
        if (req.status === 200){
            spisok = JSON.parse(req.response)
            console.log(spisok)
            let otvet = document.getElementById('divgoroda')
            let newid
            stroka='<table>'
            for (i=0; i<spisok.list.length; i++){
                newid = spisok.list[i].id
                stroka +=   '<tr>'+'<th>' + spisok.list[i].id + '</th>'+
                            '<th>'+spisok.list[i].name+'</th>'+
                            '<th>'+spisok.list[i].sys.country+'</th>'+
                            '<td><button onclick="f1(' + newid + ')">Погода</button></td>'+
                            '</tr>'
            }
            otvet.innerHTML=stroka+'</table>'
        } else {
            console.log('neok')
        }

    }

    req.send()
}