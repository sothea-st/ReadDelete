<?php

    namespace ReadDeleteData\Shortcut;

    class  Laravel {

        public static function success($d=null){
            if ( $d == null ) {
                return response()->json([ "status" => 200 ]);
            } else {
                return response()->json($d);
            }
        }

        public static function upload($file,$old_img,$location){
            if ( $file ) {
                $profile_name = $file->getClientOriginalName();
                $file->move( public_path($location) , $profile_name );
                return $profile_name;
            } else {
                $profile_name = $old_img;
                return $profile_name;
            }
        }

        public static function edit($id,$tbl,$join_table,$join_fk)
        {
            // $table = Crypt::encryptString($tbl);
            $url = "global-query-record-from-table/".$id."/".$join_table."/".$join_fk."/".$tbl."/edit";
            return $url;
        }

        public static function delete($id,$tbl)
        {
            // $table = Crypt::encryptString($tbl);
            $url = "global-move-record-to-bin/".$id."/".$tbl;
            return $url;
        }

        public static function view($id,$tbl,$join_table,$join_fk)
        {
            // $table = Crypt::encryptString($tbl);
            $url = "global-query-record-from-table/".$id."/".$join_table."/".$join_fk."/".$tbl."/view";
            return $url;
        }

        public static function delete_permanent($id,$tbl)
        {
            // $table = Crypt::encryptString($tbl);
            $url = "global-restored-and-deleted-record-from-bin/".$id."/".$tbl.'/3';
            return $url;
        }

        public static function restore($id,$tbl)
        {
            // $table = Crypt::encryptString($tbl);
            $url = "global-restored-and-deleted-record-from-bin/".$id."/".$tbl.'/1';
            return $url;
        }

        public static function all_in_one($id,$tbl,$join_table,$join_fk,$con)
        {
            // $table = Crypt::encryptString($tbl);
            if ( $con == "edit" ) {
                $url = "global-query-record-from-table/".$id."/".$join_table."/".$join_fk."/".$tbl."/edit";
            } else if ( $con == "delete" ) {
                $url = "global-move-record-to-bin/".$id."/".$tbl;
            } else if ( $con == "restore_and_delete" ) {
                $url = "global-restored-and-deleted-record-from-bin/".$id."/".$tbl;
            } else if ( $con == "view" ) {
                $url = "global-query-record-from-table/".$id."/".$join_table."/".$join_fk."/".$tbl."/view";
            }
            return $url;
        }


    }


?>
