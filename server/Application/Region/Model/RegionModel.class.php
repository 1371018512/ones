<?php

/*
 * @app Region
 * @package Region.model.Region
 * @author linghui
 * @link http://linghui.com
 * */
namespace Region\Model;
use Common\Model\CommonViewModel;

class RegionModel extends CommonViewModel {

    public $not_belongs_to_company = true;

    protected $viewFields = [
        "Region" => ['*', '_type'=>'left']
    ];

}