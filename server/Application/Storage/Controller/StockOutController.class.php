<?php

/*
 * @app Storage
 * @package Storage.controller.StockOut
 * @author linghui
 * @link http://linghui.com
 * */
namespace Storage\Controller;
use Common\Controller\CommonBillController;

class StockOutController extends CommonBillController {

    protected $main_model = 'Storage/StockOut';

    protected $detail_model_alias = 'storage.stockOutDetail';

}