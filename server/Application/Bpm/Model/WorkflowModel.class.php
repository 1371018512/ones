<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 7/5/15
 * Time: 21:24
 */

namespace Bpm\Model;


use Common\Model\CommonViewModel;

class WorkflowModel extends CommonViewModel {

    protected $viewFields = array(
        'Workflow' => array('*', '_type'=>'left')
    );
}