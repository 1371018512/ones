<?php
/**
 * Created by PhpStorm.
 * User: llinghui
 * Date: 16/5/10
 * Time: 21:54
 */

namespace Common\Lib;


use Think\Log;

class CommonLog extends Log {

    public static function get_log() {
        return self::$log;
    }
    
}