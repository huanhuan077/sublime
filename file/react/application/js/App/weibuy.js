/**
 * Created by glp- on 2016/1/25.
 */

import "../../css/wei_buy.css";
import MapLocation from "../Components/mapLocation";
import ProductList from  "../Components/productList";
import "hammerjs";
import "jquery";
import API from '../../API';
export default class Wei extends React.Component{
    state={
        product:null,
        value:'王革革',
        paragraph:'恭贺大老板新店开张，祝今后财源滚滚，一帆风顺',
        tip:'',
        number:2
    };
    numberMinus(){
        if(this.state.number==1){return}
        this.setState({
            number: this.state.number - 1
        },);
    }
    numberPlus(){
        this.setState({
            number: this.state.number + 1
        });
    }
    
    selected(product){
        console.log(product);
        this.setState({
            product:product
        });
    }
    getTotalMoney(){
        return this.state.product?Number(this.state.product.old_price*this.state.product.discount*0.1*this.state.number).toFixed(2):0;
    }
    pay(){
        // return this.props.navigator.push('pay_checked');
        if(!this.state.product){
            alert('请选择您要送的贺礼');return;
        }
        var data={
            name:this.state.value,
            description:this.state.paragraph,
            counts:this.state.number,
            price:this.getTotalMoney(),
            comment:this.state.tip,
            product_id:this.state.product.id
        };
        // console.log(data);return;
        API.InvitationWish.Create(invitation.uuid,data).then((result)=>{
            if(result.ok){
                this.props.navigator.push('pay_checked');
            }else{
                alert(result.message);
            }
            console.log(result);
        });
    }
    renderFooter(){
        return(
            <footer>
              <a  className="back" onClick={()=>this.props.navigator.pop()} >
                <span><img src="./images/buy_back.png" /></span>
              </a>
              <span className="pay" onClick={()=>this.pay.call(this)} >付 款(¥<span id="sum" />{this.getTotalMoney()})</span>
            </footer>
        )
      }
    renderForm(){
        return(
            <form >
                <div className="div1 border">
                    <span>送礼人</span><input type="text" value={this.state.value} onChange={(event)=>this.setState({value:event.target.value})} />
                </div>
                <div className="div2 border">
                    <span>祝福语</span>
                    <textarea onChange={(event)=>this.setState({paragraph:event.target.value})} value={this.state.paragraph} />
                </div>
                <div className="div3 border">
                    <span>数&nbsp;量</span>
                    <span id="number">{this.state.number}</span>
                    <button id="min" type="button" onClick={this.numberMinus.bind(this)}>-</button>
                    <button id="add" type="button" onClick={this.numberPlus.bind(this)}>+</button>
                </div>
                <div className="div4 border">
                    <span>备&nbsp;注</span>
                    <textarea placeholder="对花店的其他要求" onChange={(event)=>this.setState({tip:event.target.value})} value={this.state.tip} />
                </div>
            </form>
        )
    }
    render(){
        return(
            <div>
                <header className="seller_info">
                    <img className="tx_img" src={API.Merchant.Avatar(invitation.merchant.id)} alt="头像"/>
                    <a href="tel:18270825875">
                        <h2 className="admin"><img src="./images/buy_tel.png"/>{invitation.merchant.name}</h2>
                    </a>
                    <MapLocation lat={invitation.merchant.lat} lng={invitation.merchant.lng} address={invitation.merchant.address} />
                </header>
                <ProductList source={invitation.products} selected={(product)=>this.selected.call(this,product)}/>
                {this.renderForm()}
                {this.renderFooter()}
            </div>
        )
    }
}
module.exports=Wei;
