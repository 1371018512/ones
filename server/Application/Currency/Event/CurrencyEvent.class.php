<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 10/23/15
 * Time: 18:39
 */

namespace Currency\Event;

use Currency\Controller\CurrencyController;

class CurrencyEvent extends CurrencyController {

    public function on_event_list() {
        return parent::on_list();
    }

}