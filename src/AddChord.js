import YouTube from 'react-youtube';
import { useState, useEffect } from "react"
import Form from './formChord'

function AddChord() {


    const [videoTime, setVideoTime] = useState(0)
    const [chordId, setChordId] = useState(0)
    const [chord, setChord] = useState("เริ่มเล่นคอร์ด")
    const [player, setPlayer] = useState(null)
    const [song2, setSong] = useState([])


    const [chordLists, setChordList] = useState([
        {
            time: "",
            chord: ""
        },
        {
            time: "",
            chord: ""
        }
    ]

    )


    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            controls: 0
        },
    };




    const song = chordLists
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



            <YouTube videoId="Bn5JCe-7aIg" opts={opts} onReady={readyToPlay} onPlay={play} onPause={pause} />
            <Form chordLists={chordLists} setChordList={setChordList} />
            <script src="https://code.responsivevoice.org/responsivevoice.js?key=bJ1UATjQ"></script>


        </div>

    )
}

export default AddChord