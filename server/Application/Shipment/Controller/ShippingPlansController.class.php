<?php

/**
 * @app Shipment
 * @package Shipment.controller.ShippingPlans
 * @author Lin
 */
namespace Shipment\Controller;
use Common\Controller\BaseRestController;
use Common\Controller\CommonBillController;

class ShippingPlansController extends CommonBillController {

    protected $main_model = 'Shipment/ShippingPlans';
    protected $detail_model_alias = 'shippingPlan.shippingPlansDetail';
    
}
