<?php

/**
 * @app Ship
 * @package Ship.model.Ship
 * @author Lin
 */
namespace Ship\Model;
use Common\Model\CommonViewModel;

class ShipModel extends CommonViewModel {

    protected $viewFields = array(
        "Ship" => ['*', '_type'=>'left'],
        "ShipCategory" => array(
            "name" => "ship_category_id__label__",
            "_on"=>"Ship.ship_category_id=ShipCategory.id",
            "_type" => "left"
        )
    );

    public $orderFields = ['id', 'ship_category_id'];

    public $fuzzy_search = [
        'Ship.name',
        'ShipCategory.name'
    ];

}
