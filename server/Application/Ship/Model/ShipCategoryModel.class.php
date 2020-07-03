<?php

/**
 * @app Ship
 * @package Ship.model.ShipCategory
 * @author Lin
 */
namespace Ship\Model;

use Common\Model\CommonTreeModel;

class ShipCategoryModel extends CommonTreeModel {

    protected $viewFields = [
        "ShipCategory" => ['*', '_type'=>'left']
    ];

}
