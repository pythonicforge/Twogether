const APP_ID = "f7ea76aacf2b46c5929e705d1fa6721a"
const CHANNEL = "main"
const TOKEN = "007eJxTYKgqqFl06O7ZLtVPh38oOWw/s7qm3ezy8vKPknnFDSW1k+4oMKSZpyaamyUmJqcZJZmYJZtaGlmmmhuYphimJZqZGxkmzkjemN4QyMiw7/gGJkYGCATxWRhyEzPzGBgAYI4jUw=="
let UID;

console.log("Streams connected! yeahh")

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, UID)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
            <div class="username-wrapper"><span class="user-name">User-2</span></div>
            <div class="video-player" id="user-${UID}"></div>
        </div>`

    document.getElementById("video-streams").insertAdjacentHTML("beforeend", player)

    localTracks[1].play(`user-${UID}`)
    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream()