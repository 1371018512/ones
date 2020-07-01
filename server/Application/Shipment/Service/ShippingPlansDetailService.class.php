<?php

/**
 * @app Shipment
 * @package Shipment.service.ShippingPlansDetail
 * @author Lin
 */
namespace Shipment\Service;
use Common\Model\CommonModel;

class ShippingPlansDetailService extends CommonModel {

    protected $_auto = [
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}
