<?php

/*
 * @app Supplier
 * @package Supplier.service.SupplierSupplyProduct
 * @author linghui
 * @link http://linghui.com
 * */
namespace Supplier\Service;
use Common\Model\CommonModel;

class SupplierSupplyProductService extends CommonModel {

    protected $_auto = [
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}