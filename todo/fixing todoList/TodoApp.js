$(document).ready(function () {
    if (localStorage['data'] == '[]'||localStorage['data'] == null) {
        let arr = [];
        localStorage['data'] = JSON.stringify(arr);
        index = 0;
        var showdata = [];
    } else {
        var showdata = JSON.parse(localStorage['data']);
        index = showdata[showdata.length - 1].index + 1;
    }
   
    let dataArr = showdata;
  
    show(showdata);
    

    $('#cross').click(function () {
        $('input').removeClass('alert');
        $('input').attr('placeholder', 'Add new task here');
        let val = $('#inputadd').val();
        if (val == '') {
            $('input').addClass('alert');
            $('input').attr('placeholder','!Please input task')
            return false;
        }
        $('#inputadd').val('');
        dataArr.push({ value: val, index: index++,status: 'active'});
        $('.task1').append(` 
        <div class="task_main" id="${index-1}">
                <div>${val}</div>
                <div style="display:flex; width: 50px;">
                    <div class="task_tick" id="tick"></div>
                    <div class="task_remove close" id="closed">
                    </div>
                </div>
        </div>`)
        localStorage['data'] = JSON.stringify(dataArr);
    })

    $("body").delegate(".close", "click", function () {
        let index = parseInt($(this).parent().parent().attr('id'));
        dataArr.forEach(function (item,i) {
            if (item.index == index) { dataArr.splice(i, 1); return}
        })
        localStorage['data'] = JSON.stringify(dataArr);
        $('.task1').html('');
        show(dataArr);
    });
    
    $("body").delegate(".task_tick", "click", function () { 
        $(this).addClass('ticked')
        let index = parseInt($(this).parent().parent().attr('id'));
        dataArr.forEach(function (item,i) {
            if (item.index == index) { dataArr[i].status = 'complete'; return}
        })
        localStorage['data'] = JSON.stringify(dataArr);
    })
    
    $('.removebtn').click(function () {
        dataArr = [];
        text = '';
        $('.task1').html('');
        localStorage['data'] = JSON.stringify(dataArr);
    })

    function show(dataArr) {
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].status == 'active') {
                $('.task1').append(` 
            <div class="task_main" id="${dataArr[i].index}">
                    <div>${dataArr[i].value}</div>
                    <div style="display:flex; width: 50px;">
                        <div class="task_tick" id="tick"></div>
                        <div class="task_remove close" id="closed">
                        </div>
                    </div>
            </div>`)
            } else {
                $('.task1').append(` 
                <div class="task_main" id="${dataArr[i].index}">
                        <div>${dataArr[i].value}</div>
                        <div style="display:flex; width: 50px;">
                            <div class="task_tick ticked" id="tick"></div>
                            <div class="task_remove close" id="closed">
                            </div>
                        </div>
                </div>`)
            }
        }
    }

}) 
