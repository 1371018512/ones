<?php

/**
 * @app Ship
 * @package Ship.controller.ShipCategory
 * @author Lin
 */
namespace Ship\Controller;
use Common\Controller\BaseRestController;

class ShipCategoryController extends BaseRestController {

    /**
     * 获取列表
     */
    public function on_list() {
        $model = D('Ship/ShipCategory', "Service");
        $tree = $model->get_tree();

        $this->response($tree);
    }

    /**
     * 新增
     */
    public function on_post() {

        $model = D('Ship/ShipCategory', 'Service');

        $pid = I('post.pid');

        if(!$pid || !$model->find($pid)) {
            return $this->error(__('ship.Parent Category Not Found'));
        }

        $data = array(
            'name' => I('post.name'),
            'remark' => I('post.remark')
        );

        if(!$model->add_child($pid, $data, 'ship_category')) {
            return $this->error(__('ship.Add category Failed').':'.$model->getError());
        }

        $this->success(__('common.Operation Success'));
    }

    public function on_delete() {
        $model = D('Ship/ShipCategory', 'Service');
        $model->delete_node(I('get.id'));
    }

}
