<?php

/*
 * @app Productattribute
 * @package Productattribute.service.ProductAttributeMap
 * @author linghui
 * @link http://linghui.com
 * */
namespace Productattribute\Service;
use Common\Model\CommonModel;

class ProductAttributeMapService extends CommonModel {

    protected $_auto = [
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}