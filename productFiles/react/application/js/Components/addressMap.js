/**
 * Created by Administrator on 2016/1/26.
 */
import ReactDom from 'react-dom'

export default class AddressMap extends React.Component {
    static defaultProps={ lat:39.897445, lng:116.331398};
    state = {
        display: true
    };

    switchDisplay() {
        this.setState({
            display: !this.state.display
        })
    }

    componentDidUpdate() {
        var dom = ReactDom.findDOMNode(this.refs.container)
        var oSee = ReactDom.findDOMNode(this.refs.see)
        if (!this.state.display) {
            dom.style.display = "block"
            oSee.innerHTML = "收起地图"
            this.map()
        } else {
            dom.style.display = "none"
            oSee.innerHTML = "查看地图"
        }
    }

    map() {
        var map = new window.BMap.Map("container");
        var point = new window.BMap.Point(this.props.lng,this.props.lat);
        map.centerAndZoom(point, 15);
        this.myGeo = new window.BMap.Geocoder();
        var address = ReactDom.findDOMNode(this.refs.address).innerHTML;
        var city = address.substring(0, 3)
        this.myGeo.getPoint(address, function (point) {
            if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            } else {
                alert("您选择地址没有解析到结果!");
            }
        }, city);
    }

    render() {
        return (
            <div className="map">
                <h3 className="address"><span ref="address">南昌市红谷滩新区万达广场金街一号楼362号</span>
                    <button className="see" ref="see" onClick={this.switchDisplay.bind(this)}>查看地图</button>
                </h3>
                <div id="container" ref="container"></div>
            </div>
        )
    }
}