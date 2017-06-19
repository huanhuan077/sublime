/**
 * Created by glp- on 2016/1/29.
 */

import ReactDOM from "react-dom";
export default class MapLocation extends React.Component{
    defaultProps={
        address:"",
        lng:116.331398,
        lat:39.897445
    };
    componentDidMount(){
        if(typeof BMap =='undefined')return;
        var add = this.props.address;
        var city = add.substring(0, 3);
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.props.lng,this.props.lat);
        map.centerAndZoom(point,15);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(add, function(point){
            if (point){
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            }else{
                alert("您选择地址没有解析到结果!");
            }
        }, city);
    }
    handleClick(event){
        var map = ReactDOM.findDOMNode(this.refs.allmap);
        if (map.style.display == 'none'){
            map.style.display = 'block';
            this.componentDidMount();
        }else{
            map.style.display = 'none';
        }
        event.stopPropagation();
        event.preventDefault();
    };
    render(){
        return(
            <div>
                <a href="javascript:void 0;" id="map_btn" onClick={this.handleClick.bind(this)}>
                    <h5>
                        <img src="./images/buy_add.png" />
                        <span ref="address" className="address">{this.props.address}</span>
                    </h5>
                </a>
                <div ref="allmap" id="allmap" style={{display:'none'}}></div>
            </div>
        )
    }
}