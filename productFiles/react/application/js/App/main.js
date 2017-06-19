/**
 * Created by Administrator on 2016/1/25.
 */
//import "../../css/main.css";
import "../../less/main.less"
import BackgroundMusic from "../Components/BackgroundMusic.js";
import CurrentTimeIndicator from "../Components/CurrentTimeIndicator.js";
import  AddressMap from "../Components/addressMap.js"
import ImageLists from "../Components/ImageLists.js"
import PictureScroll from "../Components/pictureScroll.js"
import FriendList from "../Components/FriendList.js"
import WeixinShare from "../Components/weixinShare.js"
import React from "c/aljsldjf";
export default class Content extends React.Component {
    showMore() {
        this.props.navigator.push('more_friend');
    }
    shadeShare(){
        this.refs.share_div.style.display='none'
        this.refs.wrap.parentNode.parentNode.style.overflowY="auto"
    }
    render() {
        return (
            <div className="wrap" ref="wrap">
                <img className="store" src="./images/index_top.jpg" alt="店面图"/>
                <BackgroundMusic />
                <WeixinShare tag={()=>{
                    this.refs.share_div.style.display='block'
                    this.refs.wrap.parentNode.parentNode.style.overflowY="hidden"
                }}
                />
                <div className="share_div" ref="share_div">
                    <img className="shareBg" src="./images/wx_share.png" alt="分享提示图" onClick={this.shadeShare.bind(this)}/>
                </div>
                <CurrentTimeIndicator date={invitation.date_at} interval={1000}/>
                <AddressMap lat={invitation.lat} lng={invitation.lng}/>
                <div className="boss">
                    <h3 className="thanks">{invitation.description}</h3>
                    <p className="sign">{invitation.name}</p>
                    <PictureScroll ref="PictureScroll"/>
                    <ImageLists ref="ImageList" onTap={()=>{
                    this.refs.PictureScroll.show();
                    document.body.parentNode.style.overflowY="hidden"
                    }}/>
                </div>
                <div className="friend">
                    <p id="bless" onClick={this.showMore.bind(this)}>{invitation.wishes.length}位朋友送了祝贺和花篮</p>
                    <ul>
                        {invitation.wishes.map((wish,index)=>{
                            return index>2?null:<FriendList key={index} wish={wish} manIndex="1" flowerUrl="blessing_bigimg"/>
                        })}
                    </ul>
                </div>
                <a className="also_bless" onClick={()=>this.props.navigator.push('wei_buy')} target="_self">也送祝贺 花篮</a>
            </div>
        )
    }
}

module.exports=Content;
