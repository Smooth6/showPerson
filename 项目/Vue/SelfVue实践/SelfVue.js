(function(){
    function SelfVue(option) {
        this.vm = this;
        this.data = option.data;
        this.methods = option.methods;

        Object.keys(this.data).forEach((ele) => {
            this.proxyData(ele);
        })
        observer(this.data);
        new Compile(option.el, this.vm);
        option.mounted.call(this);
        return this;
    }
    SelfVue.prototype = {
        proxyData(ele) {
            var self = this;
            Object.defineProperty(self, ele, {
                enumerable: false,
                configurable: true,
                set(newVal) {
                    self.data[ele] = newVal;
                },
                get() {
                    return self.data[ele];
                }
            })
        }
    }

    function observer(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        return new Observer(data);
    }
    function Observer(data) {
        this.data = data;
        this.walk(this.data);
    }
    Observer.prototype = {
        walk(data) {
            Object.keys(data).forEach((ele) => {
                this.defineReactive(data, ele, data[ele]);
            })
        },
        defineReactive(data, ele, value) {
            var dep = new Dep();
            observer(value);
            Object.defineProperty(data, ele, {
                enumerable: false,
                configurable: true,
                get() {
                    if (Dep.target) {
                        dep.addSub(Dep.target)
                    }
                    return value;
                },
                set(newVal) {
                    if (newVal !== value) {
                        value = newVal;
                        dep.notify();
                    }
                }
            })
        }
    }
    function Dep() {
        this.subs = [];
    }
    Dep.prototype = {
        addSub(sub) {
            this.subs.push(sub)
        },
        notify() {
            this.subs.forEach((sub) => {
                sub.update();
            })
        }
    }


    function Compile(el, vm) {
        this.el = document.querySelector(el);
        this.vm = vm;
        this.fragment = null;
        this.init();
    }
    Compile.prototype = {
        init() {
            if (this.el) {
                this.fragment = this.textToNode(this.el);
                this.compileElement(this.fragment);
                this.el.appendChild(this.fragment);
            } else {
                console.log("dom节点不存在");
            }

        },
        textToNode(el) {
            var fragment = document.createDocumentFragment();
            var child = el.firstChild;
            while (child) {
                fragment.appendChild(child);
                child = el.firstChild;
            }
            return fragment;
        },
        compileElement(el) {
            var childNodes = el.childNodes;
            Array.from(childNodes).forEach((node) => {
                var reg = /\{\{(.*)\}\}/;
                var text = node.textContent;
                if(node.nodeType == 1){
                    this.compile(node);
                }
                else if (this.isTextNode(node) && reg.test(text)) {
                    this.compileText(node, reg.exec(text)[1]);
                }
                if (node.childNodes && node.childNodes.length) {
                    this.compileElement(node); 
                }
            })
        },
        compile(node){
            var nodeAttr = node.attributes;
            Array.from(nodeAttr).forEach((attr)=>{
                var attrName = attr.name;
                if(this.isDirective(attrName)){
                    var exp = attr.value;
                    var dir = attrName.substring(2);
                    if(this.isEventDirective(dir)){
                        this.compileEvent(node,this.vm,exp,dir);
                    }else{
                        this.compileModel(node,this.vm,exp,dir);
                    }
                    node.removeAttribute(attrName);
                }
            })
        },
        isDirective(attrName){
            return attrName.indexOf("v-") == 0;
        },
        isTextNode(node) {
            return node.nodeType == 3;
        },
        isEventDirective(dir){
            return dir.indexOf("on:") == 0;
        },
        compileEvent(node,vm,exp,dir){
            var eventType = dir.split(":")[1];
            var cb = vm.methods && vm.methods[exp];
            if(eventType && cb){
                node.addEventListener(eventType,cb.bind(vm),false);
            }
        },
        compileModel(node,vm,exp,dir){
            var val = vm[exp];
            this.modelUpdate(node,val);
            new Watcher(vm,exp,val=>{
                this.modelUpdate(node,val)
            });
            node.addEventListener("input",function(e){
                var newVal = e.target.value;
                if(newVal !== val){
                    val = newVal;
                    vm.data[exp] = newVal;
                }
            })
        },
        modelUpdate(node,val){
            node.value = typeof val == "undefined"?"":val;
        },
        compileText(node, exp) {
            var innerText = this.vm.data[exp];
            this.updateText(node, innerText);
            new Watcher(this.vm, exp, value => {
                this.updateText(node, value)
            });
        },
        updateText(node, value) {
            node.textContent = typeof value == "undefined" ? "" : value;
        }
    }


    function Watcher(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get();
    }
    Watcher.prototype = {
        get() {
            Dep.target = this;
            var value = this.vm.data[this.exp]
            Dep.target = null;
            return value;
        },
        update() {
            this.run();
        },
        run() {
            var oldVal = this.value;
            var value = this.vm.data[this.exp];
            if (oldVal !== value) {
                this.value = value;
                this.cb.call(this.vm, value, oldVal);
            }
        }
    }

    window.SelfVue = SelfVue;
})()