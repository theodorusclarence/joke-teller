const audioElement = document.getElementById("audio");
const button = document.getElementById("button");
// VoiceRSS Javascript SDK

const jokeApi =
    "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist";

function toggleButton() {
    button.disabled = !button.disabled;
}

async function getVoice(joke) {
    const res = await fetch(`https://theodorus-clarence-proxy.herokuapp.com/vrss/${joke}`);
    const data = await res.json();

    audioElement.src = data.content;
    audioElement.play();
}

async function getJoke() {
    toggleButton();
    let joke = "";
    try {
        const res = await fetch(jokeApi);
        const data = await res.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else joke = data.joke;
        getVoice(joke);
    } catch (e) {
        console.log("whoops", e);
        window.alert("There seems to be a problem. Please try again");
        toggleButton();
    }
}

// getJoke();

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
