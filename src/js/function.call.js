//=================================  --------- =================================//
//=================================  build by     SOTHEA KAM   date:2022-01-01 =================================//
//=================================  --------- =================================//
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

//=================================  Genger Function =================================//
    function gender(gen) {
        if ( gen == "male" ) {
            $("input[value='male']").prop("checked",true);
            $("input[value='female']").prop("checked",false);
        } else {
            $("input[value='male']").prop("checked",false);
            $("input[value='female']").prop("checked",true);
        }
    }


// ================================= CRUD Function =================================


//=================================  Create Function =================================//
    function createData( these , condition){
        var frmValueId = these.parents('form').attr('id');
        var frmValue = new FormData( $("#"+frmValueId+"")[0] );
        var urlData = these.parents('form').attr('action');
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
                    $(document).find('[name='+field_name+']').after('<b class="text-strong text-danger">' +error+ '</b>');
                    $(document).find("select[name="+field_name+"]").next().after('<b class="text-strong text-danger">' +error+ '</b>');
                });
                errs();
            }
        });
    }
//=================================  Read Function =================================//
    function readData(urlData,condition){
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
//=================================  Update Function =================================//
    function updateData( these,condition){
        var urlData = these.attr("href");
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
//=================================  Delete Function =================================//
    function deleteData( these , condition ){
        var urlDelete = these.attr('href');
        $.ajax({
            url: urlDelete+"/no",
            method: "get",
            dataType: "json",
            success: function(data) {
                if ( data.status == 200 ) {
                    $("#modalDeleteData").modal('show');
                    these.attr("href",urlDelete);
                    $(document).on("click",".btn-yes",function(){
                        $.ajax({
                            url: urlDelete+"/yes",
                            method: "get",
                            dataType: "json",
                            success: function(d) {
                                if ( d.status == 200 ) {
                                    suc();
                                    $("#modalDeleteData").modal('hide');
                                    obj.afterSuccess(d,condition);
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


// ================================= END CRUD Function =================================




//=================================  --------- =================================//
//=================================  Reload DataTable Function =================================//
//=================================  --------- =================================//
function reloadDataTable(idTable){
    $(idTable).DataTable().ajax.reload();
}


function readURL(input,targetImg) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(targetImg).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
