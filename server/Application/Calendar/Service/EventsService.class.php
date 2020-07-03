<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 6/10/15
 * Time: 10:28
 */

namespace Calendar\Service;


use Common\Model\CommonModel;

class EventsService extends CommonModel {

    protected $_auto = [
        array("user_info_id", "get_current_user_id", 1, "function"),
        array("company_id", "get_current_company_id", 1, "function")
    ];

}