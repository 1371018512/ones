<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 10/24/15
 * Time: 09:38
 */

namespace Currency\Controller;


use Common\Controller\BaseRestController;

class CurrencyController extends BaseRestController {

    public function on_list() {
        $currencies = D('Currency/Currency', 'Service')->get_currency_list();
        $this->response($currencies);
    }

}