<?php

/*
 * @app Ship
 * @package Ship.model.Ship
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace Ship\Model;
use Common\Model\CommonViewModel;

class ShipModel extends CommonViewModel {

    protected $viewFields = [
        "Ship" => ['*', '_type'=>'left']
    ];

}