/**
 * Created by Administrator on 2016/1/26.
 */
import "hammerjs"
import ReactDom from "react-dom"
export default class ImageLists extends React.Component {
    componentDidMount() {
        this.hammer()
    }

    hammer() {
        var pictureList = ReactDom.findDOMNode(this.refs.pictureList)
        var ListWrap = ReactDom.findDOMNode(this.refs.ListWrap)
        var hammerTime = new Hammer(pictureList)
        var len = pictureList.children.length;
        var imgwidth = ReactDom.findDOMNode(this.refs.image).offsetWidth;
        var imgtotalwidth = (imgwidth + 10) * len;
        var total = ListWrap.offsetWidth;
        var offsetwidth = imgtotalwidth - total;
        var left = 0

        hammerTime.on('tap',()=>{
            this.props.onTap && this.props.onTap();
        })
        hammerTime.on('panleft', function () {
            if (pictureList.offsetWidth < ListWrap.offsetWidth) {
                pictureList.style.left = 0;
            }
            else if (parseInt(pictureList.style.left) < -offsetwidth || parseInt(pictureList.style.left) == -offsetwidth) {
                pictureList.style.left = -offsetwidth + 'px';
            } else {
                left = -8 + left;
                pictureList.style.left = left + 'px';
            }
            pictureList.style.webkitTransition = pictureList.style.transition = "0.3s"
        });

        hammerTime.on('panright', function () {
            if (parseInt(pictureList.style.left) == 0 || parseInt(pictureList.style.left) > 0) {
                left = 0;
            } else {
                left = 8 + left;
            }
            pictureList.style.left = left + 'px';

        });
        pictureList.style.webkitTransition = pictureList.style.transition = "0.3s"
    }

    render() {
        return (
            <div className="list_wrap" ref="ListWrap">
                <ul className="pic_list" ref="pictureList">
                    <Images index="1" ref="image"/>
                    <Images index="2"/>
                    <Images index="3"/>
                    <Images index="1"/>
                    <Images index="2"/>
                    <Images index="3"/>
                    <Images index="2"/>
                    <Images index="3"/>
                </ul>
            </div>

        )
    }
}
class Images extends React.Component {
    render() {
        return (
            <li>
                <img src={"./images/blessing_img"+this.props.index+".jpg"} alt=""></img>
            </li>
        )
    }
}