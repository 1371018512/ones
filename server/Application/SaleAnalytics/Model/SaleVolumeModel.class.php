<?php

/*
 * @app SaleAnalytics
 * @package SaleAnalytics.model.SaleVolume
 * @author linghui
 * @link http://linghui.com
 * */
namespace SaleAnalytics\Model;
use Common\Model\CommonViewModel;

class SaleVolumeModel extends CommonViewModel {

    protected $viewFields = [
        "SaleVolume" => ['*', '_type'=>'left']
    ];

}