/**
 * Created by Administrator on 2016/4/7.
 */
import React from "react"
import ReactDOM from "react-dom"
import ButtonGroup  from "../components/button.js"
import Cascaders from "../components/Cascader"
import $ from "jquery"

class App extends React.Component{
    render(){
        return(
            <div>
                <ButtonGroup/>
                <Cascaders/>
            </div>
        )
    }
}
ReactDOM.render(<App/>,$("#mountNode")[0]);