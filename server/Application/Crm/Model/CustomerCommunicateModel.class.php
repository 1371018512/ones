<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 6/8/15
 * Time: 18:25
 */

namespace Crm\Model;


use Common\Model\CommonViewModel;

class CustomerCommunicateModel extends CommonViewModel {
    protected $viewFields = array(
        'CustomerCommunicate' => array('*', '_type'=>'left'),
        'Customer' => array('_on'=>'Customer.id=CustomerCommunicate.customer_id', '_type'=>'left'),
        'ContactsCompany' => array('_on'=>'ContactsCompany.id=Customer.contacts_company_id', '_type'=>'left')
    );

    protected $order = "CustomerCommunicate.created DESC, CustomerCommunicate.id DESC";
}