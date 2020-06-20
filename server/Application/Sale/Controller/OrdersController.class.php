<?php

/*
 * @app Sale
 * @package Sale.controller.Orders
 * @author linghui
 * @link http://linghui.com
 * */
namespace Sale\Controller;
use Common\Controller\CommonBillController;

class OrdersController extends CommonBillController {

    protected $main_model = 'Sale/Orders';

    protected $detail_model_alias = 'sale.ordersDetail';

}