const APP_ID = "f7ea76aacf2b46c5929e705d1fa6721a"
const CHANNEL = "main"
const TOKEN = "007eJxTYKgqqFl06O7ZLtVPh38oOWw/s7qm3ezy8vKPknnFDSW1k+4oMKSZpyaamyUmJqcZJZmYJZtaGlmmmhuYphimJZqZGxkmzkjemN4QyMiw7/gGJkYGCATxWRhyEzPzGBgAYI4jUw=="
let UID;

console.log("Streams connected! yeahh")

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
let localTracks = []
let remoteUsers = {}

let handleUserJoin = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if(mediaType === "video") {
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player != null){
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                <div class="username-wrapper"><span class="user-name">User-2</span></div>
                <div class="video-player" id="user-${user.uid}"></div>
                </div>`
        document.getElementById("video-streams").insertAdjacentHTML("beforeend", player)

        user.videoTrack.play(`user-${user.uid}`)

    }

    if(mediaType === "audio") {
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    let player = document.getElementById(`user-container-${user.uid}`)
    if(player != null){
        player.remove()
    }
}

let leaveAndRemoveLocalStream = async () => {
    for(let i=0; i<localTracks.length; i++){
        let track = localTracks[i]
        if(track){
            track.stop()
            track.close()
    }

    await client.leave()
    window.open("/", "_self")
    }
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = "#fff"
    } else {
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = "rgb(255, 80, 80, 1)"
    }
}

let toggleMic = async (e) => {
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = "#fff"
    } else {
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = "rgb(255, 80, 80, 1)"
    }
}

let joinAndDisplayLocalStream = async () => {
    client.on("user-published", handleUserJoin)
    client.on("user-left", handleUserLeft)

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

document.getElementById("leave-btn").addEventListener('click',leaveAndRemoveLocalStream)
document.getElementById("camera-btn").addEventListener('click',toggleCamera)
document.getElementById("mic-btn").addEventListener('click',toggleMic)