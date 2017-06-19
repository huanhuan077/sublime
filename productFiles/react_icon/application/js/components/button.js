/**
 * Created by Administrator on 2016/4/7.
 */
import { Button } from 'antd'
import 'antd/lib/index.css';
export  default class ButtonGroup extends React.Component{

    render(){

        return(
            <div className="123">
                <Button type="primary">主按钮</Button>
                <Button>次按钮</Button>
                <Button type="ghost">幽灵按钮</Button>
                <Button type="dashed">虚线按钮</Button>
            </div>
            )
    }
}
