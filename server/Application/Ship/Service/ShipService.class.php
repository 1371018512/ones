<?php

/**
 * @app Ship
 * @package Ship.service.Ship
 * @author Lin
 */
namespace Ship\Service;
use Common\Model\CommonModel;

class ShipService extends CommonModel {

    protected $_auto = [
        ["user_id", "get_current_user_id", 1, "function"],
        ["company_id", "get_current_company_id", 1, "function"]
    ];

}
