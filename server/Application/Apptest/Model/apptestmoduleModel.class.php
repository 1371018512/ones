<?php

/*
 * @app Apptest
 * @package Apptest.model.apptestmodule
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace Apptest\Model;
use Common\Model\CommonViewModel;

class apptestmoduleModel extends CommonViewModel {

    protected $viewFields = [
        "apptestmodule" => ['*', '_type'=>'left']
    ];

}