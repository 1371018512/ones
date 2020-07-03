<?php

/*
 * @app Finance
 * @package Finance.model.FinanceAccount
 * @author linghui
 * @link http://linghui.com
 * */
namespace Finance\Model;
use Common\Model\CommonViewModel;

class FinanceAccountModel extends CommonViewModel {

    protected $viewFields = [
        "FinanceAccount" => ['*', '_type'=>'left']
    ];

}