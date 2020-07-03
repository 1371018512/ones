<?php

/**
 * @app Ship
 * @package Ship.service.ShipCategory
 * @author Lin
 */
namespace Ship\Service;
use Common\Model\CommonTreeModel;

class ShipCategoryService extends CommonTreeModel {

    protected $_auto = [
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}
