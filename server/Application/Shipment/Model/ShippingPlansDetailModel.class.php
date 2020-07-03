<?php

/**
 * @app Shipment
 * @package Shipment.model.ShippingPlansDetail
 * @author Lin
 */
namespace Shipment\Model;
use Common\Model\CommonViewModel;

class ShippingPlansDetailModel extends CommonViewModel {

    protected $viewFields = [
        "ShippingPlansDetail" => ['*', '_type'=>'left'],
        'Ship' => [
            'name'=>'ship_id__label__',
            'measure_unit',
            'measure_unit' => 'quantity__after__',
            '_on' => 'Ship.id=ShippingPlansDetail.ship_id',
            '_type' => 'left'
        ],
        "Customer" => [
            'contacts_company_id',
            '_on' => 'ShippingPlansDetail.customer_id=Customer.id',
            '_type' => 'left'
        ],
        "ContactsCompany" => [
            'name' => 'customer_id__label__',
            'address' => 'customer_address',
            'phone' => 'customer_phone',
            '_on' => 'Customer.contacts_company_id=ContactsCompany.id',
            '_type' => 'left'
        ],
        "ShippingPlans" => [
            "_on" => "ShippingPlans.id=ShippingPlansDetail.id",
            "_type" => "left"
        ]
    ];

}
