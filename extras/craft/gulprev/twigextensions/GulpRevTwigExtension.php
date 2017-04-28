<?php

namespace Craft;

use Twig_Extension;
use Twig_Filter_Method;

class GulpRevTwigExtension extends Twig_Extension
{
    private $base_path;

    /**
    * Class Constructor
    *
    * @access public
    * @return null
    */
    public function __construct()
    {
        $settings = craft()->plugins->getPlugin('gulprev')->getSettings();
        $this->base_path = $this->getBasePath($settings);
    }

    public function getName()
    {
        return 'gulpRev';
    }

    public function getFilters()
    {
        return array(
            'gulp_rev' => new Twig_Filter_Method($this, 'gulpRev')
        );
    }

    public function getBasePath($settings)
    {
        if (!$settings || $settings->gulprev_path === '') {
            return '/';
        }

        $path = $settings->gulprev_path;

        // if the path doesn't start with a /, add one
        if (substr($path, 0, 1) !== '/') {
            $path = '/' . $path;
        }

        // if the path doesn't end with a /, add one
        if (substr($path, -1) !== '/') {
            $path .= '/';
        }

        return $path;
    }

    public function stripBasePath($path)
    {
        if ($this->base_path !== '/') {
            // take off the starting slash
            $base_path = substr($this->base_path, 1);

            // remove base path and any possible double-slashes
            $path = str_replace($base_path, '', $path);
            $path = str_replace('//', '/', $path);

            return $path;
        } else {
            // strip off starting slash if it exists
            if (substr($path, 0, 1) === '/') {
                $path = substr($path, 1);
            }

            return $path;
        }
    }

    public function addBasePath($path)
    {
        return $this->base_path . $path;
    }

    /**
     * The "gulp_rev" filter checks a manifest file to properly rev assets.
     *
     * Usage: {{ "assets/stylesheets/app.css" | gulp_rev }}
     */
    public function gulpRev($file)
    {
        static $manifest = null;

        $path           = $this->stripBasePath($file);
        $manifest_path  = $_SERVER['DOCUMENT_ROOT'];
        $manifest_path .= $this->base_path;
        $manifest_path .= 'rev-manifest.json';

        // looking for rev-manifest file in public folder
        // and storing the contents of the file
        if (is_null($manifest) && file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
        }

        // Find the revved version path of the file in the manifest
        if (isset($manifest[$path])) {
            $path = $manifest[$path];
        }

        // We remove, then re-add the base path since it's not in
        // the keys for each file in the manifest file
        $path = $this->addBasePath($path);
        return $path;
    }
}