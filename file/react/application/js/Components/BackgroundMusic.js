/**
 * Created by Administrator on 2016/1/26.
 */
import ReactDom from 'react-dom'
export  default class BackgroundMusic extends React.Component{
    state={
        rotate: true,
        play : true,
    };
    componentDidUpdate(){
        var dom= this.getNodeDom();
        if(this.state.play){
            dom.play();
        }else{
            dom.pause();
        }
    }
    getNodeDom(){
        return ReactDom.findDOMNode(this.refs.music);
    }
    switchStatus(){
        this.setState({
            play : !this.state.play,
            rotate : !this.state.rotate,
        });
    }
    render(){
        var className = this.state.rotate ? 'rotate' : 'rotate pause';
        return(
            <div>
                <img className={className} onClick={this.switchStatus.bind(this)} src="./images/index_music.png" alt="背景音乐"></img>
                <audio ref="music" autoPlay="autoplay" loop="loop"  src="./audio/bgmusic.mp3"></audio>
            </div>
        )
    }
}
