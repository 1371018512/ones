<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 6/10/15
 * Time: 14:25
 */

namespace Crm\Service;


use Common\Model\CommonModel;

class CustomerCommunicateService extends CommonModel {

    protected $_auto = array(
        array("user_info_id", "get_current_user_id", 1, "function"),
        array("company_id", "get_current_company_id", 1, "function")
    );

}