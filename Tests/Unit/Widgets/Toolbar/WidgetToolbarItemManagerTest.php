<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarItemManager;
use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarItemServiceInterface;
use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarContext;
use Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarItem;

class WidgetToolbarItemManagerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var WidgetToolbarItemManager
     */
    private $manager;

    protected function setUp()
    {
        $this->manager = new WidgetToolbarItemManager();
    }

    public function testGetWidgetToolbarItems()
    {
        $this->manager->addService($this->getWidgetToolbarItemService());

        $result = $this->manager->getWidgetToolbarItems($this->getWidgetToolbarContext());
        $expected = array(
            $this->getWidgetToolbarItem(
                ['action'],
                1,
                'icon',
                null,
                true,
                false
            ),
            $this->getWidgetToolbarItem(['action2'], 10, 'icon2')
        );

        $this->assertEquals($expected, $result);
    }

    public function getWidgetToolbarItemService()
    {
        $service = $this->getMock(
            'Sulu\Bundle\AdminBundle\Widgets\Toolbar\WidgetToolbarItemServiceInterface'
        );
        $service->expects($this->any())
            ->method('getWidgetToolbarItems')
            ->with($this->getWidgetToolbarContext())
            ->will(
                $this->returnValue(
                    array(
                        $this->getWidgetToolbarItem(
                            ['action'],
                            1,
                            'icon',
                            null,
                            true,
                            false
                        ),
                        $this->getWidgetToolbarItem(['action2'], 10, 'icon2')
                    )
                )
            );

        return $service;
    }

    /**
     * Returns WidgetToolbarItems
     * @param $actions
     * @param $count
     * @param $icon
     * @param null $children
     * @param bool $enabled
     * @param bool $visible
     * @return WidgetToolbarItem
     */
    public function getWidgetToolbarItem(
        $actions,
        $count,
        $icon,
        $children = null,
        $enabled = true,
        $visible = false
    )
    {
        return new WidgetToolbarItem(
            $actions,
            $count,
            $icon,
            $children,
            $enabled,
            $visible
        );
    }

    /**
     * Returns a WidgetToolbarContext
     * @return WidgetToolbarContext
     */
    public function getWidgetToolbarContext()
    {
        return new WidgetToolbarContext(
            'SuluContactBundle:Contact',
            1,
            'contacts/contacts/edit:1/details'
        );
    }

} 
