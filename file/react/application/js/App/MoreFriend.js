/**
 * Created by laferm on 2016/2/22.
 */

import FriendList from "../Components/FriendList.js";
export default class MoreFriend extends React.Component {
    shadeMore() {
        this.props.navigator.pop();
    }
    render() {
        return (
            <div className="shade">
                <p className="back" onClick={this.shadeMore.bind(this)}>回邀请函</p>
                <ul>
                    {invitation.wishes.map((wish,index)=>{
                        return <FriendList key={index} wish={wish} manIndex="1" flowerUrl="blessing_bigimg"/>
                    })}
                </ul>
                <a onClick={()=>this.props.navigator.push('wei_buy')}  target="_self" className="also_bless">也送祝贺花篮</a>
            </div>
        )
    }
}
module.exports=MoreFriend;
