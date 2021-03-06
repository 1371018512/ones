<?php

/*
 * @app Storage
 * @package Storage.model.StockOut
 * @author linghui
 * @link http://linghui.com
 * */
namespace Storage\Model;
use Common\Model\CommonViewModel;

class StockOutModel extends CommonViewModel {

    protected $viewFields = [
        "StockOut" => ['*', '_type'=>'left'],
        "Workflow" => [
            "name" => "workflow_id__label__",
            "_on" => "Workflow.id=StockOut.workflow_id",
            "_type" => "left"
        ]
    ];

}