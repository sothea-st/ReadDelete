$.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});
function errs(){
    toastr.options = {
        "closeButton" : true,
        "timeOut": 0
    }
    toastr.clear();
    toastr.error("Something wrong");
};
function suc(){
    toastr.options = {
        "closeButton" : true,
        "progressBar" : true,
        "timeOut": 1000,
    };
    toastr.clear();
    toastr.success("Success");
};
//=================================  --------- =================================//
//=================================  Genger Function =================================//
//=================================  --------- =================================//
function gender(gen) {
    if ( gen == "male" ) {
        $("input[value='male']").prop("checked",true);
        $("input[value='female']").prop("checked",false);
    } else {
        $("input[value='male']").prop("checked",false);
        $("input[value='female']").prop("checked",true);
    }
}
//=================================  --------- =================================//
//=================================  Save Function =================================//
//=================================  --------- =================================//
function saveData(urlData,frmValue,condition){
    $.ajax({
        url: urlData,
        method: "post",
        data: frmValue,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            suc();
            obj.afterSuccess(data,condition);
        },
        error:function (err){
            $.each(err.responseJSON.errors,function(field_name,error){
                $(document).find('input[name='+field_name+']').after('<b class="text-strong text-danger">' +error+ '</b>');
                $(document).find("select[name="+field_name+"]").next().after('<b class="text-strong text-danger">' +error+ '</b>');
            }),
            errs();
        },
    });
}
//=================================  --------- =================================//
//=================================  Delete Function =================================//
//=================================  --------- =================================//
function deleteData(urlDelete,idTable,that,idModal){
    $.ajax({
        url: urlDelete+"/no",
        method: "get",
        dataType: "json",
        success: function(data) {
            if ( data.status == 200 ) {
                $(idModal).modal('show');
                that.attr("href",urlDelete);
                $(document).on("click",".btn-yes",function(){
                    $.ajax({
                        url: urlDelete+"/yes",
                        method: "get",
                        dataType: "json",
                        success: function(d) {
                            if ( d.status == 200 ) {
                                $(idModal).modal('hide');
                                reloadDataTable(idTable);
                                location.reload();
                            }
                        },
                        error: function(e) {
                            errs();
                        }
                    });
                });
            }
        },
        error: function(e) {
            errs();
        }
    });
}
//=================================  --------- =================================//
//=================================  Reload DataTable Function =================================//
//=================================  --------- =================================//
function reloadDataTable(idTable){
    $(idTable).DataTable().ajax.reload();
}
//=================================  --------- =================================//
//=================================  Query Data Function =================================//
//=================================  --------- =================================//
function queryData(urlData,condition){
    $.ajax({
        url: urlData,
        type: "get",
        dataType: "json",
        success: function(d){
            obj.afterSuccess(d,condition);
        },
        error: function(e){
            errs();
        }
    });
}

//=================================  --------- =================================//
//=================================  select Image Function =================================//
//=================================  --------- =================================//
function readURL(input,targetImg) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(targetImg).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
