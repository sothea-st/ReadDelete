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

        public static function uploadFile($file , $location , $previous_photo){
            if ($file) {
                $profile_name = $file->getClientOriginalName();
                $file->move(public_path($location), $profile_name);
                return $profile_name;
            } else {
                return $previous_photo;
            }
        }


        public static function edit($id,$tbl,$join_table=null,$join_fk=null)
        {
            if ( $join_table == null ) {
                $join_table = "none";
            }
            if ( $join_fk == null ) {
                $join_fk = "none";
            }

            // $table = Crypt::encryptString($tbl);
            $url = url("global-query-record-from-table/".$id."/".$join_table."/".$join_fk."/".$tbl."/edit");
            return $url;
        }

        public static function delete($id,$tbl)
        {
            // $table = Crypt::encryptString($tbl);
            $url = url("global-move-record-to-bin/".$id."/".$tbl);
            return $url;
        }

        public static function view($id,$tbl,$join_table,$join_fk)
        {
            // $table = Crypt::encryptString($tbl);
            $url = url("global-query-record-from-table/".$id."/".$join_table."/".$join_fk."/".$tbl."/view");
            return $url;
        }

        public static function delete_permanently($id,$tbl)
        {
            // $table = Crypt::encryptString($tbl);
            $url = url("global-restored-and-deleted-record-from-bin/".$id."/".$tbl.'/3');
            return $url;
        }

        public static function restore($id,$tbl)
        {
            // $table = Crypt::encryptString($tbl);
            $url = url("global-restored-and-deleted-record-from-bin/".$id."/".$tbl.'/1');
            return $url;
        }

    }


?>
