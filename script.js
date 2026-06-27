function showPage(pageId){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

const quizData = [
{
    no: 1,
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    answer: "O(log n)"
},
{
    no: 2,
    question: "Which data structure follows LIFO?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    answer: "Stack"
},
{
    no: 3,
    question: "Which traversal visits Root → Left → Right?",
    options: ["Inorder", "Postorder", "Preorder", "Level Order"],
    answer: "Preorder"
},
{
    no: 4,
    question: "What is the worst-case time complexity of Bubble Sort?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
    answer: "O(n²)"
},
{
    no: 5,
    question: "Which data structure is used for BFS (Breadth First Search)?",
    options: ["Stack", "Queue", "Heap", "Tree"],
    answer: "Queue"
}
];
let currentQuestion = 0;
let score = 0;

function loadQuestion(){

    const q = quizData[currentQuestion];

    document.getElementById("questionNo").innerHTML =
        `Question ${currentQuestion + 1} of ${quizData.length}`;

    document.getElementById("question").innerHTML =
        q.question;

    const optionsDiv =
        document.getElementById("options");

    optionsDiv.innerHTML = "";

    q.options.forEach(option => {

        const btn =
            document.createElement("button");

        btn.innerHTML = option;

        btn.onclick = () =>
            selectAnswer(btn, option);

        optionsDiv.appendChild(btn);

    });

    document.getElementById("nextBtn").style.display =
        "none";
}

function selectAnswer(button, selected){

    const correct =
        quizData[currentQuestion].answer;

    const buttons =
        document.querySelectorAll("#options button");

    buttons.forEach(btn => btn.disabled = true);

    if(selected === correct){

        button.classList.add("correct");

        score++;

    }else{

        button.classList.add("wrong");

        buttons.forEach(btn => {

            if(btn.innerHTML === correct){

                btn.classList.add("correct");

            }

        });

    }

    document.getElementById("nextBtn").style.display =
        "block";
}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion < quizData.length){

        loadQuestion();

    }else{

        document.getElementById("questionNo").innerHTML =
            "Quiz Completed";

        document.getElementById("question").innerHTML =
            `🎉 Your Score: ${score}/${quizData.length}`;

        document.getElementById("options").innerHTML = "";

        document.getElementById("nextBtn").style.display =
            "none";
    }
}

loadQuestion();

async function getJoke() {

    const jokeDiv = document.getElementById("joke");

    // Change image every time
    document.getElementById("jokeImage").src =
        "https://picsum.photos/800/400?random=" + new Date().getTime();

    jokeDiv.innerHTML = "Loading...";

    try {

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        const data = await response.json();

        jokeDiv.innerHTML = `
            <h3>${data.setup}</h3>
            <p>${data.punchline}</p>
        `;

    } catch (error) {

        jokeDiv.innerHTML = "Failed to load joke.";

    }
}

async function getWeather() {

    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const apiKey = "YOUR_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    result.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            result.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        result.innerHTML = `
            <div style="text-align:center;">
                <h2>${data.name}, ${data.sys.country}</h2>

                <img
                    src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                    alt="Weather Icon">

                <h3>${data.main.temp} °C</h3>

                <p><b>Condition:</b> ${data.weather[0].main}</p>
                <p><b>Description:</b> ${data.weather[0].description}</p>
                <p><b>Feels Like:</b> ${data.main.feels_like} °C</p>
                <p><b>Humidity:</b> ${data.main.humidity}%</p>
                <p><b>Pressure:</b> ${data.main.pressure} hPa</p>
                <p><b>Wind Speed:</b> ${data.wind.speed} m/s</p>
            </div>
        `;

    } catch (error) {

        result.innerHTML = `
            <p style="color:red;">
                Failed to fetch weather data.
            </p>
        `;

        console.log(error);

    }

}