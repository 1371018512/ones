<?php

/*
 * @app TransMeter
 * @package TransMeter.service.TransMeter
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace TransMeter\Service;
use Common\Model\CommonModel;

class TransMeterService extends CommonModel {

    protected $_auto = [
        ["user_id", "get_current_user_id", 1, "function"],
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}