<?php

/**
 * @app Ship
 * @package Ship.event.ShipCategory
 * @author Lin
 */
namespace Ship\Event;
use Common\Event\BaseRestEvent;

class ShipCategoryEvent extends BaseRestEvent {

    public function on_event_list() {
        $model = D('Ship/ShipCategory', "Service");
        $tree = $model->get_tree();

        $this->response($tree);
    }

}
