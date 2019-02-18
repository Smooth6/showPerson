function FileLoader(file,events){
    this.file=file;
    this.step=1024*1024;
    this.reader=new FileReader();
    this.events=events;
    this.total=file.size;
    this.loaded=0;
    this.readBlob(this.reader,0,this.step);
    this.bindEvent();
}

FileLoader.prototype={
    readBlob: function(reader,start,step){
        var file=this.file;
        var reader=this.reader;
        if(file.slice){
            var blob=file.slice(start,start+step);
        }else{
            var blob=file;
        }
        reader.readAsText(blob);
    },
    bindEvent:function(){
        var reader=this.reader;
        var _this=this;
        reader.onprogress=function(e){
            _this.onPrograss(e.loaded);
        }
        reader.onload=function(){
            _this.onLoad();
        }
    },
    onPrograss: function(num){
        this.loaded+=num;
        this.events.loadIng(this.loaded);
        var per=this.loaded/this.total;
        if(per>1){
            per=1;
        }
        this.events.progressIng(per);
    },
    onLoad:function(){
        if(this.loaded<this.total){
            this.readBlob(this.reader,this.loaded,this.step);
        }else{
            this.events.Loaded();
        }
    }


}
