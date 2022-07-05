let btnInicio = document.querySelector('.start-quiz-btn')
let container = document.querySelector('.container')
let ques_figure = document.querySelector('.ques-figure')
let question = document.querySelector('.ques-text')
let option_list = document.querySelector('.option-div')
let lineacorriendo = document.querySelector('.time_line')
let timeCount = document.querySelector('.time-left')//checar
let next_ques_btn = document.querySelector('.next-ques-btn')
let topQuestionCouting = document.querySelector('.question-counter')
const result = document.querySelector('.result-div')
let play_again_btn = document.querySelector('.replay-quiz-btn')
let questions = {}
let correctIcon = ' <div class="icon correct-icon"><i class="fa-solid fa-check"</i></div>'
let incorrectIcon = ' <div class="icon wrong-icon"><i class="fa-solid fa-xmark"</i></div>'

let question_count = 0
let ques_number = 1
let timeValue = 10
let widthValue = 0
let score = 0
let counter
let countLine


document.addEventListener('DOMContentLoaded', ()=>{
    obtenerDatos()
})

const obtenerDatos = async () =>{
    const preguntas = await fetch('../preguntas.json')
    const data = await preguntas.json() 
    questions = data
}


btnInicio.addEventListener('click', ()=>{
    container.style.display = 'block'
    mostrarPreguntas(0)
    contadorPregunta(1)
    iniciarReloj(10)
    lineaTiempo(0)
    btnInicio.style.display = 'none'
})

next_ques_btn.onclick = () => {
    if(question_count < questions.length - 1){
        question_count++
        ques_number++
        mostrarPreguntas(question_count)
        contadorPregunta(ques_number)
        clearInterval(count)
        iniciarReloj(timeValue)
        clearInterval(countLine)
        lineaTiempo(widthValue)
        next_ques_btn.classList.add('click-dosable')
    }else{
        showResult()
    }
}

function mostrarPreguntas(index){
    let imagen_tag = `<img class="ques_img" src="${questions[index].imagen}"></img>`
    let question_tag = `<span>`+questions[index].id + `.`  + questions[index].pregunta + `<span>`
    let option_tag = `<div class="option"><span>`+questions[index].opciones[0]+'</span></div>'+`<div class="option"><span>`+questions[index].opciones[1]+`</span></div>`+
    `<div class="option"><span>`+questions[index].opciones[2]+`</span></div>`+`<div class="option"><span>`+questions[index].opciones[3]+`</span></div>`
    ques_figure.innerHTML = imagen_tag
    question.innerHTML = question_tag
    option_list.innerHTML = option_tag
    const option = option_list.querySelectorAll('.option')
    for(let i = 0 ; i < option.length; i++){
        option[i].setAttribute('onclick','optionSelect(this)')
    }
}

function optionSelect(answer){
    clearInterval(count)
    clearInterval(countLine)
    const user_answer = answer.textContent
    let correctAns = questions[question_count].respuesta
    let Alloption = option_list.children.length
    if(user_answer === correctAns){
        score += 1
        answer.classList.add('correct')
        answer.insertAdjacentHTML("beforeend", correctIcon)
    }else{
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML("beforeend", incorrectIcon)
        for(i=0; i < Alloption; i++){
            if(option_list.children[i].textContent === correctAns){
                option_list.children[i].setAttribute("class","option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", correctIcon)
            }
        }
    }

    for(let i = 0;i < Alloption; i++){
        option_list.children[i].classList.add('disable')
    }
    next_ques_btn.classList.remove('click-disable')
}

function contadorPregunta(index){
    let totalQuesCount = `<span>`+index+`<span> de </span><span>`+questions.length+`</span> Preguntas</span>`
    topQuestionCouting.innerHTML = totalQuesCount
}


function iniciarReloj(time){
    count =setInterval(timer, 1000)
    function timer(){
        timeCount.innerHTML = time
        time--
        if(time < 9){
            timeCount.textContent = "0" + timeCount.textContent
        }
        if(time < 0){
            clearInterval(count)
            timeCount.innerHTML = "00"

            let correctAns = questions[question_count].respuesta
            let Alloption = option_list.children.length

            for(i = 0; i < Alloption; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct")
                    option_list.children[i].insertAdjacentHTML("beforeend", correctIcon)
                }
            }
            for(let i = 0; i < Alloption; i++){
                option_list.children[i].classList.add('disabled')
            }
            next_ques_btn.classList.remove('click-disable')
        }
    }
}

function lineaTiempo(time){
    countLine = setInterval(timer,28)
    function timer(){
        time += 1
        lineacorriendo.style.width = time + "px"
        if(time > 399){
            clearInterval(countLine)
        }
    }
}

function showResult(){
    container.style.display = 'none'
    result.style.display = 'block'
    let scoreText = document.querySelector('.score')
    if(score == 10){
        let scoreTag = `<span>WoW! puntaje perfecto `+ score + ` de ` + questions.length+`<span>`
        scoreText.innerHTML = scoreTag
    }else if(score > 7){
        let scoreTag = `<span>Buen puntaje `+ score + ` de ` + questions.length+`<span>`
        scoreText.innerHTML = scoreTag
    }else if(score > 5){
        let scoreTag = `<span>Bien tu puntaje es `+ score + ` de ` + questions.length+`<span>`
        scoreText.innerHTML = scoreTag
    }else{
        let scoreTag = `<span>No fue tu mejor dia tu puntaje es `+ score + ` de ` + questions.length+`<span>`
        scoreText.innerHTML = scoreTag
    }
}

