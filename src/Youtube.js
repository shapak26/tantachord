import React from 'react';
import YouTube from 'react-youtube';

class Example extends React.Component {
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            },
        };

        return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this.whereMyevent} onPlay={this.play} onPause={this.pause} onStateChange={this.stamp} />;
    }

    whereMyevent(event) {
        // access to player in all event handlers via event.target


        console.log(event.target)
        console.log(event.target.getCurrentTime())
    }

    pause(event) {
        console.log(12)
        console.log(event.target)
    }

    play(event) {
        console.log(11)
        setInterval(console.log(event.target.getCurrentTime()), 100);


    }

    stamp(event) {
        console.log(event.target.getCurrentTime())
    }
}

export default Example