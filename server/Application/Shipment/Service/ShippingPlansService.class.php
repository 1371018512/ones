<?php

/**
 * @app Shipment
 * @package Shipment.service.Shipment
 * @author Lin
 */
namespace Shipment\Service;
use Common\Model\CommonModel;
use Common\Service\CommonBillService;

class ShippingPlansService extends CommonBillService {

    const STATUS_COMPLETE = 2;

    // 单据主表模型别名 必须
    protected $main_model_alias = 'shippingPlan.shippingPlans';
    // 单据行模型别名 必须
    protected $detail_model_alias = 'shippingPlan.shippingPlansDetail';
    // 主表外键字段
    protected $detail_main_foreign = 'shipping_plans_id';
    // 主表表名
    protected $main_table = 'shipping_plans';
    // 明细表表名
    protected $detail_table = 'shipping_plans_detail';

    protected $LOCKED_STATUS = [
        self::STATUS_SAVED
    ];
    
}
