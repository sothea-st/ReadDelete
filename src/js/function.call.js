  //=================================  --------- =================================//
//=================================  build by     SOTHEA KAM   date:2022-01-01 =================================//
//=================================  --------- =================================//
$.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});

//================================= START =================================//

const system = {
    data:null,
    saveData:function(these,scriptFun){
        var idForm = these.parents('form').attr('id');
        var frmValue = new FormData( $("#"+idForm+"")[0] );
        var urlData = these.parents('form#'+idForm+'').attr('action');
        these.parents('form').find('b.removeDuplicateValidateClass').remove();
        $.ajax({
            url: urlData,
            method: "POST",
            data: frmValue,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                if( data.status == 200 ) {
                    system.succ();
                    $('#'+idForm+'')[0].reset();
                    $('#'+idForm+'').find('select').val( $("select options:first").val() ).trigger("change");
                    scriptFun();
                }
            },
            error:function (err){
                $.each(err.responseJSON.errors,function(field_name,error){
                    $(document).find('input[name='+field_name+']').after('<b class="text-strong text-danger removeDuplicateValidateClass">' +error+ '</b>');
                    these.parents('form').find("select[name="+field_name+"]").insertAfter('.selection').after('<b class="text-strong text-danger removeDuplicateValidateClass">' +error+ '</b>');
                });
                system.err();
            }
        });
    },
    editData:function(these,scriptFun){
        var urlData = these.attr("href");
        $.ajax({
            url: urlData,
            type: "get",
            dataType: "json",
            success: function(d){
                system.data = d;
                scriptFun();
            },
            error: function(e){
                system.err();
            }
        });
    },
    deleteData:function( these ,scriptFun){
        var thisURL = these.attr('attr-url');
        $(document).on('click','.btn-yes',function(){
            $.ajax({
                url: thisURL+"/yes",
                method: "get",
                dataType: "json",
                success: function(d) {
                    if ( d.status == 200 ) {
                        scriptFun();
                    }
                },
                error: function(e) {
                    system.err();
                }
            });
        });
    },
    selectData:function(urlData,id){
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
                system.err();
            }
        });
    },
    readData: function(urlData,scriptFun){
        $.ajax({
            url: urlData,
            type: "get",
            dataType: "json",
            success: function(d){
                scriptFun();
            },
            error: function(e){
                system.err();
            }
        });
    },
    gender:function(gen) {
        if ( gen == "male" ) {
            $("input[value='male']").prop("checked",true);
            $("input[value='female']").prop("checked",false);
        } else {
            $("input[value='male']").prop("checked",false);
            $("input[value='female']").prop("checked",true);
        }
    },
    succ:function(){
        toastr.options = {
            "closeButton" : true,
            "progressBar" : true,
            "timeOut": 3000,
        };
        toastr.clear();
        toastr.success("Success");
    },
    err:function(){
        toastr.options = {
            "closeButton" : true,
            "timeOut": 0,
            'extendedTimeOut': 0 // toastr will be fixed on the window
        }
        toastr.clear();
        toastr.error("Something wrong");
    },
    reloadTable:function(idTable){
        $(idTable).DataTable().ajax.reload();
    },
    readURL:function(input,targetImg) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(targetImg).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
};
//================================= END =================================//




