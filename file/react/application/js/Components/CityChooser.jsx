/**
 * User: David
 * Date: 1/18/16
 * Time: 17:13
 */

import Component from "../Core/Component.jsx";
import CustomSelect from "./CustomSelect";
import Provinces from  "./Provinces.json";
import _ from "lodash";

export default class CityChooser extends Component {
    static defaultProps = {
        provinces : Provinces,
        province : null,
        city : null
    };

    constructor(props, context){
        super(props, context);
        this.state = this.getStateByProps(props);
    }
    getStateByProps(props){
        return {
            province : props.province || this.getFirstProvince(),
            city : props.city || this.getFirstCity(this.getFirstProvince()),
        };
    }
    getProvinces(){
        return _.keys(this.props.provinces);
    }
    getCities(provinceName){
        return this.props.provinces[provinceName];
    }
    getFirstCity(provinceName){
        var cities = this.props.provinces[provinceName];
        return cities.length >0 ? cities[0] : null;
    }
    getFirstProvince(){
        return _.first(this.getProvinces());
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.province != prevState.province || this.state.city != prevState.city){
            this.trigger('onChange',this.state.province,this.state.city);
        }
    }
    render(){
        var provinceName = this.state.province || this.getFirstProvince();
        var cityName = this.state.city || this.getFirstCity(provinceName);
        return (
            <div className="city_chooser">
                <CustomSelect className="province" name="province" selected={provinceName} onChange={(province)=>{
                    this.setState({
                        province : province,
                        city : this.getFirstCity(province)
                    });
                }} options={this.getProvinces()} />
                <CustomSelect className="city" name="city" selected={cityName} onChange={(city)=>{
                    this.setState({
                        city : city
                    })
                }} options={this.getCities(provinceName)} />
            </div>
        );
    }
}