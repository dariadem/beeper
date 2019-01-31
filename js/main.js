(function(){

let app = new Vue({
    el: '#app',
    data: {
        type: 'beep',
        interval: 30,
        isActive: false,
        timerId: false,
        activeBlinker: false,
        soundList: {
            clong: 'audio/clong.mp3',
            cuckoo: 'audio/cuckoo-clock.mp3',
            shuffle: 'audio/beep-shuffle.mp3'
        },
        soundName: 'clong',
        colorList: {
            red: '#ff5722',
            blue: '#3f51b5',
            green: '#a8fe6c'
        },
        colorName: 'red'
    },
    computed: {
        sound() {
            return new Audio( this.soundList[this.soundName] )
        }
    },
    methods: {
        start: function(time) {
            if (this.isActive) {
                this.stop()
            }
            this.interval = time;
            this.isActive = true;
            this.initBeeper(this.interval)
        },

        stop() {
            this.isActive = false;
            clearInterval(this.timerId);
            this.activeBlinker = false;
            this.sound.pause()
        },

        initBeeper(time) {
            let signal = (this.type == 'beep') ? this.beep : this.blink;
            time = (+time + 5) * 1000;

            signal();
            this.timerId = setInterval(function(){
                signal()
            }, time)
        },

        beep() {
            this.sound.play()
        },

        blink() {
            this.activeBlinker = true;
            setTimeout(() => {
                this.activeBlinker = false
            }, 5000);
        }

    }
}); //end of app

}()); //end of global wrapper
