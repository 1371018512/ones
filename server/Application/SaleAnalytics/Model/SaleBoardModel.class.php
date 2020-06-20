<?php

/*
 * @app SaleAnalytics
 * @package SaleAnalytics.model.SaleBoard
 * @author linghui
 * @link http://linghui.com
 * */
namespace SaleAnalytics\Model;
use Common\Model\CommonViewModel;

class SaleBoardModel extends CommonViewModel {

    protected $viewFields = [
        "SaleBoard" => ['*', '_type'=>'left']
    ];

}