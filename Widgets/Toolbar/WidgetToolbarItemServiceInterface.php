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

use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarContext;

/**
 * Interface WidgetToolbarItemServiceInterface
 *
 * @package Sulu\Bundle\AdminBundle\Widgets\Toolbar
 */
interface WidgetToolbarItemServiceInterface
{
    /**
     * Returns a WidgetToolbarItem for a specific context
     *
     * @param WidgetToolbarContext $context
     * @return WidgetToolbarItem[]
     */
    public function getWidgetToolbarItems(WidgetToolbarContext $context);

} 
