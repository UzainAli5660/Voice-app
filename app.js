let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voiceContainer = document.getElementById("voice-container");  // Reference new container

const speak = (text) => {
    let text_speech = new SpeechSynthesisUtterance(text);
    text_speech.volume = 1;
    text_speech.rate = 1;
    text_speech.pitch = 1;
    window.speechSynthesis.speak(text_speech);
};

const wish = () => {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 5 && hours < 12) {
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon");
    } else if (hours >= 16 && hours < 19) {
        speak("Good Evening");
    } else {
        speak("Good Night");
    }
};

window.addEventListener("load", () => {
    wish();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    console.log(transcript);
    content.innerText = transcript; 
    takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    btn.style.display = "flex"; 
    voiceContainer.style.display = "none"; 
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voiceContainer.style.display = "block";
});

const takeCommand = (message) => {
    btn.style.display = "flex";  // Ensure button reappears
    voiceContainer.style.display = "none";  // Hide gif after command is taken
    const speak = (text) => {
        console.log("Speech: " + text);  // Log the text to the console instead of speaking it
    };
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, How can I help you?");
    } else if (message.includes("who are you")) {
        speak("I'm your virtual assistant.");
    } else if (message.includes("open youtube") || message.includes("youtube")) {
        speak("Opening YouTube");
        window.open("https://youtube.com");
    } else if (message.includes("open facebook") || message.includes("facebook")) {
        speak("Opening Facebook");
        window.open("https://facebook.com");
    } else if (message.includes("open instagram") || message.includes("instagram")) {
        speak("Opening Instagram");
        window.open("https://instagram.com");
    } else if (message.includes("open google") || message.includes("google")) {
        speak("Opening Google");
        window.open("https://google.com");
    } else if (message.includes("open calculator") || message.includes("calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp.");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        speak(`Here's what I found related to ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
};
