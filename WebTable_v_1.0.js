function WebTable(data, id,
    tr_th_class = 'raw_tr_th',
    tr_td_class = 'raw_tr_td',
    td_class = 'block_td',
    th_class = 'block_th') {
    this.raw_data = data
    this.header_data = data.header
    this.content_data = data.content
    this.id = id

    this.tr_th_class = tr_th_class
    this.tr_td_class = tr_td_class
    this.td_class = td_class
    this.th_class = th_class

    this.container = document.getElementById(this.id)
    this.init = function () {
        console.log('start')
        //解析数据，验证其正确性
        //类型

        //规格

        //开始生成表格
        this.create_table()
    }

    //创建表格
    this.create_table = function () {
        this.create_headers()
        this.create_content()
    }

    //创建表头
    this.create_headers = function () {
        var _data = []
        var _type = []
        this._col_list = []
        var prototype = 'col_'
        for (i = 0; i < this.header_data.length; i++) {
            _data.push(this.header_data[i].name)
            _type.push(this.header_data[i].type)
            this._col_list.push(prototype + String(i))
        }
        this.header_name = _data
        this.header_type = _type
        var tr_th = this.create_one_line(_data, 'th')
        this.container.appendChild(tr_th)
    }

    //创建表体
    this.create_content = function () {
        for (idx = 0; idx < this.content_data.length; idx++) {
            var tr_td = this.create_one_line(this.content_data[idx], 'td')
            this.container.appendChild(tr_td)
        }
    }

    //删除特定一行
    this.del_idx_line = function (idx) {
        this.del_all()
        this.content_data.splice(idx, 1)
        this.create_content()
    }

    //删除一行
    this.del_line = function (object) {
        all_btns = Array.from(document.getElementsByClassName('webtable_btn'))
        btn_idx = all_btns.indexOf(object)
        this.del_idx_line(btn_idx)
        // alert("shanchu")
    }

    //创建一行
    this.create_one_line = function (line_data, _label) {
        var tr = document.createElement('tr')
        if (_label === 'td') {
            tr.className = this.tr_td_class
            for (i = 0; i < line_data.length; i++) {
                //创建元素
                var t_label = document.createElement(_label)
                //赋予class 和 id
                t_label.className = this.td_class + ' ' + this._col_list[i]
                //创建textnode
                // var text = document.createTextNode(String(line_data[i]))
                var text = this.create_text(line_data[i], i)
                //将textnode接到td上
                t_label.appendChild(text)
                //将td接到tr上
                tr.appendChild(t_label)
            }

        } else if (_label === 'th') {
            tr.className = this.tr_th_class
            for (i = 0; i < line_data.length; i++) {
                //创建元素
                var t_label = document.createElement(_label)
                //赋予class 和 id
                t_label.className = this.th_class
                t_label.tagName = this.th_name
                //创建textnode
                var text = document.createTextNode(String(line_data[i]))
                // var text = this.create_text(line_data[i],i)
                //将textnode接到td上
                t_label.appendChild(text)
                //将td接到tr上
                tr.appendChild(t_label)
            }
        }
        return tr
    }

    //创建一个单元格
    this.create_text = function (elem_data, idx) {
        elem_type = this.header_type[idx]
        var tx
        if (elem_type === 'button') {
            tx = document.createElement('button')
            tx.className = 'webtable_btn' + ' ' + this._col_list[i]
            //给按钮加入文字
            var text = document.createTextNode(elem_data.btn_name)
            tx.appendChild(text)
            //给按钮绑定事件
            if (elem_data.btn_type === 'edit') {
                if ('func' in elem_data) {
                    tx.addEventListener("click", elem_data.func)
                } else {
                    tx.addEventListener("click", function () {
                        alert('点击了编辑按钮')
                    })
                }
            } else if (elem_data.btn_type === 'add') {
                if ('func' in elem_data) {
                    tx.addEventListener("click", elem_data.func)
                } else {
                    tx.addEventListener("click", function () {
                        alert('点击了添加按钮')
                    })
                }
            } else if (elem_data.btn_type === 'del') {
                var that = this
                tx.addEventListener("click", function () {
                    that.del_line(this)
                })
            }else if(elem_data.btn_type === 'view'){
                if ('func' in elem_data) {
                    tx.addEventListener("click", elem_data.func)
                } else {
                    tx.addEventListener("click", function () {
                        alert('点击了查看按钮')
                    })
                }
            }
        } else if (elem_type === 'number') {
            tx = document.createTextNode(String(elem_data))
        } else if (elem_type === 'text') {
            tx = document.createTextNode(elem_data)
        }
        return tx
    }

    this.del_all = function () {
        var child_list = document.getElementsByClassName(this.tr_td_class)
        length = child_list.length
        for (i = 0; i < length; i++) {
            this.container.removeChild(child_list[0])
        }
        // this.container.removeChild(child_list)
    }
}