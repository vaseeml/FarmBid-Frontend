import { useState , useEffect } from 'react'

import { IoTime  } from 'react-icons/io5'
export default function CountDownTimer(props){
    const calculateTimeRemaining = ()=>{
        const now = new Date()
        if(props.biddingStart){
            const difference = props.biddingStart?.getTime() - now.getTime()
            if (difference <= 0 && props.onBiddingStart) {
                props.onBiddingStart()
            }
            // console.log('bidding start running every second')
            return {
                days:Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours:Math.floor(difference % ( 1000 * 60 * 60 * 24) / (1000 * 60 * 60 )),
                minutes:Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
                seconds:Math.floor(difference % (1000 * 60) / 1000)
            }
        }
        if(props.biddingEnd){
            let difference = props.biddingEnd?.getTime() - now.getTime()
            if(difference <= 0 && props.onBiddingEnd){;
                props.onBiddingEnd()
            }
            // console.log('bidding end runnning every second')
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
            {props.biddingStart?<p><IoTime color='green' /> Time Left: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>:
            <span  className="bg-warning text-dark p-1 rounded" ><IoTime color='black' /> {timeRemaining.minutes >= 0 ?`${timeRemaining.minutes}m ${timeRemaining.seconds}s Ends` :'Time Ended'}</span>
            }
        </div>
    )
}