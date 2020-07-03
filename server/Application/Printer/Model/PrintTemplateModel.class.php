<?php

/*
 * @app Printer
 * @package Printer.model.PrintTemplate
 * @author linghui
 * @link http://linghui.com
 * */
namespace Printer\Model;
use Common\Model\CommonViewModel;

class PrintTemplateModel extends CommonViewModel {

    protected $viewFields = [
        "PrintTemplate" => ['*', '_type'=>'left']
    ];

}