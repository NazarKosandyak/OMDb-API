let getSearch = document.querySelector('.btn')
let getInpuyVal = document.querySelector('.name')
let getClose = document.querySelector('.close')
let getDiv = document.querySelector('.main').children
let getMainDiv = document.querySelector('.main')
let getAllBtn = document.querySelectorAll('.more')

getSearch.addEventListener('click', function () {
    let XHR = new XMLHttpRequest()

    let valueName = getInpuyVal.value
    XHR.open("GET", 'http://www.omdbapi.com/?s=' + valueName + '&apikey=19813c35', false)
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
            const DATA = JSON.parse(XHR.responseText)
            console.log(DATA);
            des(DATA)
        }
    }
    XHR.send()
})


document.querySelector('.clear').addEventListener('click', function () {
    getInpuyVal.value = ''
})

let ch = getDiv.children

function des(data) {
    let innerDiv;
    let myMovie = data.Search

    console.log(myMovie);
    let j = 0
    for (j; j < getDiv.length; j++) {
        innerDiv = getDiv[j].children
        innerDiv[0].src = myMovie[j].Poster
        innerDiv[1].textContent = myMovie[j].Title
        innerDiv[2].textContent = myMovie[j].Type
        innerDiv[3].textContent = myMovie[j].Year
    }
    getMainDiv.classList.remove('hide')
}
let g = 0;
let title;

getMainDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains('more')) {
        let getParent = e.target.parentElement.children
        for (g; g < getParent.length; g++) {}
        title = getParent[1].textContent
        getSearch.disabled = true
        document.body.style.backgroundColor = 'rgba(180, 180, 180,0.9)'
        let requestInfo = new XMLHttpRequest()
        requestInfo.open('GET', 'http://www.omdbapi.com/?t=' + title + "&apikey=19813c35", false)
        requestInfo.onreadystatechange = function () {
            if (requestInfo.readyState === 4 && requestInfo.status === 200) {
                const getData = JSON.parse(requestInfo.responseText)
                getInfo(getData)

                console.log(getData);
            }
        }
        requestInfo.send()
    }


})

let getInfoBlock = document.querySelector('.info')

function getInfo(myData) {
    getInfoBlock.classList.remove('hide')
    getMainDiv.classList.add('hide')
    getClose.classList.remove('hide')
    let getPoster = document.querySelector('.posterInfo')
    getPoster.src = myData.Poster
    let getmyTitle = document.querySelector('.titleMovie')
    getmyTitle.textContent = title
    let getRatedMore = document.querySelector('.typeMovie')
    getRatedMore.textContent = ` ${myData.Rated } ${ myData.Year}  ${ myData.Type} ${ myData.Genre}`
    let getDescription = document.querySelector('.description')
    getDescription.textContent = myData.Plot
    let writtedBy = document.querySelector('.first')
    writtedBy.textContent = myData.Writer
    let directedBy = document.querySelector('.second')
    directedBy.textContent = myData.Director
    let statting = document.querySelector('.third')
    statting.textContent = myData.Actors
    let BoxOffice = document.querySelector('.fourth')
    BoxOffice.textContent = myData.BoxOffice
    let Awards = document.querySelector('.fifth')
    Awards.textContent = myData.Awards
    let getRating = myData.Ratings
    let Ratings = document.querySelector('.sixth')
    for (let elem of getRating) {
        Ratings.textContent += `${elem.Source} ${elem.Value}`
    }

}


getClose.addEventListener('click', function () {
    getInfoBlock.classList.add('hide')
    getMainDiv.classList.remove('hide')
    getClose.classList.add('hide')
    document.body.style.backgroundColor = '#fff'
    getSearch.disabled = false
})