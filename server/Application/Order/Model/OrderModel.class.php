<?php

/*
 * @app Order
 * @package Order.model.Order
 * @author laofahai@TEam Swift
 * @link http://ng-erp.com
 * */
namespace Order\Model;
use Common\Model\CommonViewModel;

class OrderModel extends CommonViewModel {

    protected $viewFields = [
        "Order" => ['*', '_type'=>'left']
    ];

}