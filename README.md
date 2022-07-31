# WebTable

体验：[Document](http://43.138.62.72//webtable/table.html)

介绍：一个简单的由JavaScript实现的网页动态表格，可支持显示文本和按钮。

使用方法：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="table.css">
    <script src="WebTable_v_1.0.js"></script>
</head>

<body>
    <div id="app"></div>

    <script>

        top_sell_data={
            header:[
                {
                    name:'排名',
                    type:'number'
                },
                {
                    name:'商品编号',
                    type:'text'
                },
                {
                    name:'商品名称',
                    type:'text'
                },
                {
                    name:'商品价格',
                    type:'number'
                },
                {
                    name:'操作',
                    type:'button'
                }
            ],
            content:[
                [1,'ghuiw83752hdf','测试商品01','49.99',{ btn_name: '删除', btn_type: 'del' }],
                [2,'asdjfklafgsa','测试商品02','59.99',{ btn_name: '删除', btn_type: 'del' }],
                [3,'2uy839gpadf','测试商品03','69.99',{ btn_name: '删除', btn_type: 'del' }],
                [4,'2h78osbjdv','测试商品04','79.99',{ btn_name: '删除', btn_type: 'del' }],
                [5,'amfkdjog98','测试商品05','89.99',{ btn_name: '删除', btn_type: 'del' }],
                [6,'gn43upudv','测试商品06','99.99',{ btn_name: '删除', btn_type: 'del' }],
                [7,'mg34uiogueifdd','测试商品07','109.99',{ btn_name: '删除', btn_type: 'del' }],
                [8,'4juo8agusydgbfku4h','测试商品08','119.99',{ btn_name: '删除', btn_type: 'del' }],
                [9,'sdngjakbsdfubwegf','测试商品09','129.99',{ btn_name: '删除', btn_type: 'del' }],
                [10,'34nugovauyswe','测试商品10','139.99',{ btn_name: '删除', btn_type: 'del' }],
                [11,'gn4uiobvayusdbnfjase','测试商品11','149.99',{ btn_name: '删除', btn_type: 'del' }],
                [12,'nbwguhgusdhfkjwe','测试商品12','159.99',{ btn_name: '删除', btn_type: 'del' }],
                [13,'sabdyufyka','测试商品13','169.99',{ btn_name: '删除', btn_type: 'del' }],
                [14,'asdgh3dv','测试商品14','179.99',{ btn_name: '删除', btn_type: 'del' }],
                [15,'54ywsdgsrkjse','测试商品15','189.99',{ btn_name: '删除', btn_type: 'del' }],
                [16,'wrytuw4etrgsef','测试商品16','199.99',{ btn_name: '删除', btn_type: 'del' }],
                [17,'45uwershse','测试商品17','209.99',{ btn_name: '删除', btn_type: 'del' }],
                [18,'ujhserth54y4','测试商品18','219.99',{ btn_name: '删除', btn_type: 'del' }],
                [19,'435ywehrth54','测试商品19','229.99',{ btn_name: '删除', btn_type: 'del' }],
                [20,'2346235rygadsfgwe5yr','测试商品20','239.99',{ btn_name: '删除', btn_type: 'del' }],
                [21,'2346235r2748oghius5yr','测试商品21','249.99',{ btn_name: '删除', btn_type: 'del' }],
            ]
        }

        table = new WebTable(top_sell_data, 'app')
        table.init()
    </script>


</body>

</html>
```

见代码，WebTable类需要传入两个参数，data和id，data的结构如上（test_data），需要说明的是目前header中的type只支持number,text,button三个参数，content中需要说明的是button部分，该部分的结构是

```javascript
{
    btn_name: '编辑',		//必须，给按钮添加文本
    btn_type: 'edit',	//必须，为确定按钮类型，当前支持edit(编辑),del(删除),add(添加),view(查看)四种类型的按钮
    func:function(){alert('hahaha')	//可选，这是该按钮对应的绑定事件，如果不填则默认会执行alert()
}
```

另一个参数id是对应了div的id，在使用时，需要先创建一个div标签和对应id，然后再实例化WebTable类时，id就是该table标签的id。



ps：WebTable的参数如下

```javascript
WebTable(data, id, show_line_num = 10,
    table_class_name = 'WebTable',
    tr_th_class = 'raw_tr_th',
    tr_td_class = 'raw_tr_td',
    td_class = 'block_td',
    th_class = 'block_th')
```

其中表头行的class为tr_th_class = 'raw_tr_th'，单元格的class为th_class = 'block_th'

表体行的class为tr_td_class = 'raw_tr_td'，列的class默认为"col_<列号>"，列好从0开始，单元格的class为td_class = 'block_td'

show_line_num是每页展示的条目数



可以通过2959243019@qq.com联系我~
