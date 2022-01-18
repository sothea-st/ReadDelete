<?php

use ReadDeleteData\Shortcut\Http\Controller\ReadDeleteController;

// Route::group(["namespace" => "ReadDeleteData\Shortcut\Http\Controller"] , function() {
        // global
        Route::get('global-move-record-to-bin/{id}/{tbl}/{confirm}', [ReadDeleteController::class,"move_record_to_bin"]);
        Route::get('global-restored-and-deleted-record-from-bin/{id}/{tbl}/{status}', [ReadDeleteController::class,"restore_n_deleted_record_from_bin"]);
        Route::get('global-query-record-from-table/{id}/{tb}/{fk}/{tbl}/{check}', [ReadDeleteController::class,"global_query_record"]);
    // });

?>

