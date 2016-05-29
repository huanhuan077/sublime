/**
 * Created by Administrator on 2016/1/26.
 */
import moment from "moment";
export  default class CurrentTimeIndicator extends React.Component{
    static defaultProps={
        format:"YYYY/MM/DD HH:mm",
        interval:1000
    };
    state={
        currentTime:null
    };
    syncTime() {
        this.setState({
            currentTime: this.getCurrentTime()
        })
    }
    getCurrentTime(){
        return moment().format(this.props.format)
    }
    componentDidMount(){
        this.timer=setInterval(()=>{
            this.syncTime()
        },this.props.interval)
    }
    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }
    render(){
        return (<p className="time">{this.props.date || this.state.currentTime}</p>)
    }
}

