<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 6/5/15
 * Time: 18:53
 */

namespace Home\Model;


use Common\Model\CommonViewModel;

class AppModel extends CommonViewModel {

    protected $viewFields = array(
        'App' => array('*', "_type"=>"left")
    );

    public $not_belongs_to_company = true;

}