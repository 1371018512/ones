<?php
/**
 * Created by PhpStorm.
 * User: linghui
 * Date: 10/8/15
 * Time: 22:57
 */

namespace Printer\Service\Parser\Layout;


class H1 extends Common {

    protected $template = '<h1 style="%(style)s" class="%(class)s">%(content)s</h1>';

    public function compile_to_html($template_config, $data) {
        return parent::compile_to_html($template_config, $data);
    }

}