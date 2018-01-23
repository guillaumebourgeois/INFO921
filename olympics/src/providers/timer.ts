import { Injectable } from '@angular/core';

@Injectable() export class Timer {

    private seconds: number;
	private secondsRemaining: number;
	private runTimer: boolean;
	private hasStarted: boolean;
	public displayTime: string;

    constructor() {
    	this.initTimer();
    }

    initTimer() {
        this.runTimer = false;
        this.hasStarted = false;
        this.seconds = 0;
        this.secondsRemaining = 0;

        this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
    }

    startTimer() {
        this.hasStarted = true;
        this.runTimer = true;
        this.timerTick();
    }

    pauseTimer() {
        this.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    resetTimer() {
    	this.initTimer();
    }

    timerTick() {
        setTimeout(() => {
            if (!this.runTimer) { return; }
            this.secondsRemaining++;
            
            this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
            this.timerTick();
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }
    
}