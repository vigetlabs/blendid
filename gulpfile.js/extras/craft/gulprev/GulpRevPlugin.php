<?php
namespace Craft;

class GulpRevPlugin extends BasePlugin
{
    function getName()
    {
        return Craft::t('Gulp Rev');
    }

    function getVersion()
    {
        return '1.1';
    }

    function getDeveloper()
    {
        return 'Megan Zlock';
    }

    function getDeveloperUrl()
    {
        return 'http://viget.com';
    }

    function addTwigExtension()
    {
        Craft::import('plugins.gulprev.twigextensions.GulpRevTwigExtension');

        return new GulpRevTwigExtension();
    }
}