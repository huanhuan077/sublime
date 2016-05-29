/**
 * Created by Administrator on 2016/1/27.
 */
import "hammerjs"
import ReactDom from "react-dom"
import "../../less/main.less"
export default class PictureScroll extends React.Component{
    setup() {
        var pictureWrap=ReactDom.findDOMNode(this.refs.pictureWrap)
        var wrapHeight = document.documentElement.clientHeight || document.body.clientHeight;
        pictureWrap.style.height = wrapHeight+ 10 + 'px'
        var pictures = ReactDom.findDOMNode(this.refs.pictures)
        var imageWidth = ReactDom.findDOMNode(this.refs.img).offsetWidth
        var len = pictures.children.length
        pictures.style.width=imageWidth * len +'px'
        var dotList = ReactDom.findDOMNode(this.refs.dotList)
        dotList.style.marginLeft = -dotList.offsetWidth / 2 + 'px'
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        document.onscroll = function () {
            scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        }
        pictureWrap.style.top=scrolltop+'px'
        this.hammer()
    }
    show(){
        var PictureScroll = ReactDom.findDOMNode(this.refs.pictureWrap)
        PictureScroll.style.display = 'block'
        this.componentWillUpdate()
        this.setup();
    }
    close(){
        var PictureScroll = ReactDom.findDOMNode(this.refs.pictureWrap)
        PictureScroll.style.display = 'none'
        document.body.parentNode.style.overflowY="auto"
    }
    componentWillUpdate(){
        var pictures = ReactDom.findDOMNode(this.refs.pictures)
        var dotList = ReactDom.findDOMNode(this.refs.dotList)
        var len = pictures.children.length
        for (var i = 0; i < len; i++) {
            dotList.children[i].className = ''
        }
        dotList.children[0].className = 'dotActive'
        pictures.style.left = 0
    }
    hammer() {
        var pictures = ReactDom.findDOMNode(this.refs.pictures)
        var hammerTime = new Hammer(pictures)
        var dotList = ReactDom.findDOMNode(this.refs.dotList)
        var iScroll = 0
        var imageWidth = ReactDom.findDOMNode(this.refs.img).offsetWidth
        var len = pictures.children.length
        var n=0
        hammerTime.on('swipeleft', function () {

            for (var i = 0; i < len; i++) {
                dotList.children[i].className = ''
            }
            n++
            iScroll = -imageWidth + iScroll
            if (n > len - 1) {
                n = len - 1
                iScroll = -imageWidth * (len - 1)
            }
            dotList.children[n].className = 'dotActive'
            pictures.style.left = iScroll + "px"
            pictures.style.webkitTransition = pictures.style.transition = "0.25s"
        })

        hammerTime.on('swiperight', function () {

            for (var i = 0; i < len; i++) {
                dotList.children[i].className = ''
            }
            n--
            iScroll = imageWidth + iScroll
            if (n < 0) {
                iScroll = 0
                n = 0
            }
            dotList.children[n].className = 'dotActive'
            pictures.style.left = iScroll + "px"
            pictures.style.webkitTransition = pictures.style.transition = "0.25s"
        })

    }

    render() {
        return (
            <div className="pictureWrap" ref="pictureWrap">
                <span className="close" onClick={this.close.bind(this)}>×</span>
                <div className="pictures">
                    <div ref="pictures" className="pictureList">
                        <img src="./images/blessing_img1.jpg" alt="" ref="img"/>
                        <img src="./images/blessing_img1.jpg" alt=""/>
                        <img src="./images/blessing_img2.jpg" alt=""/>
                        <img src="./images/blessing_img1.jpg" alt=""/>
                        <img src="./images/blessing_img3.jpg" alt=""/>
                    </div>
                    <ul className="dotList" ref="dotList">
                        <li className="dotActive"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        )
    }
}