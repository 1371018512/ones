<?php

/*
 * @app Region
 * @package Region.event.Region
 * @author linghui
 * @link http://linghui.com
 * */
namespace Region\Event;
use Common\Event\BaseRestEvent;

class RegionEvent extends BaseRestEvent {

    public function _EM_get_full_name() {
        $this->response(D('Region/Region')->get_full_info(I('get.id')));
    }

}