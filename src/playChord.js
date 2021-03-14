import YouTube from 'react-youtube';
import { useState, useEffect } from "react"

function Chord() {


    const [videoTime, setVideoTime] = useState(0)
    const [chordId, setChordId] = useState(0)
    const [chord, setChord] = useState("เริ่มเล่นคอร์ด")
    const [player, setPlayer] = useState(null)



    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            controls: 0
        },
    };




    const song = [

        {
            time: 1.5,
            chord: "A"

        },
        {
            time: 6,
            chord: "F Sharp minor"
        },
        {
            time: 11.6,
            chord: "D"
        },
        {
            time: 16.9,
            chord: "E"
        },
        {
            time: 22,
            chord: "A"
        },
        {
            time: 27,
            chord: "F Sharp minor"
        },
        {
            time: 32.2,
            chord: "D"
        },
        {
            time: 37.3,
            chord: "E"
        },
        {
            time: 42.4,
            chord: "A"
        },
        {
            time: 45.0,
            chord: "A major seven"
        },
        {
            time: 47.5,
            chord: "A seven"
        },
        {
            time: 50.0,
            chord: "D"
        },
        {
            time: 52.75,
            chord: "A"
        }

    ]

    function handleSeek(player) {

        player.pauseVideo()


        if (chordId <= 1) {

            setChord("เริ่ม")




        } else {
            setChordId(chordId - 1)
            setChord(song[chordId - 2].chord)

            player.seekTo(song[chordId - 2].time - 0.1, true)

        }



    }



    function readyToPlay(event) {


        setPlayer(event.target)
        let player = event.target

        let playButton = document.getElementById("play-button");
        playButton.addEventListener("click", function () {
            player.playVideo();

        })


        let pauseButton = document.getElementById("pause-button");
        pauseButton.addEventListener("click", function () {
            player.pauseVideo();
        })

        // let previousChordButton = document.getElementById("seek-button");
        // previousChordButton.addEventListener("click", function () {

        //     setChordId(chordId + 1)
        //     setChord(song[chordId].chord)

        //     player.seekTo(song[chordId].time - 0.1, true);

        //     console.log(chordId)
        // })




        event.target.setVolume(40)


    }

    //run เมื่อหยุดเล่น
    function pause(event) {

    }


    //run เมื่อมีการเล่น
    function play(event) {

        let player = event.target
        let videotime = event.target.getCurrentTime()
        // let timeInterval
        function updateTime() {
            // let oldTime = videotime;
            if (player && player.getCurrentTime) {
                videotime = player.getCurrentTime();

                // console.log(videotime);
                setVideoTime(videotime)
                setPlayer(player)


            }

        }

        setInterval(updateTime, 100);





    }


    // call เมื่อ state videoTime เปลี่ยน

    useEffect(() => {

        if (chordId < song.length) {

            if (song[chordId].time < videoTime + 0.1 && song[chordId].time > videoTime - 0.1) {

                setChord(song[chordId].chord)

                setChordId(chordId + 1)


            }

        }



    }, [videoTime])

    //function สำหรับอ่านเสียง
    function say(m) {
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[46];
        msg.voiceURI = "native";
        msg.volume = 1;
        msg.rate = 0.7;
        msg.pitch = 0.8;
        msg.text = m;
        msg.lang = 'th-TH';
        speechSynthesis.speak(msg);
    }

    // call เมื่อ state chord เปลี่ยน
    useEffect(() => {

        window.responsiveVoice.speak(chord, "Thai Male", { rate: 1.1, volume: 1 });

    }, [chord])





    function onStateChange(event) {
        console.log(event.target.getCurrentTime())

    }

    console.log("chordID " + chordId)



    return (
        <div>
            <h1>{videoTime}</h1>
            <h1>{chord}</h1>
            <h1>{chordId}</h1>
            <div className="player-button">
                <button id="play-button" >Play Me</button>
                <button id="pause-button" >Pause Me</button>
                <button id="seek-button" onClick={() => {
                    handleSeek(player)
                }}>คอร์ดก่อนหน้า</button>
            </div>

            <YouTube videoId="Bn5JCe-7aIg" opts={opts} onReady={readyToPlay} onPlay={play} onPause={pause} onStateChange={onStateChange} />
            <script src="https://code.responsivevoice.org/responsivevoice.js?key=bJ1UATjQ"></script>

        </div>

    )
}

export default Chord