 //=================================  --------- =================================//
//=================================  build by     SOTHEA KAM   date:2022-01-01 =================================//
//=================================  --------- =================================//
$.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});
function errs(){
    toastr.options = {
        "closeButton" : true,
        "timeOut": 0,
        'extendedTimeOut': 0 // toastr will be fixed on the window
    }
    toastr.clear();
    toastr.error("Something wrong");
};
function suc(){
    toastr.options = {
        "closeButton" : true,
        "progressBar" : true,
        "timeOut": 3000,
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
    var idForm = these.parents('form').attr('id');
    var frmValue = new FormData( $("#"+idForm+"")[0] );
    var urlData = these.parents('form#'+idForm+'').attr('action');
    these.parents('form').find('b.removeValidateClass').remove();
    $.ajax({
        url: urlData,
        method: "POST",
        data: frmValue,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            suc();
            $('#'+idForm+'')[0].reset();
            $('#'+idForm+'').find('select').val( $("select options:first").val() ).trigger("change");
            obj.afterSuccess(data,condition);
        },
        error:function (err){
            $.each(err.responseJSON.errors,function(field_name,error){
                $(document).find('input[name='+field_name+']').after('<b class="text-strong text-danger removeValidateClass">' +error+ '</b>');
                these.parents('form').find("select[name="+field_name+"]").insertAfter('.selection').after('<b class="text-strong text-danger removeValidateClass">' +error+ '</b>');
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
    var thisURL = these.attr('attr-url');
    $(document).on('click','.btn-yes',function(){
        $.ajax({
            url: thisURL+"/yes",
            method: "get",
            dataType: "json",
            success: function(d) {
                if ( d.status == 200 ) {
                    suc();
                    obj.afterSuccess(d,condition);
                    window.location.reload();
                }
            },
            error: function(e) {
                errs();
            }
        });
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
function queryDataSelect2(urlData,condition){
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

function selectAuto(urlData,id){
    $.ajax({
        url: urlData,
        type: "get",
        dataType: "json",
        success: function(data){
            var option = "";
            for (var i = 0; i < data.length; i++) {
                option += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
            }
            $(""+id+"").append(option);
        },
        error: function(e){
            errs();
        }
    });
}

function resetSelect2(id){
    $(""+id+"").val( $(""+id+" options:first").val() ).trigger("change");
}



