<?php

/*
 * @app Truck
 * @package Truck.model.Truck
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace Truck\Model;
use Common\Model\CommonViewModel;

class TruckModel extends CommonViewModel {

    protected $viewFields = [
        "Truck" => ['*', '_type'=>'left']
    ];

}