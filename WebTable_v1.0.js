function WebTable(data, id, show_line_num = 10,
    table_class_name = 'WebTable',
    tr_th_class = 'raw_tr_th',
    tr_td_class = 'raw_tr_td',
    td_class = 'block_td',
    th_class = 'block_th') {
    this.raw_data = data
    this.header_data = data.header
    this.raw_content_data = data.content
    this.content_data = []
    this.id = id
    this.table_class_name = table_class_name
    this.show_line_num = show_line_num

    this.tr_th_class = tr_th_class
    this.tr_td_class = tr_td_class
    this.td_class = td_class
    this.th_class = th_class

    this.div_container = document.getElementById(this.id)
    this.max_page = Math.trunc(this.raw_content_data.length / this.show_line_num)

    this.init = function () {
        console.log('start')
        //解析数据，验证其正确性
        //类型

        //规格

        //生成搜索栏

        //开始生成表格
        this.create_table()

        //生成底部页码等
        if (this.raw_content_data.length > this.show_line_num) {
            //数据数大于要展示的数量需要显示页码
            this.create_botton_menu()
        }
    }

    //创建表格
    this.create_table = function () {
        this.init_table_tab()
        this.create_headers()
        this.init_show_content_data()
        this.create_content()
    }

    //创建表格标签
    this.init_table_tab = function () {
        this.container = document.createElement('table')
        this.container.className = this.table_class_name
        this.div_container.appendChild(this.container)
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

    //初始化要展示的数据
    this.init_show_content_data = function () {
        //当前的页码，初始为0
        this.cur_page = 0
        this.update_show_content_data(0)
    }

    //更新表格显示
    this.update_table_content_show = function () {
        this.update_show_content_data(this.cur_page)
        this.del_all()
        this.create_content()
    }

    //更新要展示的数据
    this.update_show_content_data = function (page) {
        //最大的页数，可能会有空缺，从0开始计

        if (page > this.max_page) {
            alert("Error: update_show_content_data::page > max_page")
        }
        var start = page * this.show_line_num
        var end
        if (page === this.max_page) {
            end = this.raw_content_data.length
        } else {
            end = this.show_line_num + start
        }
        this.content_data = this.raw_content_data.slice(start, end)
    }

    //创建表体
    this.create_content = function () {
        for (idx = 0; idx < this.content_data.length; idx++) {
            var tr_td = this.create_one_line(this.content_data[idx], 'td')
            this.container.appendChild(tr_td)
        }
    }

    //创建底部菜单
    this.create_botton_menu = function () {
        var par_this = this
        var bottom_div = document.createElement('div')
        bottom_div.className = 'bottom_menu'


        var previous_btn = this.create_sigle_button({
            value: '上一页',
            className: 'bottom_btn',
            id: 'previous_btn',
            func: par_this.on_click_previous_btn
        }
        )

        var next_btn = this.create_sigle_button({
            value: '下一页',
            className: 'bottom_btn',
            id: 'next_btn',
            func: par_this.on_click_next_btn
        }
        )

        var first_page_btn = this.create_sigle_button({
            value: '第一页',
            className: 'bottom_btn',
            id: 'first_page_btn',
            func: par_this.on_click_first_page_btn
        }
        )

        var last_page_btn = this.create_sigle_button({
            value: '最后一页',
            className: 'bottom_btn',
            id: 'last_page_btn',
            func: par_this.on_click_last_page_btn
        }
        )

        this.page_input = this.create_input({
            className: 'bottom_input',
            id: 'page_num_input',
            value: '1',
            onchange: this.on_bottom_input_value_change.bind(this),
            type: 'number',
        }
        )

        this.total_page_div = document.createElement('div')
        this.total_page_text = document.createTextNode('/' + String(this.max_page+1))
        this.total_page_div.appendChild(this.total_page_text)

        bottom_div.appendChild(first_page_btn)
        bottom_div.appendChild(previous_btn)
        bottom_div.appendChild(next_btn)
        bottom_div.appendChild(last_page_btn)
        bottom_div.appendChild(this.page_input)
        bottom_div.appendChild(this.total_page_div)

        this.div_container.appendChild(bottom_div)
    }

    this.on_click_previous_btn = function () {
        // alert("previous")
        if (this.cur_page > 0) {
            this.cur_page--
            this.update_table_content_show()
            this.update_page_show()
        }
    }

    this.on_click_next_btn = function () {
        // alert("next")
        if (this.cur_page < this.max_page) {
            this.cur_page++
            this.update_table_content_show()
            this.update_page_show()
        }
    }

    this.on_click_first_page_btn = function () {
        // alert("first")
        this.cur_page = 0
        this.update_table_content_show()
        this.update_page_show()
    }

    this.on_click_last_page_btn = function () {
        // alert("last")
        this.cur_page = this.max_page
        this.update_table_content_show()
        this.update_page_show()
    }

    //创建单个输入框
    this.create_input = function (arg) {
        var input_block = document.createElement('input')
        if ("className" in arg) {
            input_block.className = arg.className
        }
        if ("id" in arg) {
            input_block.id = arg.id
        }
        if ("maxLength" in arg) {
            input_block.maxLength = arg.maxLength
        }
        if ("size" in arg) {
            input_block.size = arg.size
        }
        if ("value" in arg) {
            input_block.value = arg.value
        }
        if ("onkeyup" in arg) {
            input_block.addEventListener('keyup',arg.onkeyup)
        }
        if ('onchange' in arg) {
            input_block.addEventListener('change',arg.onchange)
        }
        if ('type' in arg) {
            input_block.type = arg.type
        }
        return input_block
    }

    //创建单个按钮
    this.create_sigle_button = function (arg) {
        var btn = document.createElement('button')
        var mode
        if ("value" in arg) {
            var text = document.createTextNode(arg.value)
            btn.appendChild(text)
        }
        if ("className" in arg) {
            btn.className = arg.className
        }
        if ("id" in arg) {
            btn.id = arg.id
        }
        if ('mode' in arg) {
            mode = arg.mode
        } else {
            mode = 'click'
        }
        //绑定事件
        if ('func' in arg) {
            btn.addEventListener(mode, arg.func.bind(this))
        } else {
            btn.addEventListener(mode, function () { })
        }
        btn.type = 'button'
        return btn
    }

    //删除特定一行
    this.del_idx_line = function (idx) {
        this.del_all()
        this.raw_content_data.splice(idx, 1)
        this.update_show_content_data(this.cur_page)
        this.create_content()
    }

    //删除一行
    this.del_line = function (object) {
        all_btns = Array.from(document.getElementsByClassName('webtable_btn'))
        btn_idx = all_btns.indexOf(object)
        btn_idx = btn_idx + this.cur_page * this.show_line_num
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

    //底部输入框内容改变后
    this.on_bottom_input_value_change = function () {
        // console.log("内容改变")
        var cur_tmp_page = parseInt(this.page_input.value) - 1
        // if (cur_tmp_page > this.max_page || cur_tmp_page < 0) {
        //     alert('输入的页码不正确或超出表格范围')
        // }
        if(cur_tmp_page > this.max_page){
            cur_tmp_page = this.max_page
            this.page_input.value = String(this.max_page + 1)
        }else if(cur_tmp_page < 0){
            cur_tmp_page = 0
            this.page_input.value = '1'
        }
        this.cur_page = cur_tmp_page
        this.update_table_content_show()
    }

    //更新页码显示
    this.update_page_show = function () {
        this.page_input.value = String(this.cur_page + 1)
    }

    //创建一个单元格
    this.create_text = function (elem_data, idx) {
        elem_type = this.header_type[idx]
        var tx
        if (elem_type === 'button') {
            tx = document.createElement('button')
            tx.type = 'button'
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
                    that.update_total_page()
                })
            } else if (elem_data.btn_type === 'view') {
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

    this.update_total_page = function(){
        var tmp = Math.trunc(this.raw_content_data.length / this.show_line_num)
        if(tmp != this.max_page){
            this.max_page = tmp
            this.total_page_div.removeChild(this.total_page_text)
            this.total_page_text = document.createTextNode('/'+String(this.max_page+1))
            this.total_page_div.appendChild(this.total_page_text)
        }
    }
}