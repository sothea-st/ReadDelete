<?php

namespace ReadDeleteData\Shortcut\Http\Controller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReadDeleteController extends Controller
{
    public function move_record_to_bin($id,$tbl,$confirm)
    {
        date_default_timezone_set("Asia/Phnom_Penh");
        if ( $confirm == "yes" ) {
            \DB::table($tbl)->where("id",$id)->update([ "status" => 2 , "deleted_at" => date("Y-m-d , h:i:s") ]);
        }
        return response()->json([ "status" => 200 ]);
    }

    public function restore_n_deleted_record_from_bin($id,$tbl,$status)
    {
        \DB::table($tbl)->where( "id",$id )->update([ "status" => $status ]);
        return redirect()->back();
    }

    public function global_query_record($id,$tb,$fk,$tbl,$check)
    {
        $arrTb = explode(",",$tb);
        $arrFk = explode(",",$fk);
        $data = \DB::table($tbl)->where([ "id" => $id , "status" => 1 ])->first();
        for ( $i = 0 ; $i < count($arrTb) ; $i++ ) {
            $fid = $arrFk[$i];
            $table = $arrTb[$i];
            if ( $fid != "none" ) {
                $data->$table = \DB::table($table)->where("id",$data->$fid)->first();
            }
        }
        if ( $check == "edit" ) {
            session()->flash("edit",$id);
            $data->session_id = $id;
        }
        return response()->json($data);
    }


}
