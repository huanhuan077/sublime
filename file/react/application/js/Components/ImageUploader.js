export default  class ImageUploader extends React.Component {
    static defaultProps = {
        indexName : ''
    };
    readBlobAsDataURL(blob, callback) {
        var a = new FileReader();
        a.onload = function(e) {callback(e.target.result);};
        a.readAsDataURL(blob);
    }
    previewImage(sourceId,targetId){
        var file = document.getElementById(sourceId).files[0];
        this.readBlobAsDataURL(file,(url)=>{
            var imgPre = document.getElementById(targetId);
            var add=document.getElementsByClassName("add")[0];
            imgPre.src = url;
            add.style.zIndex=0;
            imgPre.style.zIndex=1;
            if(this.props.onChange){
                this.props.onChange(url);
            }
        });
    }
    render(){
        var id = 'img' + this.props.indexName;
        var targetId = "imgPre_" + this.props.indexName;
        return (
        <li className="picture">
            <input accept="image/*" type="file" className="image" id={id} onChange={()=>{
                        this.previewImage(id,targetId)
                    }}/>
            <div className="add">+</div>
            <img className="imgPreview" id={targetId} src="" width="100%" height="50px"/>
        </li>
        );
    }
}