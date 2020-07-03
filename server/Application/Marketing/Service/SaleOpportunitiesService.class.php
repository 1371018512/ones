<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 6/21/15
 * Time: 17:59
 */

namespace Marketing\Service;


use Common\Model\CommonModel;

class SaleOpportunitiesService extends CommonModel {

    protected $_auto = array(
        array("user_info_id", "get_current_user_id", 1, "function"),
        array("company_id", "get_current_company_id", 1, "function")
    );

}