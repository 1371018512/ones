<?php

/*
 * @app Productattribute
 * @package Productattribute.service.ProductAttributeContent
 * @author linghui
 * @link http://linghui.com
 * */
namespace Productattribute\Service;
use Common\Model\CommonModel;

class ProductAttributeContentService extends CommonModel {

    protected $_auto = array(
        array("company_id", "get_current_company_id", 1, "function")
    );

}