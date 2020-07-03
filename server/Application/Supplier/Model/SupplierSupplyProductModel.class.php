<?php

/*
 * @app Supplier
 * @package Supplier.model.SupplierSupplyProduct
 * @author linghui
 * @link http://linghui.com
 * */
namespace Supplier\Model;
use Common\Model\CommonViewModel;

class SupplierSupplyProductModel extends CommonViewModel {

    protected $viewFields = [
        "SupplierSupplyProduct" => ['*', '_type'=>'left']
    ];

}