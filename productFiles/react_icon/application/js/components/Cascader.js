/**
 * Created by Administrator on 2016/4/7.
 */
import { Cascader } from 'antd';
export default class Cascaders extends React.Component{

    onchange(value) {
        console.log(value);
    }
    render(){
        const options = [{
            value: 'zhejiang',
            label: '浙江',
            children: [{
                value: 'hangzhou',
                label: '杭州',
                children: [{
                    value: 'xihu',
                    label: '西湖',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: '江苏',
            children: [{
                value: 'nanjing',
                label: '南京',
                children: [{
                    value: 'zhonghuamen',
                    label: '中华门',
                }],
            }],
        }];
        return(
            <Cascader defaultValue={["zhejiang","hangzhou","xihu"]} options={options} onChange={this.onchange.bind(this)} />
        )
    }
}
