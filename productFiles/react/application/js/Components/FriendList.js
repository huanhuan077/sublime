/**
 * Created by Administrator on 2016/1/28.
 */
export default class FriendList extends React.Component {
    static defaultProps = {
        manIndex: 1
    };

    render() {
        return (
            <li>
                <img className="man" src={"./images/index_wxheadimg"+this.props.manIndex+".png"} alt="微信头像"></img>
                <span className="name">{this.props.wish.name}</span>
                <h4>{this.props.wish.description}</h4>
                <img className="flower" src={"./images/"+this.props.flowerUrl+".jpg"} alt="花蓝图"></img>
            </li>
        )
    }
}