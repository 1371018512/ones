<?php

/*
 * @app Purchase
 * @package Purchase.service.PurchaseDetail
 * @author linghui
 * @link http://linghui.com
 * */
namespace Purchase\Service;
use Common\Model\CommonModel;

class PurchaseDetailService extends CommonModel {

    protected $_auto = [
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}