<?php

/*
 * @app Truck
 * @package Truck.service.Truck
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace Truck\Service;
use Common\Model\CommonModel;

class TruckService extends CommonModel {

    protected $_auto = [
        ["user_id", "get_current_user_id", 1, "function"],
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}