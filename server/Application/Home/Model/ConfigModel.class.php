<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 6/6/15
 * Time: 22:09
 */

namespace Home\Model;


use Common\Model\CommonViewModel;

class ConfigModel extends CommonViewModel {

    protected $viewFields = array(
        'Config' => array('*')
    );

}