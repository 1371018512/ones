<?php

/*
 * @app TransMeter
 * @package TransMeter.model.TransMeter
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace TransMeter\Model;
use Common\Model\CommonViewModel;

class TransMeterModel extends CommonViewModel {

    protected $viewFields = [
        "TransMeter" => ['*', '_type'=>'left']
    ];

}