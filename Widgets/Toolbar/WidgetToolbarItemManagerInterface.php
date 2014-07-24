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
use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarContext;
use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarItem;

/**
 * Class WidgetToolbarItemManagerInterface
 *
 * @package Sulu\Bundle\AdminBundle\Widgets\Toolbar
 */
interface WidgetToolbarItemManagerInterface
{
    /**
     * Adds services to array for later usage
     *
     * @param WidgetToolbarItemServiceInterface $service
     */
    public function addService(WidgetToolbarItemServiceInterface $service);

    /**
     * Gets WidgetToolbarItems from collected services
     *
     * @param WidgetToolbarContext $context
     * @return WidgetToolbarItem[]
     */
    public function getWidgetToolbarItems(WidgetToolbarContext $context);
} 
