import { useState , useEffect } from 'react'
export default function CountDownTimer(props){
    const calculateTimeRemaining = ()=>{
        const now = new Date()
        if(props.biddingStart){
            const difference = props.biddingStart?.getTime() - now.getTime()
            if (difference <= 0 && props.onBiddingStart) {
                props.onBiddingStart()
            }
            
            return {
                days:Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours:Math.floor(difference % ( 1000 * 60 * 60 * 24) / (1000 * 60 * 60 )),
                minutes:Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
                seconds:Math.floor(difference % (1000 * 60) / 1000)
            }
        }
        if(props.biddingEnd){
            const difference = props.biddingEnd.getTime() - now.getTime()
            if(difference <= 0 && props.biddingEnd){
                console.log('invoked function')
                props.onBiddingEnd()
            }
            console.log('hi')
            return {
                minutes:Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
                seconds:Math.floor(difference % (1000 * 60 ) / 1000)
            }
        }
        console.log('no props matched to render the component')
    }
    const [ timeRemaining , setTimeRemaining ] = useState(calculateTimeRemaining())
    useEffect(()=>{
        console.log('useEffect called')
        const timer = setInterval(()=>{
            setTimeRemaining(calculateTimeRemaining())
        }, 1000)
        return () => clearInterval(timer)
    },[])
    return (
        <div>
            {props.biddingStart?<p>Time To Live {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>:
            <p>Bid Ends In {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
            }
        </div>
    )
}