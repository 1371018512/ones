<?php

/**
 * @app Shipment
 * @package Shipment.model.ShippingPlans
 * @author Lin
 */
namespace Shipment\Model;
use Common\Model\CommonViewModel;

class ShippingPlansModel extends CommonViewModel {

    protected $viewFields = [
        "ShippingPlans" => ['*', '_type'=>'left'],
        "Workflow" => [
            'name' => 'workflow_id__label__',
            '_on' => 'ShippingPlans.workflow_id=Workflow.id',
            '_type' => 'left'
        ]
    ];

    public $fuzzy_search = [
        'ShippingPlans.bill_no', 'ShippingPlans.subject'
    ];

}
