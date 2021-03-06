<?php

/*
 * @app Supplier
 * @package Supplier.service.Supplier
 * @author linghui
 * @link http://linghui.com
 * */
namespace Supplier\Service;
use Common\Model\CommonModel;

class SupplierService extends CommonModel {

    protected $_auto = [
        ["user_info_id", "get_current_user_id", 1, "function"],
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}