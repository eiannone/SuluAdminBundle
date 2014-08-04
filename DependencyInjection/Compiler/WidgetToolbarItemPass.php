<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\AdminBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

/**
 * Class WidgetToolbarItemPass
 *
 * @package Sulu\Bundle\AdminBundle\DependencyInjection\Compiler
 */
class WidgetToolbarItemPass implements CompilerPassInterface
{
    /**
     * @var string
     */
    private $toolbarItemTag;

    /**
     * @var string
     */
    private $toolbarItemHandlerTag;

    function __construct($toolbarItemTag, $toolbarItemHandlerTag)
    {
        $this->$toolbarItemTag = $toolbarItemTag;
        $this->toolbarItemHandlerTag = $toolbarItemHandlerTag;
    }

    /**
     * You can modify the container here before it is dumped to PHP code.
     *
     * @param ContainerBuilder $container
     * @api
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition($this->toolbarItemHandlerTag)) {
            return;
        }
        $toolbarItemHandler = $container->getDefinition($this->toolbarItemHandlerTag);

        // get tagged services
        $taggedServices = $container->findTaggedServiceIds($this->toolbarItemTag);

        foreach ($taggedServices as $id) {
            $toolbarItemHandler->addMethodCall('addService', array(new Reference($id)));
        }
    }
}
