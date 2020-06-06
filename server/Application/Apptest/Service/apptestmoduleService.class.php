<?php

/*
 * @app Apptest
 * @package Apptest.service.apptestmodule
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace Apptest\Service;
use Common\Model\CommonModel;

class apptestmoduleService extends CommonModel {

    protected $_auto = [
        ["user_id", "get_current_user_id", 1, "function"],
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}