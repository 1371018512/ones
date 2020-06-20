<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Time: 11:19
 */

namespace Crm\Controller;


use Common\Controller\BaseRestController;

class CustomerCareController extends BaseRestController {

    protected function _before_insert() {
        // 提交的customer_id为往来单位ID
        $_POST['customer_id'] = D('Crm/Customer')->where(array(
            'contacts_company_id' => $_POST['customer_id']
        ))->getField('id');
    }

    protected function _filter(&$map) {
        if(I('get._mf') == 'Customer.id') {
            $map['CustomerCare.customer_id'] = D('Crm/Customer')->where(array(
                'contacts_company_id' => I('get._mv')
            ))->getField('id');

            unset($map['Customer.id']);
        }

    }

}