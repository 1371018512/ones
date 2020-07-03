<?php

/*
 * @app Productattribute
 * @package Productattribute.model.ProductAttribute
 * @author linghui
 * @link http://linghui.com
 * */
namespace Productattribute\Model;
use Common\Model\CommonViewModel;

class ProductAttributeModel extends CommonViewModel {

    protected $viewFields = array(
        "ProductAttribute" => array('*', '_type'=>'left')
    );

}