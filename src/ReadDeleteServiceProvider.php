<?php
namespace ReadDeleteData\Shortcut;

use Faker\Provider\File;
use Illuminate\Support\ServiceProvider;

class ReadDeleteServiceProvider extends ServiceProvider {
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__."/routes/web.php");
    }

    public function register()
    {

    }

}

?>
