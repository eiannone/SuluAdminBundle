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
    private $services;

    function __construct()
    {
        $this->services = [];
    }

    /**
     * Adds services to array for later usage
     *
     * @param WidgetToolbarItemServiceInterface $service
     */
    public function addService(WidgetToolbarItemServiceInterface $service)
    {
        $this->services[] = $service;
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
        foreach ($this->services as $service) {
            $tmp = $service->getWidgetToolbarItems($context);
            if (!!$tmp) {
                array_merge($items, $tmp);
            }
        }
    }
}
