<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\AdminBundle\Widgets\Toolbar;

use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarItemServiceInterface;

/**
 * Class WidgetToolbarItemManager
 *
 * @package Sulu\Bundle\AdminBundle\Widgets\Toolbar
 */
class WidgetToolbarItemManager implements WidgetToolbarItemManagerInterface
{
    /**
     * Collected services
     *
     * @var WidgetToolbarItemServiceInterface[]
     */
    private $widgetToolbarItemServices;

    function __construct()
    {
        $this->widgetToolbarItemServices = [];
    }

    /**
     * Adds services to array for later usage
     *
     * @param WidgetToolbarItemServiceInterface $service
     */
    public function addService(WidgetToolbarItemServiceInterface $service)
    {
        $this->widgetToolbarItemServices[] = $service;
    }

    /**
     * Gets WidgetToolbarItems from collected services
     *
     * @param WidgetToolbarContext $context
     * @return WidgetToolbarItem[]
     */
    public function getWidgetToolbarItems(WidgetToolbarContext $context)
    {
        $items = [];
        foreach ($this->widgetToolbarItemServices as $service) {
            $tmp = $service->getWidgetToolbarItems($context);
            if (!!$tmp) {
                 $items = array_merge($items, $tmp);
            }
        }

        return $items;
    }
}
