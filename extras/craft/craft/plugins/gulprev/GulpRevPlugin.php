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
        return '2.0';
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

    protected function defineSettings()
    {
        return array(
            'gulprev_path' => array(AttributeType::String, 'default' => '/assets')
        );
    }

    public function getSettingsHtml()
    {
        if(craft()->request->getPath() == 'settings/plugins')
        {
            return true;
        }

       return craft()->templates->render('gulprev/settings', array(
           'settings' => $this->getSettings()
       ));
    }
}