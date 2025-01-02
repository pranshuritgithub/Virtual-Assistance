let btn = document.querySelector('#btn');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');

// Function to speak text using the SpeechSynthesis API
function speak(text) {
    console.log("Attempting to speak:", text);
    
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = 'en-GB';
    

    window.speechSynthesis.speak(textSpeak);
}

// Function to greet based on the time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning Boss");
    } else if (hours >= 12 && hours < 17) {
        speak("Good Afternoon sir");
    } else if (hours >= 17 && hours < 20) {
        speak("Good Evening sir");
    } else {
        speak("Good night sir");
    }
}

// Event listener for the button to wish the user
btn.addEventListener('click', () => {
    //speak("initializing shipra")
    wishMe();
});

// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-GB';

    // Event handler for when speech recognition results are available
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase(); // Get the recognized text
        console.log("Recognized speech: " + transcript);

        content.innerText = transcript;
        takeCommand(transcript);
        recognition.stop(); // Stop recognition after a single result 
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        speak("Sorry, I didn't catch that. Please try again.");
    };

    recognition.onstart = ()=>{
        console.log('speech are started')

        
        btn.style.display = "none";
        voice.style.display = "block";
    }

    recognition.onend = ()=>{
        console.log('speech are end')

        
    btn.style.display = "flex"; // Show button again
    voice.style.display = "none"; // Hide voice indicator
    }

    // Start recognition on button click
    btn.addEventListener('click', () => {
        recognition.start();

    });

} else {
    console.error('Speech recognition not supported in this browser.');
}

// Function to process the recognized command

const takeCommand = (message) => {
    console.log('Command received:', message);

    if (message.includes("hello")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you") || message.includes("hu r u")) {
        speak("I am a virtual assistant, created by Prashant sir.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        console.log("Attempting to open Google");
        window.open("https://www.google.co.in/", "_blank");
    } else {
        speak("Sorry, I didn't understand that command.");
    }
}
