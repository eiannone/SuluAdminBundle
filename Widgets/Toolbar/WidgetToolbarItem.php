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

/**
 * Class WidgetToolbarItem
 *
 * @package Sulu\Bundle\AdminBundle\Widgets\Toolbar
 */
class WidgetToolbarItem
{
    /**
     * @var string
     */
    private $icon;

    /**
     * @var bool
     */
    private $enabled;

    /**
     * @var bool
     */
    private $visible;

    /**
     * @var string[]
     */
    private $actions;

    /**
     * @var WidgetToolbarItem[]
     */
    private $children;

    /**
     * @var int
     */
    private $count;

    /**
     * @param String[] $actions
     * @param int $count
     * @param string $icon
     * @param WidgetToolbarItem[] $children
     * @param bool $enabled
     * @param bool $visible
     */
    function __construct(
        array $actions,
        $count,
        $icon = '',
        array $children = null,
        $enabled = true,
        $visible = true
    )
    {
        $this->actions = $actions;
        $this->children = $children;
        $this->count = $count;
        $this->enabled = $enabled;
        $this->icon = $icon;
        $this->visible = $visible;
    }

    /**
     * @return \string[]
     */
    public function getActions()
    {
        return $this->actions;
    }

    /**
     * @return WidgetToolbarItem[]
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @return int
     */
    public function getCount()
    {
        return $this->count;
    }

    /**
     * @return boolean
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * @return boolean
     */
    public function getVisible()
    {
        return $this->visible;
    }
}
