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
 * Context object for WidgetToolbarItemServices to create a WidgetToolbarItem
 *
 * @package Sulu\Bundle\AdminBundle\Widgets\Toolbar
 */
class WidgetToolbarContext
{
    /**
     * Type a specific entity
     *
     * @var string
     */
    private $type;

    /**
     * Id of a specific entity
     *
     * @var string|integer
     */
    private $id;

    /**
     * Current location
     *
     * @var string
     */
    private $location;

    /**
     * Entity key
     *
     * @var string
     */
    private $entityKey;

    /**
     * @param string $entityKey
     * @param string|int $id
     * @param string $location
     * @param mixed $type
     */
    function __construct($entityKey, $id, $location, $type = null)
    {
        $this->entityKey = $entityKey;
        $this->id = $id;
        $this->location = $location;
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getEntityKey()
    {
        return $this->entityKey;
    }

    /**
     * @return string|integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }
}
