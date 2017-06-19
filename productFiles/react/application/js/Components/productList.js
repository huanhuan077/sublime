/**
 * Created by glp- on 2016/1/29.
 */

import ReactDOM from "react-dom";
import Product from "../Components/product";

export default class ProductList extends React.Component{
    state={
       product:null 
    };
    handle(product){
        this.setState({
            product:product
        },()=>{
            this.props.selected && this.props.selected(product);
        })
    };
    componentDidMount(){
        this.hammer();
    }
    hammer(){
        var oBox=ReactDOM.findDOMNode(this.refs.box);
        var hammertime=new Hammer(oBox);
        var oList=ReactDOM.findDOMNode(this.refs.list);
        var totalWidth=oList.offsetWidth;
        var offset=10;
        hammertime.on("panleft",function(){
            if(parseInt(oList.style.left)<(-totalWidth)/2){
                oList.style.left='0px';
            }
            var currentValue=oList.offsetLeft;
            oList.style.left=currentValue-offset+'px';

        });
        hammertime.on("panright",function(){
            if(!oList.style.left){
                oList.style.left="0px";
            }
            if(parseInt(oList.style.left)>=0){
                oList.style.left=-totalWidth/2+"px";
            }
            var currentValue=oList.offsetLeft;
            oList.style.left=currentValue+offset+'px';
        });
    }
    select(v){
        return v==(this.state.product?this.state.product.id:0);
    }
    getFlower(){
        return this.props.source.map((product,index)=>{
            return {id:product.id,name:product.name,discount:invitation.discount,old_price:product.price,src:'blessing_bigimg.jpg'}
        });
        return [
            {
                id:1,
                name:'呢喃',
                discount:6.5,
                old_price:120,
                src:'blessing_bigimg.jpg'
            },
            {
                id:2,
                name:'一见钟情',
                discount:8.8,
                old_price:150,
                src:'blessing_bigimg.jpg'
            },
            {
                id:3,
                name:'鲜花',
                discount:9.8,
                old_price:200,
                src:'blessing_bigimg.jpg'
            }
        ];
    }
    render(){
        var product=this.getFlower().map((flower)=>{
            var new_price=(new Number(flower.old_price*flower.discount*0.1)).toFixed(2);
            return <Product
                        idValue={'flower'+flower.id}
                        select={this.select(flower.id)}
                        name={flower.name}
                        discount_price={new_price}
                        discount={flower.discount}
                        price={flower.old_price}
                        imageSrc={flower.src}
                        onClick={this.handle.bind(this,flower)}
            />
        });
        return(
            <div className="box" id="box" ref="box">
                <ul className="list" id="list" ref="list">
                    {product}
                    {product}
                 </ul>
            </div>
        );
    }
}